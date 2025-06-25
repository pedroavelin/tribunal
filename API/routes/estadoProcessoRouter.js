const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const estadoProcessoController = require('../controllers/estadoProcessoController');

/**
 * @swagger
 * /api/listar:
 *   get:
 *     summary: Listar estado dos processos
 *     tags: [estadoDoProcesso]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.get('/', [verifyToken], estadoProcessoController.findAll);
module.exports = router;