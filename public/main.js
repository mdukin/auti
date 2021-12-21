
    generate();

    async function obrazac(){
        let value = document.getElementById('value').value;
        let filter = document.getElementById('select').value;

        const data = {value,filter};

        const response = await fetch('datatable/filter', {
         method: 'POST',
         headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
         body: JSON.stringify(data)
         });
        const filtriraniAuti = await response.json();
        
        stvori(filtriraniAuti);

        JsonFields = ["naziv","marka","model","gorivo",
                  "godinaproizvodnje","snagamotora","maxbrzina","masa",
                  "potrosnjagoriva","mjenjac"]
        let idk = JsonToCSV(filtriraniAuti,JsonFields);

        const downloads = document.createElement('div');
        downloads.id = "d";
        document.body.appendChild(downloads);


        downloadCSV(idk);
        downloads.appendChild(document.createElement('br'))
        downloadJSON(filtriraniAuti)
    }

    function downloadJSON(auti){
        j = document.createElement('a');
        j.text='downloadJSON'
        j.download="filtriraniAuti.json"
        j.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auti));
        document.getElementById("d").appendChild(j);
    }

    function JsonToCSV(auti,JsonFields){

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

        csvStr += naziv + ',' + marka + ','  + model + ',' + gorivo +
        ',' + godinaproizvodnje + ',' + snagamotora + ',' + maxbrzina +
        ',' + masa + ',' + potrosnjagoriva + ',' + mjenjac +"\n";
        })
        return csvStr;
}
    
    function downloadCSV(csvStr) {
      a=document.createElement('a');
      a.textContent='downloadCSV';
      a.download="filtriraniAuti.csv";
      a.href='data:text/csv;charset=utf-8,'+escape(csvStr);
      document.getElementById("d").appendChild(a);
    }
      
    async function generate(){
    ocisti();
    const response = await fetch('datatable/data');
    const auti = await response.json();

    stvori(auti);

}

    function ocisti(){
      if(document.getElementById("d") !== null)
      document.body.removeChild(document.body.lastChild);

  const root = document.getElementById('table');

  if(root !== null){
    while (root.childNodes.length > 2) {
        root.removeChild(root.lastChild);
    }
  }

}

  async function stvori(auti){
  ocisti();

  const response = await fetch('datatable/images');
  const slike = await response.json();

  const root = document.getElementById('table');

  for(auto of auti){
    const redak = document.createElement('tr');
        redak.id= `${auto.naziv}`;
        root.append(redak);

        let value = document.createElement('th');
        value.textContent = `${auto.naziv}`;
        redak.append(value);

        value = document.createElement('th');
        value.textContent = `${auto.marka}`;
        redak.append(value);

        value = document.createElement('th');
        value.textContent = `${auto.model}`;
        redak.append(value);

        value = document.createElement('th');
        value.textContent = `${auto.gorivo}`;
        redak.append(value);

        value = document.createElement('th');
        value.textContent = `${auto.godinaproizvodnje}`;
        redak.append(value);

        value = document.createElement('th');
        value.textContent = `${auto.snagamotora}`;
        redak.append(value);

        value = document.createElement('th');
        value.textContent = `${auto.maxbrzina}`;
        redak.append(value);

        value = document.createElement('th');
        value.textContent = `${auto.masa}`;
        redak.append(value);

        value = document.createElement('th');
        value.textContent = `${auto.potrosnjagoriva}`;
        redak.append(value);

        value = document.createElement('th');
        value.textContent = `${auto.mjenjac}`;
        redak.append(value);

        for(slika of slike){
          if(slika.auto_id === auto.auto_id){
            value = document.createElement('img');
            value.src = slika.image;
          //  value.src = "./images/" + slika.image;
            value.style= "width:240px";
            redak.append(value);
          }
        }
       
}

}
