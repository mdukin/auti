const { response } = require('express');
var express = require('express');
var router = express.Router();
var db = require('../db');
const fs = require('fs');
var json = require('../public/prijavljen')


router.get('/', async function(req, res, next) {
    res.sendFile("D:/or/lab2/index.html")
});


router.get('/prijava',  (req,res) =>{

  const a = { "prijavljen" : "true"} 
  const data = JSON.stringify(a);
  try {
    fs.writeFileSync('public/prijavljen.json', data);
  } catch (error) {
        }
  
  res.redirect("/login");
})

router.get('/odjava',  (req,res) =>{

  const a = { "prijavljen" : "false"} 
  const data = JSON.stringify(a);
  try {
    fs.writeFileSync('public/prijavljen.json', data);
  } catch (error) {
        }
  
  res.redirect("/");      
})

router.get('/pravaOdjava',  (req,res) =>{

  const a = { "prijavljen" : "false"} 
  const data = JSON.stringify(a);
  try {
    fs.writeFileSync('public/prijavljen.json', data);
  } catch (error) {
        }
  
  res.redirect("/logout");      
})
   
router.get('/osvjezi', async (req,res) =>{  
    
    if(json.prijavljen == "true"){ 
        let auti =  (await db.query("SELECT * FROM auti")).rows;
        let slike = (await db.query("SELECT * FROM slike")).rows;
       
        for(let auto of auti){
            auto.slike = [];
            let pripadajuce_slike =  slike.filter(slika => slika.auto_id == auto.auto_id)
            for(let slika of pripadajuce_slike) auto.slike.push(slika.image);
        }

        const csvData = JsonToCSV(auti);
        const jsonData = JSON.stringify(auti);
        try {
            fs.writeFileSync('public/assets/auti.json', jsonData);
            fs.writeFileSync('public/assets/auti.csv', csvData);
          } catch (error) {}

        
        res.redirect("/")
    }else{
        res.status(401).send("Not logged in")
    }
    
})

function JsonToCSV(auti){

    JsonFields = ["naziv","marka","model","gorivo",
    "godinaproizvodnje","snagamotora","maxbrzina","masa",
    "potrosnjagoriva","mjenjac", "id", "slike"]

    var csvStr = JsonFields.join(",") + "\n";

    auti.forEach(element => {
      naziv = element.naziv;
      marka  = element.marka;
      model   = element.model
      gorivo  = element.gorivo
      godinaproizvodnje = element.godinaproizvodnje;
      snagamotora = element.snagamotora;
      maxbrzina  = element.maxbrzina;
      masa   = element.masa
      potrosnjagoriva  = element.potrosnjagoriva
      mjenjac = element.mjenjac;
      id = element.auto_id
      slike = element.slike

      csvStr += naziv + ',' + marka + ','  + model + ',' + gorivo +
      ',' + godinaproizvodnje + ',' + snagamotora + ',' + maxbrzina +
      ',' + masa + ',' + potrosnjagoriva + ',' + mjenjac + ',' + id +
      ', '+ slike + "\n";
      })
      return csvStr;
}


module.exports = router; 