const { response } = require('express');
var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', async function(req, res, next) {
    res.sendFile("D:/or/lab2/datatable.html")
});

router.get('/data', async function(req, res, next) {

    let auti =  (await db.query("select * from auti")).rows;
    res.send(auti);
 
});

router.get('/images', async function(req, res, next) {
    let slike =  (await db.query("SELECT * FROM slike")).rows;
    res.send(slike);
});

router.post('/filter', async function(req, res, next) {
    let filter = req.body.filter;
    let value = req.body.value;

    value = value.toUpperCase();

    let filtrirani = [];
    let j= 0;
    let auti = (await db.query("SELECT * FROM auti")).rows;

    if(filter=="svi"){
        for(let auto of auti){
            if(auto.naziv.toUpperCase().includes(value) ||auto.marka.toUpperCase().includes(value) ||
                auto.model.toUpperCase().includes(value) ||auto.gorivo.toUpperCase().includes(value) ||
                auto.snagamotora.toUpperCase().includes(value) ||auto.maxbrzina.toUpperCase().includes(value) ||
                auto.masa.toUpperCase().includes(value) ||auto.potrosnjagoriva.toUpperCase().includes(value) ||
                auto.godinaproizvodnje.toUpperCase().includes(value) ||auto.mjenjac.toUpperCase().includes(value) 
                )
                filtrirani[j++] = auto;
        }
    }else{
        if(filter=="naziv"){
            for(let auto of auti){
                if(auto.naziv.toUpperCase().includes(value)) 
                filtrirani[j++] = auto;
            }
        }else if(filter=="marka"){
            for(let auto of auti){
                if(auto.marka.toUpperCase().includes(value)) 
                filtrirani[j++] = auto;
            }

        }else if(filter=="model"){
            for(let auto of auti){
                if(auto.model.toUpperCase().includes(value)) 
                filtrirani[j++] = auto;
            }

        }else if(filter=="gorivo"){
            for(let auto of auti){
                if(auto.gorivo.toUpperCase().includes(value)) 
                filtrirani[j++] = auto;
            }

        }else if(filter=="godinaproizvodnje"){
            for(let auto of auti){
                if(auto.godinaproizvodnje.toUpperCase().includes(value)) 
                filtrirani[j++] = auto;
            }

        }else if(filter=="snagamotora"){
            for(let auto of auti){
                if(auto.snagamotora.toUpperCase().includes(value)) 
                filtrirani[j++] = auto;
            }

        }else if(filter=="maxbrzina"){
            for(let auto of auti){
                if(auto.maxbrzina.toUpperCase().includes(value)) 
                filtrirani[j++] = auto;
            }

        }else if(filter=="masa"){
            for(let auto of auti){
                if(auto.masa.toUpperCase().includes(value)) 
                filtrirani[j++] = auto;
            }

        }else if(filter=="potrosnjagoriva"){
            for(let auto of auti){
                if(auto.potrosnjagoriva.toUpperCase().includes(value)) 
                filtrirani[j++] = auto;
            }

        }else if(filter=="mjenjac"){
            for(let auto of auti){
                if(auto.mjenjac.toUpperCase().includes(value)) 
                filtrirani[j++] = auto;
            }

        }
    }
    res.send(filtrirani)

});

module.exports = router;