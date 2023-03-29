const express = require('express');
const { check } = require('express-validator');
const api = require('./api');
const router = express.Router();

router.get('/getProjects', api.getProjects);

router.post('/addProject', api.addProject);
router.post('/editProject', api.editProject);

module.exports = router;