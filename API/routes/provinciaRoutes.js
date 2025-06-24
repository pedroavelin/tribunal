const express = require('express')
const router = express.Router()
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
router.get('/', provinciaController.findAll)
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
router.get('/:id/municipios', provinciaController.findMunicipiosByProvincia)

module.exports = router
