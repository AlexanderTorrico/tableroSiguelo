var monthText= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

$(document).ready(function () {

  dshLoadCellds();
});

function test1() {

  alert(diaSemana("19", 11, "2020"));

}

function getDiaSemana(dia, mes, anio) {
  var mes = monthText[mes];
  var dias = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
  var dt = new Date(mes + ' ' + dia + ', ' + anio);
  
  return dias[dt.getUTCDay()];
};

function getCookiesId() {
  var cookieValor = document.cookie.replace(/(?:(?:^|.*;\s*)userid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  return 1;
}

function cltPromise2(urlAdd, method, data, accion) {
  let url = window.location.protocol + '//' + window.location.host;
  url = url + '/api/' + urlAdd;
  let isSave = urlAdd.split("/");
  //console.log(url);
  let req = new XMLHttpRequest();
  req.open(method, url, true);
  req.withCredentials = true;
  req.setRequestHeader('Content-type', 'application/json');
  req.setRequestHeader('Accept', 'application/json');
  if (data != null) {
    req.send(JSON.stringify(data));
  }
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      if (isSave[isSave.length - 1] == 'save') {
        accion(req.responseText);
      } else {
        let jsonData = JSON.parse(req.responseText);
        accion(jsonData);
      }
    } else {

    }
  }
}

function getHoursBol(fecha) {
  let userAgent = navigator.userAgent || navigator.vendor || window.opera;
  let utc = null;
  try {
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      utc = new Date(fecha.replace(".000+0000", ""));
    } else {
      utc = new Date(fecha);

    }
  } catch (error) {

    utc = new Date(fecha);
    utc.setMilliseconds(utc.getMilliseconds() - 36000);
  }

  var MS_PER_MINUTE = 60000;
  var myStartDate = new Date(utc - 240 * MS_PER_MINUTE);
  let t = myStartDate.toTimeString().split(":");
  return myStartDate.toISOString().replace(
    /^(?<day>\d+)-(?<month>\d+)-(?<year>\d+)T.*$/,
    '$<year>-$<month>-$<day>'
  ) + " " + t[0] + ":" + t[1];
}

function getUser() {
  let data = {};
  console.log("tesfsdajfjs");
  cltPromise2('session', 'GET', null, (jsonData) => {
    console.log("tesfsdajfjs78");
    console.log(jsonData);
  });
}

function btnFloating() {
  return '<a href="#" class="float" onClick="cltBtnSaveAll(this)">' +
    '<i class="fa fa-plus my-float"></i>' +
    '</a>';
}


function modal(id, titulo, data, contentHtml, accion) {
  //console.log(data);
  document.getElementById("modal-titulo").innerText = titulo;
  document.getElementById("modal-body").innerHTML = contentHtml;
  document.getElementById("modal-footer").innerHTML = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>' +
    '            <button type="button" class="btn btn-primary" id="modal-btn-guardar" ata-dismiss="modal" onClick="' + accion + '">Guardar</button>';


}
function getTemplateInicio(titulo, subtitulo) {
  return '<div class="app-title">' +

    '      <div class="content-flex">' +
    '        <div class="subContent-flex">' +
    '<h1>' + titulo + '</h1>' +
    '<div class="row">' +
    '<div class="col"><input id="dshDateInicio" type="date" class="form-control text-inline" /></div>' +
    '<div class="col"><input id="dshDateFin" type="date" class="form-control text-inline" /></div>' +
    '<div class="col"><button onClick="dshBtnShowReport()" id="dshBtnShow" class="btn btn-default" ><i class="far fa-eye"></i></button></div>' +
    '</div>' +
    '</div>' +

    '      </div>' +
    '    </div>'+
    '    <div id="dshEgresoIngreso">'+
    '    </div>'+
    '    <div id="dshGestionByMovil" class="row">'+
    '    </div>';
}