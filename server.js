const express = require("express");
const app = express();
var db = require('./db');
var path = require('path');

app.use(express.json())

let router = require('./routes/route');
let tableRouter = require('./routes/tableRoute');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/',router);
app.use('/datatable',tableRouter);

app.listen(3000);