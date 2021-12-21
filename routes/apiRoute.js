const { response } = require('express');
var express = require('express');
var router = express.Router();
var db = require('../db');
//var chars = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';


router.get('/auti', async function(req, res, next) {
    let auti =  (await db.query("SELECT * FROM auti")).rows;
    let slike = (await db.query("SELECT * FROM slike")).rows;

    let odgovor = {};
    odgovor.status = "OK";
    odgovor.message = "fetched all cars";

    for(let auto of auti){
        auto.images = [];
        for(let slika of slike){
            if(slika.auto_id == auto.auto_id){
                auto.images.push(slika);
            }      
        }

    auto.links = links(auto.auto_id);
    }
   
    odgovor.response = auti;
    res.status(200).contentType('application/json').send(odgovor);
    
});

router.get('/auti/:id', async function(req, res, next) {
    let idd =  req.params.id ;
    try {
        let id = parseInt(idd);

        let odgovor = {};
        let auto = (await db.query(`SELECT * FROM auti 
                               WHERE auto_id =  $1`,
                             [id],
        )).rows[0];

        if(auto === undefined){
            error(res,404,"Not Found", "no car with id: " + id)
        }
        else{
        let slike = (await db.query(`SELECT * FROM slike 
                               WHERE auto_id =  $1`,
                                [id],
        )).rows;
       
        odgovor.status = "OK";
        odgovor.message = "fetched the car with id: " + id;

        auto.images = [];
        for(let slika of slike){
            if(slika.auto_id == auto.auto_id){
                auto.images.push(slika)
            }
        }

        auto.links = links(auto.auto_id);
       
        odgovor.response = auto;
        res.status(200).contentType('application/json').send(odgovor);
        }
    } catch (err) {
        error(res, 400 ,"Bad Request", "Invalid parameter: " +idd);
    }


    
});

router.get('/auti/marka/:id', async function(req, res, next) {
    let param = req.params.id;

    if(Number.isInteger(parseInt(param))){

       error(res, 400 ,"bad request", "invalid parameter: " +param);
    }
    else{
        let odgovor = {};
        let auti = (await db.query(`SELECT * FROM auti 
                      WHERE UPPER(marka) = UPPER ($1)`,
                    [param],   )).rows;

        if(auti.length == 0){
            error(res,404,"Not Found", "no marka with name: " + param)
        }
        else{
        let slike = (await db.query("SELECT * FROM slike ")).rows;

        odgovor.status = "OK";
        odgovor.message = "fetched the cars with marka: " + param;

        for(let auto of auti){
            auto.images = [];
            for(let slika of slike){
                if(slika.auto_id == auto.auto_id){
                    auto.images.push(slika);
                }      
            }
            auto.links = links(auto.auto_id);
        }

        odgovor.response = auti;
        res.status(200).contentType('application/json').send(odgovor);
    }
    }

    
});

router.get('/auti/godina/:id', async function(req, res, next) {
    let idd =  req.params.id ;
    try {

        if(!Number.isInteger(parseInt(idd))) throw error;
 
        let godina = parseInt(idd);

       if(godina <1886 || godina >2050 ) throw error;
        
        let odgovor = {};
 
        let auti =  (await db.query(`SELECT * FROM auti 
                        WHERE godinaproizvodnje =  $1`,
                    [godina],  )).rows;
           
        if(auti.length === 0){
            error(res,404,"Not Found", "no car in year: " + godina);
        }
        else{
            let slike = (await db.query("SELECT * FROM slike ")).rows;
       
        odgovor.status = "OK";
        odgovor.message = "fetched the cars from: " + godina;

        for(let auto of auti){
            auto.images = [];
            for(let slika of slike){
                if(slika.auto_id == auto.auto_id){
                    auto.images.push(slika);
                }      
            }      
            auto.links = links(auto.auto_id);
        }
       
        odgovor.response = auti;
        res.status(200).contentType('application/json').send(odgovor);
        }
    } catch (err) {
        error(res, 400 ,"Bad Request", "Invalid parameter: " +idd);
    }
});

router.get('/slike', async function(req, res, next){
    let slike = (await db.query("SELECT * FROM slike")).rows;

    let odgovor = {};
    odgovor.status = "OK";
    odgovor.message = "fetched all pictures";
   
    odgovor.response = slike;
    res.status(200).contentType('application/json').send(odgovor);
});

router.get('/openapi', async function(req, res, next){

    res.status(200).contentType('application/json').sendFile("D:/or/lab2/public/openapi.json");
});

router.post('/auti/insert', async function(req,res,next) {
  
    try {
         let auto = req.body;

         await db.query(`INSERT INTO auti
         (naziv, marka, model, gorivo, godinaproizvodnje, snagamotora,maxbrzina,
            masa,potrosnjagoriva,mjenjac)
        VALUES ($1, $2,$3, $4, $5, $6, $7, $8, $9, $10)`,
         [
            auto.naziv,
            auto.marka,
            auto.model,
            auto.gorivo,
            auto.godinaproizvodnje,
            auto.snagamotora,
            auto.maxbrzina,
            auto.masa,
            auto.potrosnjagoriva,
            auto.mjenjac
        ],
    );

    for(let slika  of auto.slike){
        await db.query(`INSERT INTO slike
        (image, auto_id)
       VALUES ($1, $2)`,
        [
           slika,
           auto.auto_id,
       ],
    );
    }
    
  
        auto =  (await db.query(`SELECT * FROM auti 
                        WHERE naziv =  $1`,
                    [auto.naziv],  )).rows[0];

        let odgovor = {};
        odgovor.status = "Created";
        odgovor.message = "created new car";
       
        auto.links = links(auto.auto_id);
        odgovor.created = auto ;
        odgovor.location = "/api/auti/"+auto.auto_id;
        res.status(201).contentType('application/json').send(odgovor);
    } catch (err) {
        error(res, 400, "Bad Request", "failed to create new car: "+err);
    }

});


router.delete('/auti/delete/:id', async function(req,res,next) {
    let idd =  req.params.id ;
    try {

        if(!Number.isInteger(parseInt(idd))) throw error;

        let id = parseInt(idd);
 
        let rez =  (await db.query(`DELETE FROM auti 
                        WHERE auto_id =  $1`,
                        [id],  ));
        
        if(rez.rowCount == 0){
            error(res, 404, "Not Found", "Failed to delete, car doesn't exist")
        } 
        else{
            (await db.query(`DELETE FROM slike 
                        WHERE auto_id =  $1`,
                        [id],  ));

            let odgovor = {};
            odgovor.status = "OK";
            odgovor.message = "deleted the car with the id: " + id;
           
            links = [];
            let ret = {};
            ret.href = "/api/auti";
            ret.rel = "dataset"
            ret.type = "GET";
            links.push(ret);
     
            odgovor.links = links;
            res.status(200).contentType('application/json').send(odgovor);
    
        }

    } catch (err) {
        error(res, 400 ,"Bad Request", "failed to delete, invalid: " +idd);
    }
});

router.put('/auti/update/:id', async function(req,res,next){
    let idd =  req.params.id ;
    try {

        if(!Number.isInteger(parseInt(idd))) throw error;

        let auto = req.body;
        let id = parseInt(idd);

        let car = ( await db.query(`SELECT * FROM auti WHERE auto_id = $1`,
                          [id],  )).rows[0];
       
        if(car === undefined){
            error(res, 204, "No Content", "Didn't update, car doesn't exist");
        }
        else{
          if(auto.naziv == null) {  auto.naziv = car.naziv };
          if(auto.marka == null) {  auto.marka =  car.marka };
          if(auto.model == null)  { auto.model = car.model };
          if(auto.gorivo == null)  { auto.gorivo = car.gorivo }
          if(auto.godinaproizvodnje == null) {  auto.godinaproizvodnje =  car.godinaproizvodnje};
          if(auto.snagamotora == null) {  auto.snagamotora =   car.snagamotora };
          if(auto.maxbrzina == null)  { auto.maxbrzina =  car.maxbrzina };
          if(auto.masa == null)  { auto.masa =   car.masa };
          if(auto.potrosnjagoriva == null) {  auto.potrosnjagoriva = car.potrosnjagoriva };
          if(auto.mjenjac == null)  { auto.mjenjac =   car.mjenjac };

            await db.query(`UPDATE auti SET 
                          (naziv, marka, model, gorivo, godinaproizvodnje, snagamotora,maxbrzina,
                              masa,potrosnjagoriva,mjenjac) =
                          ($1, $2,$3, $4, $5, $6, $7, $8, $9, $10) WHERE auto_id = $11`,
                            [
                                auto.naziv,
                                auto.marka,
                                auto.model,
                                auto.gorivo,
                                auto.godinaproizvodnje,
                                auto.snagamotora,
                                auto.maxbrzina,
                                auto.masa,
                                auto.potrosnjagoriva,
                                auto.mjenjac,
                                id
                            ], );                      
            
        let odgovor = {};
        odgovor.status = "OK";
        odgovor.message = "updated the car with the id: " + id;
       
        let auto = ( await db.query(`SELECT * FROM auti WHERE auto_id = $1`,
                                    [id],  )).rows[0];
        auto.links = links(auto.auto_id);
        odgovor.response = auto;

        res.status(200).contentType('application/json').send(odgovor);

        }
           
    } catch (err) {
        error(res, 400 ,"Bad Request", "failed to update, invalid: " +idd);
    }
});

router.use('/', async function(req, res, next) {

    if(req.method == "GET")
        error(res, 404, "Not Found", "Doesn't exist: " + req.path)
    else 
       error(res, 501, "Not implemented", "requested method is not supported with this path")
    
});


function links(id){
    let links = [];
    let getResource = {};
    getResource.href = "/api/auti/" + id;
    getResource.rel = "self"
    getResource.type = "GET";
    let deleteResource = {};
    deleteResource.href = "/api/auti/delete/" + id;
    deleteResource.rel = "delete_self"
    deleteResource.type = "DELETE";
    let updateResource = {};
    updateResource.href = "/api/auti/update/" + id;
    updateResource.rel = "update_self"
    updateResource.type = "PUT";
    links.push(updateResource);
    links.push(getResource);
    links.push(deleteResource);
    return links;

}

function error(res, err_code, err_status, err_mess){
    let odgovor = {};
    odgovor.status = err_status;
    odgovor.message = err_mess;
    odgovor.response = null;
    res.status(err_code).contentType('application/json').send(odgovor);
}
 

module.exports = router;