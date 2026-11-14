const express = require('express');
const router = express.Router();
const { indexController } = require('../controllers/indexController');
const { createController } = require('../controllers/createController');

router.get('/', indexController.index);
router.get('/create', createController.form);
router.get('/create', createController.form);
router.post('/create', createController.create);

module.exports = router;
