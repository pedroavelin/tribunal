const express = require('express');
const router = express.Router();
const ProcessoController = require('../controllers/processoController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Rotas para processos
router.get('/', [verifyToken, isAdmin], ProcessoController.listar);
router.post('/', [verifyToken, isAdmin], ProcessoController.adicionar);
router.put('/:id', [verifyToken, isAdmin], ProcessoController.atualizar);
router.get('/listar-por-letra', [verifyToken, isAdmin], ProcessoController.listarPorLetraDoUsuario);

module.exports = router;