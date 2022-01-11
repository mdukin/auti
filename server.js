const express = require("express");
const app = express();
var db = require('./db');
var path = require('path');
var json = require('./public/prijavljen')
const { auth, requiresAuth } = require('express-openid-connect');

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

app.use(
  auth({
    issuerBaseURL: 'https://dev-j-8ztbh3.us.auth0.com',
    baseURL: 'http://localhost:3000',
    clientID: 'oGg8AEbxFbzVjuQ2zEV4sxNu68qu27Tv',
    secret: '6Lzb1NxJ0qc5bjT8Jytyl4joKN7bViz8Vu6JOaDkzyy5hu4u_Hg1eak7Vn49gRYB',
    idpLogout: true,
  })
);

app.get('/profile', function(req,res) {
  if(json.prijavljen == "true"){
    res.send((req.oidc.user));
}else{
    res.status(401).send("Not logged in")
}

})

app.listen(3000);