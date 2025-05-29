const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Login
 *       401:
 *         description: Não autorizado
 */

// Rotas públicas
router.post('/signin', authController.signin);
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Registar usuário
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: success
 *       401:
 *         description: Erro ao registar
 */

router.post('/signup', [], authController.signup);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Actualizar token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token actualizado com sucesso
 *       401:
 *         description: Erro ao actualizar o token
 */
router.post('/refresh-token', authController.refreshToken);
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Terminar sessão
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Error
 */
// Rota de logout (normalmente protegida por auth)
router.post('/logout', authController.logout);

module.exports = router;