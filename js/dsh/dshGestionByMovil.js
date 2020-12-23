function dshLoadGestorByMovil(data){
  data.texto = "dsEgresoIngresoByEquipo";

  console.log/(data);

  cltPromise2('aux/query', 'POST', data, (jsonData) => {
    
    var listHaber = jsonData.filter(function (data) {
      return data.text2 == "Haber";
    });
    var listDebe = jsonData.filter(function (data) {
      return data.text2 == "Debe";
    });
    var listDebe = jsonData.filter(function (data) {
      return data.text2 == "Debe";
    });
    let html = "";
    html +=  dshGestionByMovilTemplate("Ingresos", listHaber);
    html +=  dshGestionByMovilTemplate("Gastos", listDebe);
    

    let auxGeneral = groupBy(jsonData, 'text1');
    let listGeneral = [];
    
    for(let i in auxGeneral){
      
      for(obj of auxGeneral[i]){
        if(obj.text2 == "Haber"){
          auxGeneral[i][0]["number2"] += obj["number1"];
        } else{
          auxGeneral[i][0]["number2"] += -obj["number1"];
        }
        
      }
      listGeneral.push(auxGeneral[i][0]);
    }
    
    
    listGeneral.sort((a, b) => Number(b.number2) - Number(a.number2));
    for(obj of listGeneral){
      obj.number1 = obj.number2;
    }

    
    html +=  dshGestionByMovilTemplate("General", listGeneral);
    

    document.getElementById("dshGestionByMovil").innerHTML = html;
    
  });
  
}

function dynamicSort(property) {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

function dshGestionByMovilTemplate(titulo, jsonData){
  let html = "";
  for(obj of jsonData){
    html+= dshGestionByMovilSubTemplate(obj, jsonData[0].number1);
  }

  return  '<div class="col-md-4">'+
  '        <div class="tile">'+
  '          <h7 class="tile-title">'+titulo+'</h7>'+
  '          <div class="tile-body">'+
  '            '+
  
  html+

  '          </div>'+
  '        </div>'+
  '      </div>';   
}

function dshGestionByMovilSubTemplate(obj, num){
  let porcentaje;
  if(obj.number1 < 0){
    porcentaje = 0;
  }else{
    porcentaje = 100 / num * obj.number1;
  }
  let html = '<div class="col-md-12 mt-2">'+
  '              <small>'+obj.text1+'</small>'+
  '              <div class="progress">'+
  '                <div class="progress-bar bg-warning" role="progressbar" style="width: '+porcentaje+'%" aria-valuenow="25"'+
  '                  aria-valuemin="0" aria-valuemax="100">'+obj.number1 +' bs</div>'+
  '              </div>'+
  '            </div>';
  return html;
}