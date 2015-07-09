'use strict';

var express = require('express');
var controller = require('./candidate.controller');

var router = express.Router();

router.get('/:contestslug/candidates',controller.list);
router.post('/:contestslug/candidates', controller.create);

module.exports = router;