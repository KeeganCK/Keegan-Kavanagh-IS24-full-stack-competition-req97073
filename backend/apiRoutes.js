const express = require('express');
const { check } = require('express-validator');
const api = require('./api');
const router = express.Router();

router.get('/getProjects', api.getProjects);
router.get('/getscrumMasterProjects/:name', api.getscrumMasterProjects);
router.get('/getdeveloperProjects/:name', api.getdeveloperProjects);

router.post('/addProject', api.addProject);
router.post('/editProject', api.editProject);

module.exports = router;