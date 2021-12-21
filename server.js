const express = require("express");
const app = express();
var db = require('./db');
var path = require('path');

app.use(express.json())

let indexRouter = require('./routes/indexRoute');
let tableRouter = require('./routes/tableRoute');
let apiRouter = require('./routes/apiRoute');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set('content-type', 'application/json'),

app.use('/',indexRouter);
app.use('/datatable',tableRouter);
app.use('/api', apiRouter);

app.listen(3000);