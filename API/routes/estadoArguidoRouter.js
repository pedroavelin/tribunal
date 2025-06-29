const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const estadoArguidoController = require('../controllers/estadoArguidoController');

/**
 * @swagger
 * /api/listar:
 *   get:
 *     summary: Listar estado dos arguidos
 *     tags: [estadoDosArguidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.get('/', [verifyToken, isAdmin], estadoArguidoController.findAll);
module.exports = router;