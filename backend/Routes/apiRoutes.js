const express = require('express');
const { check } = require('express-validator');
const api = require('../Controllers/api');
const router = express.Router();

router.get('/healthEndpoint', api.healthEndpoint);
router.get('/getProducts', api.getProducts);
router.get('/getscrumMasterProducts/:name', api.getscrumMasterProducts);
router.get('/getdeveloperProducts/:name', api.getdeveloperProducts);

router.post('/addProduct', api.addProduct);
router.post('/editProduct', api.editProduct);

module.exports = router;