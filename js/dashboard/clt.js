var dclVarSelectMovilId;
var dcltVarJsonDataDevice;
var dcltVarJsonDataCategoria = ["Basico", "Completo"];
$(document).ready(function () {

});

function dcltLoadTemplate() {
  cltPromise2('devices', 'GET', {}, (jsonDataDevices) => {
    dcltVarJsonDataDevice = jsonDataDevices;
    document.getElementById("root").innerHTML = dcltTemplateInicio("Dashboard");

    console.log(jsonDataDevices);
    $("#cltCbxMovil").change(function () {
      var x = document.getElementById("cltCbxMovil").selectedIndex;
      var y = document.getElementById("cltCbxMovil").options;
      var z = document.getElementById("cltCbxMovil").value;
      let nombre = y[x].text;
      dclVarSelectMovilId = z;
    });

  });

}


//Accion
function dcltBtnShow() {
  fInicio = document.getElementById("dcltInpInicio").value.replaceAll("-", "");
  fFin = document.getElementById("dcltInpFin").value.replaceAll("-", "");

  if (fInicio == "" || fFin == "") {
    alert("Deves seleccionar una fecha de inicio y de fin pra el reporte");
    return;
  }
  data = {
    "texto": 'cltItemComplet',
    "text1": fInicio,
    "text2": fFin,
    "number1": dclVarSelectMovilId
  }
  console.log("Datos "+dclVarSelectMovilId+ " "+fInicio+" "+fFin);

  cltPromise2('aux/query', 'POST', data, (jsonData) => {

    var listBasico = jsonData.filter(function (data) {
      
      return data.text2 == "Basico";
    });
    var listCompleto = jsonData.filter(function (data) {
      return data.text2 == "Completo";
    });
    

    var dataLabelBasico = [];
    var dataNumberBasico = [];
    var dataLabelCompleto = [];
    var dataNumberCompleto = [];
    for (let i in listBasico) {
      dataLabelBasico.push(listBasico[i]["text1"]);
      dataNumberBasico.push(listBasico[i]["number1"]);
    }
    for (let i in listCompleto) {
      dataLabelCompleto.push(listCompleto[i]["text1"]);
      dataNumberCompleto.push(listCompleto[i]["number1"]);
    }
    var dataB = {};
    dataB = {
      labels: dataLabelBasico,
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: dataNumberBasico
        }
      ]
    };
    var dataC = {};
    dataC = {
      labels: dataLabelCompleto,
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: dataNumberCompleto
        }
      ]
    };
    document.getElementById("dclt").innerHTML = "";
    for (let i in dcltVarJsonDataCategoria) {
      document.getElementById("dclt").innerHTML += dcltTemplateLine(dcltVarJsonDataCategoria[i]);
      
    }
    /*
    $('#canvas_Basico').remove(); // this is my <canvas> element
    $('#contentCanvas_Basico').append('<canvas class="embed-responsive-item" id="canvas_"></canvas>');
    */
    var ctxlB = $("#canvas_Basico").get(0).getContext("2d");
      new Chart(ctxlB).Line(dataB);

      var ctxlC = $("#canvas_Completo").get(0).getContext("2d");
      new Chart(ctxlC).Line(dataC);

  });
}

//Template

function dcltTemplateCBXGetMovil(jsonData) {
  let html = '<option selected="true" hidden>Movil</option>';
  for (var i in jsonData) {
    html += '<option class="form-control" value="' + jsonData[i]["id"] + '">' + jsonData[i]["name"] + '</option>'
  }
  return '      <div class="form-group ml-1">' +
    '                  <select class="form-control" id="cltCbxMovil">' + html +
    '                  </select>' +
    '             </div>';
}
function dcltTemplateCBXGetCategoria(jsonData) {
  let html = '<option selected="true" hidden>Categoria</option>';
  for (var i in jsonData) {
    html += '<option value="' + jsonData[i] + '">' + jsonData[i] + '</option>'
  }
  return '          <div class="form-group ml-1">' +
    '                  <select class="form-control col-12" id="cltCbxMovil">' + html +
    '                  </select>' +
    '               </div>';
}

function dcltTemplateInicio(titulo) {
  return '<div class="app-title">' +

    '      <div>' +
    '        <h1><i class="fa fa-edit"></i>' + titulo + '</h1>' +
    '        <p>Visualizacion de todas las categorias</p>' +
    '      </div>' +
    '      <div class="row">' +
    dcltTemplateCBXGetMovil(dcltVarJsonDataDevice) +
    '<div class="col-3 ml-1">' +
    '  <input  class="form-control " type="date" id="dcltInpInicio"/>' +
    '  <small class="form-text text-muted" id="emailHelp">Inicio</small>' +
    '</div>' +

    '<div class="col-3 ml-1">' +
    '  <input  class="form-control " type="date" id="dcltInpFin"/>' +
    '  <small class="form-text text-muted" id="emailHelp">Fin</small>' +
    '</div>' +
    '<div class="form-group col-col-2">' +
    '  <button class="btn btn-primary ml-2" type="button" onClick="dcltBtnShow()"><i class="fa fa-fw fa-lg fa-eye"></i>Ver</button>' +
    '</div>'
    + '</div>' +
    '    </div>' +
    '    <div id="dclt" class="row">' +
    '    </div>';
}
function dcltTemplateLine(categoria) {
  return ' <div class="col-md-6">' +
    '        <div class="tile">' +
    '          <h3 class="tile-title">' + categoria + '</h3>' +
    '          <div id="contentCanvas_' + categoria + '" class="embed-responsive embed-responsive-16by9">' +
    '            <canvas class="embed-responsive-item" id="canvas_' + categoria + '"></canvas>' +
    '          </div>' +
    '        </div>' +
    '    </div>';
}
