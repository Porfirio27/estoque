const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');

router.post('/', produtosController.criarProduto);
router.get('/', produtosController.listarProdutos);
router.delete('/:id', produtosController.deletarProduto);
// Adicionaremos rotas de update e buscar por id aqui no futuro

module.exports = router;