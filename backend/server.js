const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db'); 

const app = express();

app.use(cors());
app.use(express.json());

// --- ROTAS DA API ---
// Importando os arquivos de rotas
const categoriasRoutes = require('./routes/categoriasRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const vendasRoutes = require('./routes/vendasRoutes'); // << NOVO

// Usando as rotas com prefixos
app.use('/api/categorias', categoriasRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/vendas', vendasRoutes); // << NOVO


app.get('/', (req, res) => {
  res.send('API do Sistema de Estoque está no ar!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});