const express = require('express');
const router = express.Router();
const ProcessoController = require('../controllers/processoController');
const { verifyToken, isAdmin } = require('../middleware/auth');

/**
 * @swagger
 * /api/processos:
 *   get:
 *     summary: Listar todos os processos
 *     tags: [Processos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.get('/', [verifyToken, isAdmin], ProcessoController.listar);
/**
 * @swagger
 * /api/processos/{id}:
 *   get:
 *     summary: Listar processo específico
 *     tags: [Processos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do processo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.post('/', [verifyToken, isAdmin], ProcessoController.adicionar);
/**
 * @swagger
 * /api/processos/{id}:
 *   put:
 *     summary: Actualizar processo
 *     tags: [Processos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do processo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', [verifyToken, isAdmin], ProcessoController.atualizar);
/**
 * @swagger
 * /api/processos/listar-por-letra:
 *   get:
 *     summary: Listar processos por letra do usuário
 *     tags: [Processos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.get('/listar-por-letra', [verifyToken, isAdmin], ProcessoController.listarPorLetraDoUsuario);
router.get('/filtrar', [verifyToken, isAdmin], ProcessoController.filtrarProcessos);

module.exports = router;