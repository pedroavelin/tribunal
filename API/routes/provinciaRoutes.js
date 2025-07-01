const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/auth');
const provinciaController = require('../controllers/provinciaController')

/**
 * @swagger
 * /api/provincias:
 *   get:
 *     summary: Listar províncias
 *     tags: [Província]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.get('/',[verifyToken],  provinciaController.findAll)
/**
 * @swagger
 * /api/provincias/:id/municipios:
 *   get:
 *     summary: Listar províncias e seus respectivos municípios
 *     tags: [Província]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não autorizado
 */
router.get('/:id/municipios', [verifyToken], provinciaController.findMunicipiosByProvincia)

module.exports = router
