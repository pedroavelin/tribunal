const express = require('express');
const router = express.Router();
const ProcessoController = require('../controllers/processoController');

// Rotas para processos
router.get('/', ProcessoController.listar);
router.post('/', ProcessoController.adicionar);
router.put('/:id', ProcessoController.atualizar);

module.exports = router;