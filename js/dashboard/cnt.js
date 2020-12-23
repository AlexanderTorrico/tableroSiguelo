var dcntVarJsonDataCategoria = ["Egreso", "Ingreso"];
$(document).ready(function () {

});

function dcntLoadTemplateDshCuenta() {
  
  document.getElementById("root").innerHTML = dcntTemplateInicio("Cuentas");
  let data = {
    "texto": "cuentaComplet",
    "text1": "20201201",
    "text2": "20201229",
    "text3": "Debe"
  }
  cltPromise2('aux/query', 'POST', data, (jsonData) => {
    console.log(jsonData);
    let html = "";;
    for (let i in dcntVarJsonDataCategoria) {
      html += dcntTemplateChart(dcntVarJsonDataCategoria[i]);
    }
    document.getElementById("dcnt").innerHTML = html;
    var pdata = [
      {
        value: 300,
        color: "rgb(4,12,200)",
        highlight: "#FF5A5E",
        label: "Red"
      },
      {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
      },
      {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
      }
    ]

    var pE = [];
    for (var j in jsonData) {
      pE.push({
        value: jsonData[j]["number1"],
        color: "rgb(" + getRandomInt(0, 254) + "," + getRandomInt(0, 254) + "," + getRandomInt(0, 254) + ")",
        highlight: "#FF5A5E",
        label: jsonData[j]["text1"]
      });
    }




    var ctxpE = $("#pieChartDemo_Egreso").get(0).getContext("2d");
    new Chart(ctxpE).Pie(pE);





    let data = {
      "texto": "cuentaComplet",
      "text1": "20201201",
      "text2": "20201218",
      "text3": "Haber"
    };
    cltPromise2('aux/query', 'POST', data, (jsonData) => {
      var pD = [];
      for (var j in jsonData) {
        pD.push({
          value: jsonData[j]["number1"],
          color: "rgb(" + getRandomInt(0, 254) + "," + getRandomInt(0, 254) + "," + getRandomInt(0, 254) + ")",
          highlight: "#FF5A5E",
          label: jsonData[j]["text1"]
        });
      }

      var ctxpI = $("#pieChartDemo_Ingreso").get(0).getContext("2d");
      new Chart(ctxpI).Pie(pD);
    });
  });



}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//Template
function dcntTemplateChart(tipo) {
  return '<div class="col-md-6">' +
    '          <div class="tile">' +
    '            <h3 class="tile-title">' + tipo + '</h3>' +
    '            <div class="embed-responsive embed-responsive-16by9">' +
    '              <canvas class="embed-responsive-item" id="pieChartDemo_' + tipo + '"></canvas>' +
    '            </div>' +
    '          </div>' +
    '        </div>';
}
function dcntTemplateInicio(titulo) {
  return '<div class="app-title">' +

    '      <div>' +
    '        <h1><i class="fa fa-edit"></i>' + titulo + '</h1>' +
    '        <p>Visualizacion de todas las categorias</p>' +
    '      </div>' +
    '      <div class="row">' +

    '<div class="col-4 ml-1">' +
    '  <input  class="form-control " type="date" id="dcntInpInicio"/>' +
    '  <small class="form-text text-muted" id="emailHelp">Inicio</small>' +
    '</div>' +

    '<div class="col-4 ml-1">' +
    '  <input  class="form-control " type="date" id="dcntInpFin"/>' +
    '  <small class="form-text text-muted" id="emailHelp">Fin</small>' +
    '</div>' +
    '<div class="form-group col-2">' +
    '  <button class="btn btn-primary ml-2" type="button" onClick="dcntBtnShow()"><i class="fa fa-fw fa-lg fa-eye"></i></button>' +
    '</div>'
    + '</div>' +
    '    </div>' +
    '    <div id="dcnt" class="row">' +
    '    </div>';
}


