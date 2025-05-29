const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const roleController = require('../controllers/roleController');

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Listar todos papeis
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.get('/', [verifyToken, isAdmin], roleController.getAllRoles);
/**
 * @swagger
 * /api/roles/rodesId:
 *   get:
 *     summary: Listar um papel específico
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.get('/:id', [verifyToken, isAdmin], roleController.getRole);
/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Registar novo papel
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.post('/', [verifyToken, isAdmin], roleController.createRole);
/**
 * @swagger
 * /api/roles/rodesId:
 *   put:
 *     summary: Editar papel
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', [verifyToken, isAdmin], roleController.updateRole);
/**
 * @swagger
 * /api/roles/rodesId:
 *   delete:
 *     summary: Eliminar papel
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', [verifyToken, isAdmin], roleController.deleteRole);
/**
 * @swagger
 * /api/roles/{id}/permissions:
 *   post:
 *     summary: Atribuir permissões a um papel
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do papel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissionIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Permissões atribuídas com sucesso
 *       404:
 *         description: Papel não encontrado
 */
router.post('/:id/permissions', [verifyToken, isAdmin], roleController.assignPermissions);

module.exports = router;