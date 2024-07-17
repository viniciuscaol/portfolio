const express = require('express');
const os = require('os');
const path = require('path');
const client = require('prom-client');

const app = express();
const port = process.env.PORT || 80;

// Configuração das métricas Prometheus
client.collectDefaultMetrics();
const register = new client.Registry();
register.setDefaultLabels({
  app: 'portfolio'
});
client.collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duração dos pedidos HTTP em milissegundos',
  labelNames: ['method', 'route', 'code']
});
register.registerMetric(httpRequestDurationMicroseconds);

const collectMetrics = (req, res, next) => {
  res.locals.startEpoch = Date.now();
  res.on('finish', () => {
    const responseTimeInMs = Date.now() - res.locals.startEpoch;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route ? req.route.path : req.url, res.statusCode)
      .observe(responseTimeInMs);
  });
  next();
};

app.use(collectMetrics);

// Define o nome da réplica usando o nome do host
const replicaName = os.hostname();

// Variável para armazenar o ID do build
let buildId = '';

// Configura o middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));

// Rota para enviar a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para obter o nome da réplica
app.get('/replica', (req, res) => {
  res.json({ replica: replicaName });
});

// Rota para receber o ID do build do Jenkins
app.post('/build-id', (req, res) => {
  buildId = req.body.buildId;
  res.sendStatus(200);
});

// Rota para enviar o ID do build
app.get('/build-id', (req, res) => {
  res.json({ buildId });
});

// Endpoint para expor as métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});