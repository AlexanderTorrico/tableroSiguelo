var dcltVarJsonDataCategoria = ["Basico", "Completo"];

function dshLoadCellds() {
  let titulo = "Dashboard";
  let subtitulo = "";
  document.getElementById("root").innerHTML = getTemplateInicio(titulo, subtitulo);

  let now = new Date()
  let fin = now.toLocaleDateString().split("/");

  document.getElementById("dshDateFin").value = fin[2] + "-" + fin[1] + "-" + fin[0];

  now.setDate(now.getDate() - 6);
  let init = now.toLocaleDateString().split("/");
  document.getElementById("dshDateInicio").value = init[2] + "-" + init[1] + "-" + init[0];

  dcltBtnShow("dashboard");
}

function dshTemplate() {
  return 'hola mundo';
}


function dcltBtnShow(accion) {
  let fInicio;
  let fFin;
  let data = {};

  let auxIni = document.getElementById("dshDateInicio").value.split("-");
  let auxFin = document.getElementById("dshDateFin").value.split("-");
  fInicio = new Date(auxIni[0], parseInt(auxIni[1]) - 1, auxIni[2]);
  fFin = new Date(auxFin[0], parseInt(auxFin[1]) - 1, auxFin[2]);

  data = {
    "texto": 'dshEgresoIngresoAllByDate',
    "text1": document.getElementById("dshDateInicio").value + " 4:00:00",
    "text2": document.getElementById("dshDateFin").value + " 23:59:00",// fecha fin
    "id": getCookiesId()
  }


  let fAux = fInicio;
  console.log(fInicio.toLocaleDateString());
  console.log(fFin.toLocaleString());



  cltPromise2('aux/query', 'POST', data, (jsonData) => {

    var listDebe = {};
    var listHaber = {};

    let dataDebe = [];
    let dataHaber = [];
    let dataFecha = [];

    for (obj of jsonData) {

      if (obj.text2 == "Debe") {
        let key = obj.text1;
        var newObj = {};
        newObj[key] = obj.number1;
        listDebe = Object.assign(listDebe, newObj);

      } else {
        let key = obj.text1;
        var newObj = {};
        newObj[key] = obj.number1;
        listHaber = Object.assign(listHaber, newObj);
      }
    }


    while (fAux <= fFin) {
      let onlyDate = fAux.toLocaleDateString().replaceAll("/", "-").split("-");
      let keyHaber = listHaber[onlyDate[2] + "-" + onlyDate[1] + "-" + onlyDate[0]];
      let keyDebe = listDebe[onlyDate[2] + "-" + onlyDate[1] + "-" + onlyDate[0]];

      dataFecha.push(onlyDate[0] + "-" + onlyDate[1]);
      dataHaber.push(keyHaber == undefined ? 0 : keyHaber);
      dataDebe.push(keyDebe == undefined ? 0 : keyDebe);


      fAux.setDate(fAux.getDate() + 1);

    }


    var dataB = {};
    dataB = {
      labels: dataFecha,
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: dataHaber,
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: dataDebe
        }
      ]
    };


    document.getElementById("dshEgresoIngreso").innerHTML = dcltTemplateLine("flujo_efectivo");


    var ctxlB = $("#canvas_flujo_efectivo").get(0).getContext("2d");
    new Chart(ctxlB).Line(dataB);

    dshGastosLoadItem(data);
    dshLoadGestorByMovil(data);
  });
}

function dcltTemplateLine(categoria) {
  return ' <div class="col-md-12">' +
    '        <div class="tile">' +
    '  <div class="row">' +
    '          <h3 class="tile-title col-md-8">Flujo de efectivo</h3>' +
    '          <h6 class="tile-title col-md-4">Gastos</h6>' +
    '  </div>' +

    '  <div class="row">' +
    '          <div id="contentCanvas_' + categoria + '" class="embed-responsive embed-responsive-16by9 col-md-8">' +
    '            <canvas class="embed-responsive-item" id="canvas_' + categoria + '"></canvas>' +
    '          </div>' +

    '        <div id="dshContendGastos" class="col-md-4">' +


    '        </div>' +

    '  <div>' +
    '        </div>' +
    '    </div>';
}


function dshBtnShowReport() {
  let i = document.getElementById("dshDateInicio").value;
  let f = document.getElementById("dshDateFin").value;

  dcltBtnShow("btnShow");
}







