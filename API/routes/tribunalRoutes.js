const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth');
const tribunalController = require('../controllers/tribunalController');

/**
 * @swagger
 * /api/tribunal:
 *   post:
 *     summary: Registar tribunal
 *     tags: [Tribunal]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não removido
 */
router.post('/', [verifyToken, isAdmin], tribunalController.create);
/**
 * @swagger
 * /api/tribunal:
 *   get:
 *     summary: Buscar todos tribunais
 *     tags: [Tribunal]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não removido
 */
router.get('/',  [verifyToken, isAdmin],tribunalController.findAll);
/**
 * @swagger
/**
 * @swagger
 * /api/tribunal:
 *   get:
 *     summary: findAllWithMunicipio
 *     tags: [Tribunal]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não removido
 */
router.get('/with-municipio', [verifyToken, isAdmin], tribunalController.findAllWithMunicipio);
/**
 * @swagger
* /api/tribunal/id:
 *   get:
 *     summary: Buscar tribunal por ID
 *     tags: [Tribunal]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não removido
 */
router.get('/:id',  [verifyToken, isAdmin],tribunalController.findOne);
/**
 * @swagger
 * /api/tribunal:
 *   put:
 *     summary: Atualizar tribunal
 *     tags: [Tribunal]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não removido
 */
router.put('/:id', [verifyToken, isAdmin], tribunalController.update);
/**
 * @swagger
 * /api/tribunal:
 *   delete:
 *     summary: Eliminar/Destivar tribunal
 *     tags: [Tribunal]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Não removido
 */
router.delete('/:id', [verifyToken, isAdmin], tribunalController.delete);

module.exports = router;