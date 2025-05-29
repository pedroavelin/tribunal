const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const permissionController = require('../controllers/permissionController');

/**
 * @swagger
 * /api/permissions:
 *   get:
 *     summary: Listar todas permissões
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.get('/', [verifyToken, isAdmin], permissionController.getAllPermissions);
/**
 * @swagger
 * /api/permissions/id:
 *   get:
 *     summary: Listar permissão específica
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.get('/:id', [verifyToken, isAdmin], permissionController.getPermission);
/**
 * @swagger
 * /api/permissions:
 *   post:
 *     summary: Adicionar permissão
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.post('/', [verifyToken, isAdmin], permissionController.createPermission);
/**
 * @swagger
 * /api/permissions/id:
 *   put:
 *     summary: Actualizar permissão
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', [verifyToken, isAdmin], permissionController.updatePermission);
/**
 * @swagger
 * /api/permissions/id:
 *   delete:
 *     summary: Eliminar permissão
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', [verifyToken, isAdmin], permissionController.deletePermission);

module.exports = router;