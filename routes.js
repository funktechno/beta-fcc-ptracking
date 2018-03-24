'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');

const worklist = require('./controllers/worklist.js');

const about = require('./controllers/about.js');
       
router.get('/', start.index);
router.get('/dashboard', dashboard.index);
router.get('/challenge_export', dashboard.export);

router.post('/dashboard/addchallenge', dashboard.addChallenge);
router.get('/dashboard/deletechallenge/:id', dashboard.deleteChallenge);
router.get('/challenge/:id', worklist.index);

// TODO: single challenge export
// router.get('/code_export', worklist.export);

router.post('/challenge/:id/addwork', worklist.addWork);
router.get('/challenge/:id/deletework/:workid', worklist.deleteWork);

router.get('/about', about.index);


module.exports = router;
