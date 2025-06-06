const express = require('express');
const router = express.Router();
const tribunalController = require('../controllers/tribunalController');

router.post('/', tribunalController.create);
router.get('/', tribunalController.findAll);
router.get('/with-municipio', tribunalController.findAllWithMunicipio);
router.get('/:id', tribunalController.findOne);
router.put('/:id', tribunalController.update);
router.delete('/:id', tribunalController.delete);

module.exports = router;