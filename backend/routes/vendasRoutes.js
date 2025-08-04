const express = require('express');
const router = express.Router();
const vendasController = require('../controllers/vendasController');

router.post('/', vendasController.criarVenda);
router.get('/', vendasController.listarVendas);

module.exports = router;