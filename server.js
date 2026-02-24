const express = require('express');
const compression = require('compression'); 
const os = require('os');
const path = require('path');
const client = require('prom-client');

const app = express();
const port = process.env.PORT || 80;

// IMPORTANTE: Faz o Express confiar no Traefik/k3s para identificar HTTPS corretamente
app.set('trust proxy', true);

// Middleware para performance
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração das métricas Prometheus
const register = new client.Registry();
register.setDefaultLabels({ app: 'portfolio' });
client.collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duração dos pedidos HTTP em milissegundos',
  labelNames: ['method', 'route', 'code']
});
register.registerMetric(httpRequestDurationMicroseconds);

app.use((req, res, next) => {
  res.locals.startEpoch = Date.now();
  res.on('finish', () => {
    const responseTimeInMs = Date.now() - res.locals.startEpoch;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route ? req.route.path : req.url, res.statusCode)
      .observe(responseTimeInMs);
  });
  next();
});

const replicaName = os.hostname();
let buildId = 'N/A';

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/replica', (req, res) => {
  res.json({ replica: replicaName });
});

app.post('/build-id', (req, res) => {
  buildId = req.body.buildId || 'N/A';
  res.sendStatus(200);
});

app.get('/build-id', (req, res) => {
  res.json({ buildId });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Portfólio rodando na porta ${port}`);
});