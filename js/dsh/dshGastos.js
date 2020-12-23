function dshGastosLoadItem(data) {
  data.texto = "dshSoloGastosByDate";



  cltPromise2('aux/query', 'POST', data, (jsonData) => {
    let html = "";
    let base = parseInt(jsonData[0]["number1"]);
    console.log(base);
    for (obj of jsonData) {
      let porcentaje = 100 / base * obj.number1;
      html += dshGastosTemplate(obj.text1,obj.number1,porcentaje);
    }

    document.getElementById("dshContendGastos").innerHTML = html;
  });
}


function dshGastosTemplate(nombre, monto, porcen) {
  
  return '    <div class="content">'+
    '           <h7>'+nombre+'</h7>'+
    '           <div class="progress mb-3">' +
    
    '             <div class="progress-bar bg-warning" role="progressbar" style="width: '+ porcen +'%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">'+monto+' bs</div>' +
    '           </div>'+
    '         </div>';
}