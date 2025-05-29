const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const checkPermission = require('../middleware/permissions');
const userController = require('../controllers/userController');
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listar todos usuários
 *       401:
 *         description: Não autorizado
 */
router.get('/', [verifyToken, isAdmin], userController.getAllUsers);
/**
 * @swagger
 * /api/users/id:
 *   get:
 *     summary: Listar usuário específico
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listar usuário específico
 *       401:
 *         description: Não autorizado
 */
router.get('/:id', [verifyToken, checkPermission('view_users')], userController.getUser);
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Criar novo usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post('/', [verifyToken, isAdmin], userController.createUser);
/**
 * @swagger
 * /api/users/id:
 *   put:
 *     summary: Actualizar usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', [verifyToken, checkPermission('edit_users')], userController.updateUser);
/**
 * @swagger
 * /api/users/id:
 *   delete:
 *     summary: Eliminar usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário cadastrado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', [verifyToken, isAdmin], userController.deleteUser);
/**
 * @swagger
 * /api/users/userId/assign-role:
 *   post:
 *     summary: Atribuir papel a um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não atribuido
 */
router.post('/:userId/assign-role', [verifyToken, isAdmin], userController.assignRole);
/**
 * @swagger
 * /api/users/userId/remove-role:
 *   delete:
 *     summary: Remover papel de um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não removido
 */
router.delete('/:userId/remove-role', [verifyToken, isAdmin], userController.removeRole);

module.exports = router;