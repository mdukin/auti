const { response } = require('express');
var express = require('express');
var router = express.Router();
var db = require('../db');


router.get('/', async function(req, res, next) {
    res.sendFile("D:/or/lab2/index.html")
});


module.exports = router;