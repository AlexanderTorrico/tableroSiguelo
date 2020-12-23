var dclVarSelectMovilId=-1;
var dclVarSelectTemplateId=-1;
var dclVarSelectCuenta=-1;

$(document).ready(function () {

});


/** ###################################################
 * chekListBasic // completo
    ###################################################  */

function cntLoadTemplateCuenta(tipo) {
  dclVarSelectCuenta = tipo

  cltPromise2('devices', 'GET', {}, (jsonDataV) => {
    cltPromise2('checklist-template', 'GET', {}, (jsonDataT) => {
      document.getElementById("root").innerHTML = cntTemplateGetMovil(jsonDataV, jsonDataT, tipo);

      $("#cntCbxMovil").change(function () {
        var x = document.getElementById("cntCbxMovil").selectedIndex;
        var y = document.getElementById("cntCbxMovil").options;
        var z = document.getElementById("cntCbxMovil").value;
        let nombre = y[x].text;
        //alert(z + " Index: " + y[x].index + " is " + y[x].text);
        dclVarSelectMovilId = z;

      });

      $("#cntCbxTemplate").change(function () {
        var x = document.getElementById("cntCbxTemplate").selectedIndex;
        var y = document.getElementById("cntCbxTemplate").options;
        var z = document.getElementById("cntCbxTemplate").value;
        let nombre = y[x].text;
        //alert(z + " Index: " + y[x].index + " is " + y[x].text);
        dclVarSelectTemplateId = z;

      });
    });

  });

}

//Action
function cntBtnSave() {
  let obs = document.getElementById("cnt_txa_obs").value;
  let montot = document.getElementById("cntInp_monto").value;
  
  let data = {
    vehiculoid: parseInt(dclVarSelectMovilId),
    cheklisttemplateid: parseInt(dclVarSelectTemplateId),
    observacion: obs,
    tipo: dclVarSelectCuenta=="Ingreso"?"ha":"de",
    monto: montot,
  }

  
  cltPromise2('cuentas/save', 'POST', data, (dat) => {
    alert(dat);
  });
}


//template
function cntTemplateGetMovil(jsonDataVehiculo, jsonDataTemplate, tipo) {
  let fecha = new Date;
  count_itemchecklist = 0;
  let htmlV = '<option selected="true" hidden>Presione para continuar</option>';
  let htmlT = '<option selected="true" hidden>Presione para continuar</option>';
  for (var i in jsonDataVehiculo) {
    htmlV += '<option value="' + jsonDataVehiculo[i]["id"] + '">' + jsonDataVehiculo[i]["name"] + '</option>'
  }
  for (var i in jsonDataTemplate) {
    console.log("id " + jsonDataTemplate[i]["id"]);
    htmlT += '<option value="' + jsonDataTemplate[i]["id"] + '">' + jsonDataTemplate[i]["descripcion"] + '</option>'
  }
  return '<div class="col-md-12">' +
    '          <div class="tile">' +

    '<div class="row mb-4">'+
'                <div class="col-6">'+
'                  <h2 class="page-header"><i class="fas fa-car-side"></i> '+tipo+'</h2>'+
'                </div>'+
'                <div class="col-6">'+
'                  <h5 id="fecha_actual" class="text-right"> '+fecha.toLocaleDateString()+'</h5>'+
'                </div>'+
'              </div>'+
	
    '            <div class="tile-body">' +
    '              <form class="form-horizontal">' +
    '                <div class="form-group row">' +
    '                  <label for="exampleSelect2" class="control-label col-md-3">Seleccione movil</label>' +
    '                  <div class="col-md-4">' +
    '                  <select class="form-control" id="cntCbxMovil">' +
    htmlV +
    '                  </select>' +
    '                  </div>' +
    '                </div>' +

    '                <div class="form-group row">' +
    '                  <label for="exampleSelect2" class="control-label col-md-3">Concepto</label>' +
    '                  <div class="col-md-4">' +
    '                  <select class="form-control" id="cntCbxTemplate">' +
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

    '           <div class="tile-footer">' +
    '            <button class="btn btn-primary" onClick="cntBtnSave()">Guardar</button>' +
    '          </div>' +

    '            </div>' +
    '          </div>' +
    '          </div>';

}

