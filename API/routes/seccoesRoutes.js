const express = require('express')
const router = express.Router()
const { verifyToken, isAdmin } = require('../middleware/auth');
const seccaoController = require('../controllers/seccaoController')

/**
 * @swagger
 * /api/seccao:
 *   post:
 *     summary: Registar secção
 *     tags: [Secção]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.post('/', [verifyToken], seccaoController.create)
/**
 * @swagger
 * /api/seccao:
 *   get:
 *     summary: Listar secção
 *     tags: [Secção]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.get('/', [verifyToken], seccaoController.findAllWithDetails)

module.exports = router
