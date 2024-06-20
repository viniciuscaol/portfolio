const express = require('express');
const os = require('os');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Define o nome da réplica usando o nome do host
const replicaName = os.hostname();

// Configura o middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para enviar a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para obter o nome da réplica
app.get('/replica', (req, res) => {
  res.json({ replica: replicaName });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
