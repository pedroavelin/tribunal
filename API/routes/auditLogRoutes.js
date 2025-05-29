const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const AuditLogController = require('../controllers/AuditLogController');

/**
 * @swagger
 * /api/logs/audit-logs:
 *   get:
 *     summary: Listar todos logs
 *     tags: [Audits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.get('/audit-logs', [verifyToken, isAdmin], AuditLogController.index);

module.exports = router;
