let cnt_SelectTemplateId = 0;
function cntlastCuenta() {
  var data = {
    texto: "historyLastCuentas",
    id:getCookiesId()
  }

  cltPromise2('aux/query', 'POST', data, (jsonData) => {
    document.getElementById("root").innerHTML = cntLoadTemplateMovilLastCuentas(jsonData);
  });
}



function cntLoadTemplateMovilLastCuentas(jsonData) {

  let size = jsonData.length;
  let html = "";

  console.log(jsonData);
  for (let i = 0; i < size; i++) {
    let f_basico = jsonData[i]["text2"] == undefined ? ["Sin-datos", "--:--"] : getHoursBol(jsonData[i]["text2"]).split(" ");
    let f_completo = jsonData[i]["text3"] == undefined ? ["Sin-datos", "--:--"] : getHoursBol(jsonData[i]["text3"]).split(" ");

    let num = i + 1;
    console.log(jsonData[i]["id"]);
    html += '<tr>' +
      '                  <td style="text-align: center; vertical-align: middle;" class="cnt_col_n">' + num + '</td>' +
      '                  <td style="vertical-align: middle;">' + jsonData[i]["text1"] + '</td>' +
      '                  <td style="text-align: center; vertical-align: middle; padding: 5px !important;" class="clt_col_fecha">' + f_basico[0] + ' <small class="form-text text-right mr-5" id="emailHelp">' + f_basico[1] + '</small></td>' +
      '                  <td style="text-align: center; vertical-align: middle; padding: 5px !important;" class="clt_col_fecha">' + f_completo[0] + '<small class="form-text text-right mr-5" id="emailHelp">' + f_completo[1] + '</small></td>' +
      '                  <td style="text-align: center;">' +
      '<button  onClick="cntsaveNewCuenta(this)" data-name="' + jsonData[i]["text1"] + '" data-id="' + jsonData[i]["id"] + '" data-tipo="Debe" class=" btn-light text-traccar text-traccar"  data-toggle="modal" data-target="#staticBackdrop">Egreso</button>' +
      '<button  onClick="cntsaveNewCuenta(this)" data-name="' + jsonData[i]["text1"] + '" data-id="' + jsonData[i]["id"] + '" data-tipo="Haber" class=" btn-light text-traccar ml-2 text-traccar" data-toggle="modal" data-target="#staticBackdrop">Ingreso</button>' +
      '</td>' +
      '                </tr>';

  }
  return '<div class="col-md-12">' +
    '          <div class="tile">' +
    '            <h3 class="tile-title">Cuentas</h3>' +
    '            <table class="table table-bordered">' +
    '              <thead  style="height:20px">' +
    '                <tr>' +
    '                  <th rowspan="2" style="margin: auto; vertical-align: middle;" class="cnt_col_n">#</th>' +
    '                  <th rowspan="2" style="margin: auto; vertical-align: middle;">Movil</th>' +
    '                  <th colspan="2" style="text-align: center;" class="clt_col_fecha">Ultima transacción realizada</th>' +
    '                  <th rowspan="2" style="text-align: center; vertical-align: middle;">Nueva transacción </th>' +
    '                </tr>' +
    '                <tr>' +
    '                  <th style="text-align: center;" class="clt_col_fecha">Egreso</th>' +
    '                  <th style="text-align: center;" class="clt_col_fecha">Ingreso</th>' +
    '                </tr>' +
    '              </thead>' +
    '              <tbody>' +
    html +
    '              </tbody>' +
    '            </table>' +
    '          </div>' +
    '        </div>';


}


function cntsaveNewCuenta(obj) {//------- Titulo sub Cheklist
  var data2 = {
    categoria: obj.dataset.tipo
  };


  cltPromise2('checklist-template', 'GET', {}, (jsonDataT) => {

    modal(0, obj.dataset.name, "", cntHtmlForModal(obj.dataset.tipo, jsonDataT, obj.dataset.id), "cltBtnSaveCuenta(this)");

    $("#cntCbxTemplateSelect").change(function () {
      var x = document.getElementById("cntCbxTemplateSelect").selectedIndex;
      var y = document.getElementById("cntCbxTemplateSelect").options;
      var z = document.getElementById("cntCbxTemplateSelect").value;
      let nombre = y[x].text;
      //alert(z + " Index: " + y[x].index + " is " + y[x].text);
      cnt_SelectTemplateId = z;

    });
    /*if (obj.dataset.tipo == "Basico") {
      
      modal(1, obj.dataset.name, jsonData, cltItemModal(jsonData), "cltBtnSaveAll(this)");
    } else {
      document.getElementById('root').innerHTML = cltTemplateInicioButtons("Movil: " + obj.dataset.name, obj.dataset.tipo) + cltSubTemplateInput(jsonData) + btnFloating();
    }*/
  });
}
function cntHtmlForModal(tipo, jsonDataTemplate, id) {
  let auxTipo = "";
  let ocultarContexto = "";
  let fecha = new Date;
  count_itemchecklist = 0;
  
  let htmlT = '<option selected="true" hidden>Presione para continuar</option>';

  for (var i in jsonDataTemplate) {
    htmlT += '<option value="' + jsonDataTemplate[i]["id"] + '">' + jsonDataTemplate[i]["descripcion"] + '</option>'
  }


  if (tipo == "Debe") {
    auxTipo = "Egreso";
  } else {
    auxTipo = "Ingreso";
    ocultarContexto = 'style="display: none"';
  }


  return '<div class="row mb-4">' +
    '                <div class="col-6">' +
    '                  <h2 class="page-header pl-2"><i class="fas fa-car-side"></i> ' + auxTipo + '</h2>' +
    '                </div>' +
    '                <div class="col-6">' +
    '                  <h5 id="fecha_actual" class="text-right mr-5"> ' + fecha.toLocaleDateString() + '</h5>' +
    '                </div>' +
    '              </div>' +

    '            <div class="pl-2 tile-body">' +
    '              <form class="form-horizontal">' +

    '                    <input type="hidden" id="cntInp_tipo" value="' + tipo + '">' +
    '                    <input type="hidden" id="cntInp_id" value="' + id + '">' +

    '                <div class="form-group row" ' + ocultarContexto + '>' +
    '                  <label for="exampleSelect2" class="control-label col-md-3">Concepto</label>' +
    '                  <div class="col-md-8">' +
    '                  <select class="form-control" id="cntCbxTemplateSelect">' +
    htmlT +
    '                  </select>' +
    '                  </div>' +
    '                </div>' +

    '                <div class="form-group row">' +
    '                  <label for="exampleSelect2" class="control-label col-md-3">Monto</label>' +
    '                  <div class="col-md-8">' +
    '                    <input class="form-control" id="cntInp_monto" type="number" step=".01" aria-describedby="emailHelp"' +
    '                    placeholder="">' +
    '                  </div>' +
    '                </div>' +


    '                <div class="form-group row">' +
    '                  <label for="exampleSelect2" class="control-label col-md-3">Observacion</label>' +
    '                  <div class="col-md-8">' +
    '                    <textarea id="cnt_txa_obs" class="form-control" rows="4" placeholder="Ingrese alguna observación"></textarea>' +
    '                  </div>' +
    '                </div>' +



    '              </form>' +


    '            </div>';

}

function cltBtnSaveCuenta(obj) {

  let data = {
    vehiculoid: parseInt(document.getElementById("cntInp_id").value),
    userid: 1,
    cheklisttemplateid: parseInt(cnt_SelectTemplateId),
    observacion: document.getElementById("cnt_txa_obs").value,
    tipo: document.getElementById("cntInp_tipo").value,
    monto: document.getElementById("cntInp_monto").value,
    fecha: new Date()
  }
  
  if (document.getElementById("cntInp_tipo").value == "Debe") {
    if (document.getElementById("cntInp_monto").value == "") {
      alert("Deves escribir un monto");
      cnt_SelectTemplateId = 0;
      return;
    }
  }

  console.log(data);
  cltPromise2('cuentas/save', 'POST', data, (data) => {
    
    if (data == "Ok") {
      alert("Se a registrado correptamente");
      cntlastCuenta();
    } else {
      alert("Hubo un error en el registro..." + data);
    }


  });
  cnt_SelectTemplateId = 0;
  $("#staticBackdrop").modal('hide');
}