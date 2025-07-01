const express = require('express');
const router = express.Router();
const ProcessoController = require('../controllers/processoController');
const { verifyToken, isAdmin, allowAllRoles} = require('../middleware/auth');

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
router.get('/listar-por-letra',[ verifyToken, allowAllRoles], ProcessoController.listarPorLetraDoUsuario);
/**
 * @swagger
 * /api/processos/filtrar:
 *   get:
 *     summary: Pesquisar processo
 *     tags: [Processos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.get('/filtrar', [verifyToken], ProcessoController.filtrarProcessos);
/**
 * @swagger
 * /api/processos/{id}/arguidos:
 *   post:
 *     summary: Associar arguido a um processo
 *     tags: [Processos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
// router.post('/:id/:id/arguidos', [verifyToken, isAdmin], ProcessoController.associarArguido);
router.post('/:numero/:ano/arguidos', [verifyToken], ProcessoController.associarArguido);
/**
 * @swagger
 * /api/processos/{id}/declarantes:
 *   post:
 *     summary: Associar declarante a um processo
 *     tags: [Processos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
// router.post('/associar-declarante', [verifyToken, isAdmin], ProcessoController.associarDeclarante);

module.exports = router;