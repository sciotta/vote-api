'use strict';

var express = require('express');
var controller = require('./votes.controller');

var router = express.Router();

router.get('/:contestslug',controller.byContest);
router.get('/:contestslug/:candidateid', controller.byCandidate);
router.post('/:contestslug/:candidateid', controller.vote)

module.exports = router;