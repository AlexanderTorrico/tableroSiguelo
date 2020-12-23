var cheklist_Id = -1;
var vehiculo_Id = -1;
var count_itemchecklist = 0;
var list_ckeck_item = [];
var list_id_template = [];
var tipo;

$(document).ready(function () {

});
/** ###################################################
 * Ultimo cheklist
    ###################################################  */

function lastChekList() {
  count_itemchecklist = 0;
  var data = {
    "texto": "historyLastCkejlist",
    "id":1
  }
  cltPromise2('aux/query', 'POST', data, (jsonData) => {

    document.getElementById("root").innerHTML = document.getElementById("root").innerHTML =cltLoadTemplateMovilLastCheck(jsonData);
  });
}
//template
function saveNewChecklist(obj) {//------- Titulo sub Cheklist
  var data2 = {
    categoria: obj.dataset.tipo
  };
  cltPromise2('checklist-template/categoriapost', 'POST', data2, (jsonData) => {
    vehiculo_Id = obj.dataset.id;
    modal(1, obj.dataset.name, jsonData, cltItemModal(jsonData), "cltBtnSaveAll(this)");
    /*
    if (obj.dataset.tipo == "Basico") {
      
      modal(1, obj.dataset.name, jsonData, cltItemModal(jsonData), "cltBtnSaveAll(this)");
    } else {
      document.getElementById('root').innerHTML = cltTemplateInicioButtons("Movil: " + obj.dataset.name, obj.dataset.tipo) + cltSubTemplateInput(jsonData) + btnFloating();
    }
*/


  });
}

function cltItemModal(jsonData) {
  let html = "";
  for (var obj of jsonData) {
    let id = obj["id"];
    list_id_template.push(id);
    html += '<h5>' + obj["descripcion"] + '</h5>' +
      '<div class="col-12">' +

      '<fieldset class="form-group pl-4">' +

      '      <div class="form-check form-check-inline">' +
      '        <label class="form-check-label">' +
      '          <input class="form-check-input" id="clt_value1" type="radio" name="clt_chk_valor_' + id + '" value="5"/>' +
      '          Exelente' +
      '        </label>' +
      '      </div>' +
      '      <div class="form-check form-check-inline">' +
      '        <label class="form-check-label">' +
      '          <input class="form-check-input" id="clt_value2" type="radio" name="clt_chk_valor_' + id + '" value="4"/>' +
      '          Bueno' +
      '        </label>' +
      '      </div>' +
      '      <div class="form-check form-check-inline">' +
      '        <label class="form-check-label">' +
      '          <input class="form-check-input" id="clt_value2" type="radio" name="clt_chk_valor_' + id + '" value="3"/>' +
      '          Regular' +
      '        </label>' +
      '      </div>' +
      '      <div class="form-check form-check-inline">' +
      '        <label class="form-check-label">' +
      '          <input class="form-check-input" id="clt_value2" type="radio" name="clt_chk_valor_' + id + '" value="2"/>' +
      '          Malo' +
      '        </label>' +
      '      </div>' +
      '      <div class="form-check form-check-inline">' +
      '        <label class="form-check-label">' +
      '          <input class="form-check-input" id="clt_value2" type="radio" name="clt_chk_valor_' + id + '" value="1"/>' +
      '          Pesimo' +
      '        </label>' +
      '      </div>' +
      '      <div class="form-check form-check-inline">' +
      '        <label class="form-check-label">' +
      '          <input class="form-check-input" id="clt_value1" type="radio" name="clt_chk_valor_' + id + '" value="0" checked/>Sin' +
      '          calificar' +
      '        </label>' +
      '      </div>' +
      '                  <div class="col-md-12">' +
      '                    <textarea id="clt_txa_obs_' + id + '" class="form-control" rows="1" placeholder="Ingrese alguna observación"></textarea>' +
      '                  </div>' +
      '    </fieldset>' +



      '</div>' +
      '  <hr>';
  }
  return html;
}

function cltLoadTemplateMovilLastCheck(jsonData) {

  let size = jsonData.length;
  let html = "";

  let estilo = 'style="color:rgb(82,105,241); text-decoration-line: underline;"';
  for (let i = 0; i < size; i++) {
    let f_basico = jsonData[i]["text2"] == undefined ? ["Sin-datos","--:--"] : getHoursBol(jsonData[i]["text2"]).split(" ");
    let f_completo = jsonData[i]["text3"] == undefined ? ["Sin-datos","--:--"] : getHoursBol(jsonData[i]["text3"]).split(" ");

    let num = i + 1;

    html += '<tr>' +
      '                  <td style="text-align: center; vertical-align: middle;" class="clt_col_n">' + num + '</td>' +
      '                  <td style="vertical-align: middle;">' + jsonData[i]["text1"] + '</td>' +
      '                  <td style="text-align: center; vertical-align: middle;" class="clt_col_fecha">' + f_basico[0] + ' <small class="form-text text-right mr-5" id="emailHelp">'+f_basico[1]+'</small></td>' +
      '                  <td style="text-align: center; vertical-align: middle;" class="clt_col_fecha">' + f_completo[0] + '<small class="form-text text-right mr-5" id="emailHelp">'+f_completo[1]+'</small></td>' +
      '                  <td style="text-align: center;">' +
      '<button onClick="saveNewChecklist(this)" data-name="' + jsonData[i]["text1"] + '" data-id="' + jsonData[i]["number1"] + '" data-tipo="Basico" class="btn btn-outline-secondar" ' + estilo + ' data-toggle="modal" data-target="#staticBackdrop">Basico</button>' +
      '<button onClick="saveNewChecklist(this)" data-name="' + jsonData[i]["text1"] + '" data-id="' + jsonData[i]["number1"] + '" data-tipo="Completo" class="btn btn-outline-secondar" ' + estilo + 'data-toggle="modal" data-target="#staticBackdrop">Completo</button>' +
      '</td>' +
      '                </tr>';

  }
  return '<div class="col-md-12">' +
    '          <div class="tile">' +
    '            <h3 class="tile-title">Checklist</h3>' +
    '            <table class="table table-bordered">' +
    '              <thead  style="height:20px">' +
    '                <tr>' +
    '                  <th rowspan="2" style="margin: auto; vertical-align: middle;" class="clt_col_n">#</th>' +
    '                  <th rowspan="2" style="margin: auto; vertical-align: middle;">Movíl</th>' +
    '                  <th colspan="2" style="text-align: center;" class="clt_col_fecha">Ultimo checklist realizado</th>' +
    '                  <th rowspan="2" style="text-align: center; vertical-align: middle;">Realizar checklist </th>' +
    '                </tr>' +
    '                <tr>' +
    '                  <th style="text-align: center;" class="clt_col_fecha">Basico</th>' +
    '                  <th style="text-align: center;" class="clt_col_fecha">Completo</th>' +
    '                </tr>' +
    '              </thead>' +
    '              <tbody>' +
    html +
    '              </tbody>' +
    '            </table>' +
    '          </div>' +
    '        </div>';


}

/** ###################################################
 * chekListBasic // completo
    ###################################################  */

function cltLoadTemplateCheklist(tipo) {

  var data2 = {
    categoria: tipo
  };



  cltPromise2('devices', 'GET', {}, (jsonData) => {
    document.getElementById("root").innerHTML = cltTemplateGetMovil(jsonData, tipo);

    $("#cltCbxMovil").change(function () {
      var x = document.getElementById("cltCbxMovil").selectedIndex;
      var y = document.getElementById("cltCbxMovil").options;
      var z = document.getElementById("cltCbxMovil").value;
      let nombre = y[x].text;
      //alert(z + " Index: " + y[x].index + " is " + y[x].text);
      cltPromise2('checklist-template/categoriapost', 'POST', data2, (jsonData) => {
        vehiculo_Id = z;
        alert("obs " + tipo);
        document.getElementById('root').innerHTML = cltTemplateInicioButtons("ChekList " + tipo + " del movil " + nombre, tipo) + cltSubTemplateInput(jsonData);
      });

    });
  });
}
//acction
function cltBtnSaveAll(obj) {
  console.log("en metodo");
  console.log(list_id_template);

  data = {
    vehiculoId: vehiculo_Id,
    descripcion: "- -",
    categoria: obj.dataset.categoria == undefined ? "Basico" : obj.dataset.categoria,
    editable: false
  }
  
  cltPromise2('cheklist/save', 'POST', data, (dato) => {
    
    cltPromise2('aux/newid/?tabla=clt', 'GET', [], (jsonData) => {
      cheklist_Id = jsonData["newid"];
      list_ckeck_item = [];
      console.log(list_id_template);
      
      
      // count_itemchecklist
      for (let i = 0; i <list_id_template.length; i++) {
        
        let radios = document.getElementsByName('clt_chk_valor_' + list_id_template[i]);
        let auxRadio = 0;
        for (var j = 0; j < radios.length; j++) {
          if (radios[j].checked) {
            auxRadio = radios[j].value;
            break;
          }
        }
        if (auxRadio != 0) {
          list_ckeck_item.push({
            checklistid: cheklist_Id,
            checklisttemplateid: list_id_template[i],
            valor: auxRadio,
            observaciones: document.getElementById("clt_txa_obs_" + list_id_template[i]).value
          });
        }


      }
      
      cltPromise2('cltitem/save', 'POST', list_ckeck_item, (jsonData) => {
        alert(jsonData);
        lastChekList();
      });
    });
  });
  $("#staticBackdrop").modal('hide');
}

//Template
function cltTemplateInicioButtons(titulo, tipo) {

  return '<div class="app-title">' +

    '      <div>' +
    '        <h1><i class="fa fa-edit"></i>' + titulo + '</h1>' +
    '        <p>Check list ' + tipo + '</p>' +
    '      </div>' +
    '      <div><button  data-categoria="' + tipo + '" class="btn btn-primary" onClick="cltBtnSaveAll(this)">Guardar</button></div>' +
    '    </div>';
}
//Targetas Basica o completos
function cltSubTemplateInput(jsonData) {
  html = "";
  list_id_template = [];

  for (let i in jsonData) {
    html += cltTemplateCheckListInput(jsonData[i]["id"], jsonData[i]["descripcion"]);
    count_itemchecklist++;
    list_id_template.push(jsonData[i]["id"]);
  }
  console.log(count_itemchecklist);
  document.getElementById("root").innerHTML = html;
  
  return html;
}


function cltTemplateCheckListInput(id, titulo) {

  return '<div class="col-md-10 offset-md-1 col-sm-12 offset-sm-0">' +
    '          <div class="tile">' +
    '            <h3 class="tile-title">' + titulo + '</h3>' +
    '            <div class="tile-body">' +
    '              <form class="form-horizontal" id="cltContentInputCheckList">' +
    '                <div class="row">' +

    '<div class="col-12">' +

    '<fieldset class="form-group pl-4">' +

    '      <div class="form-check form-check-inline">' +
    '        <label class="form-check-label">' +
    '          <input class="form-check-input" id="clt_value1" type="radio" name="clt_chk_valor_' + id + '" value="5"/>' +
    '          Exelente' +
    '        </label>' +
    '      </div>' +
    '      <div class="form-check form-check-inline">' +
    '        <label class="form-check-label">' +
    '          <input class="form-check-input" id="clt_value2" type="radio" name="clt_chk_valor_' + id + '" value="4"/>' +
    '          Bueno' +
    '        </label>' +
    '      </div>' +
    '      <div class="form-check form-check-inline">' +
    '        <label class="form-check-label">' +
    '          <input class="form-check-input" id="clt_value2" type="radio" name="clt_chk_valor_' + id + '" value="3"/>' +
    '          Regular' +
    '        </label>' +
    '      </div>' +
    '      <div class="form-check form-check-inline">' +
    '        <label class="form-check-label">' +
    '          <input class="form-check-input" id="clt_value2" type="radio" name="clt_chk_valor_' + id + '" value="2"/>' +
    '          Malo' +
    '        </label>' +
    '      </div>' +
    '      <div class="form-check form-check-inline">' +
    '        <label class="form-check-label">' +
    '          <input class="form-check-input" id="clt_value2" type="radio" name="clt_chk_valor_' + id + '" value="1"/>' +
    '          Pesimo' +
    '        </label>' +
    '      </div>' +
    '      <div class="form-check form-check-inline">' +
    '        <label class="form-check-label">' +
    '          <input class="form-check-input" id="clt_value1" type="radio" name="clt_chk_valor_' + id + '" value="0" checked/>Sin' +
    '          calificar' +
    '        </label>' +
    '      </div>' +
    '    </fieldset>' +



    '</div>' +
    '                <div class="col-md-12 col-sm-12">' +

    '                  <div class="col-md-12">' +
    '                    <textarea id="clt_txa_obs_' + id + '" class="form-control" rows="2" placeholder="Ingrese alguna observación"></textarea>' +
    '                  </div>' +
    '                </div>' +
    '                </div>' +
    '              </form>' +
    '            </div>' +
    '          </div>' +
    '          </div>';

}


/** ###################################################
 * Get cheklisttemplate All
    ###################################################  */

function cltLoadTemplateAllChekList() {

  cltPromise2('checklist-template', 'GET', {}, (jsonData) => {
    document.getElementById('root').innerHTML = cltTemplateInicio("Listas de item de cheklist") + cltTemplateTablaGetAllTemplateChekList(jsonData);

    $('#sampleTable').DataTable({
      language: {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Entradas",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
          "first": "Primero",
          "last": "Ultimo",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      }
    });
  });

}

//template
function cltTemplateTablaGetAllTemplateChekList(jsonData) {
  let html = "";
  for (let i in jsonData) {
    html += '             <tr>' +
      '                      <td>' + jsonData[i]['descripcion'] + '</td>' +
      '                      <td>' + jsonData[i]['categoria'] + '</td>' +
      '                      <td>btn</td>' +
      '                    </tr>';
  }

  return '<div class="row">' +
    '        <div class="col-md-12">' +
    '          <div class="tile">' +
    '            <div class="tile-body">' +
    '              <div class="table-responsive">' +
    '               <table class="table table-hover table-bordered" id="sampleTable">' +
    '                  <thead>' +
    '                    <tr>' +
    '                      <th>Titulo</th>' +
    '                      <th>Categoria</th>' +
    '                      <th>Accion</th>' +
    '                    </tr>' +
    '                  </thead>' +
    '                  <tbody>' +
    html +
    '                  </tbody>' +
    '               </table>' +
    '              </div>' +
    '             </div>' +
    '            </div>' +
    '           </div>' +
    '          </div>';
}



//accion

/** ###################################################
 * Formulario add template
    ###################################################  */
function cltLoadFormForAddItemTemplate() {
  document.getElementById('root').innerHTML = cltTemplateInicio("Crear nuevo item para el cheklist") + cltTemplateFormulario();
}

//Acciones
function cltBtnSaveItemTemplate() {


  let nombre = document.getElementById('cltTxt_nombre').value;
  let categoria = document.getElementById('cltCbx_categoria').value;

  var data = {
    texto: nombre,
  }

  if (nombre == "") {
    alert("Debe ingresar una descripcion para el checklist");
  }


  cltPromise2('aux/clttemplate/ifexist', 'POST', data, (jsonData) => {
    console.log(jsonData);
    if (jsonData["exist"] == 0) {
      var data = {
        descripcion: nombre,
        categoria: categoria
      }
      cltPromise2('checklist-template/save', 'POST', data, (data) => {
        document.getElementById('cltTxt_nombre').value = "";
        if (data == "Ok") {
          cltLoadTemplateAllChekList();
        } else {
          alert("Error al realizar el registro");
          console.log(data);
        }
      });
    } else {
      alert("El nombre del checklist ya existe.");
      document.getElementById('cltCbx_categoria').value = "";
      document.getElementById('cltTxt_nombre').value = "";
    }
  });


}

// Template

function cltTemplateInicio(titulo) {
  return '<div class="app-title">' +
    '      <div>' +
    '        <h1><i class="fa fa-edit"></i>' + titulo + '</h1>' +
    '        <p>Agregar nuevo item para el respectivo checklist</p>' +
    '      </div>' +
    '    </div>';
}
function cltTemplateFormulario() {
  return '<div class="row">' +
    '      <div class="col-md-12">' +
    '        <div class="tile">' +
    '          <div class="row">' +
    '            <div class="col-lg-12">' +

    '                <div class="form-group">' +
    '                  <label for="exampleInputEmail1">Nombre del nuevo item para el cheklist</label>' +
    '                  <input class="form-control" id="cltTxt_nombre" type="email" aria-describedby="emailHelp"' +
    '                    placeholder="Ingresar el nombre">' +
    '                </div>' +

    '                <div class="form-group">' +
    '                  <label for="exampleSelect1">Example select</label>' +
    '                  <select class="form-control" id="cltCbx_categoria">' +
    '                    <option value="Basico">Basico</option>' +
    '                    <option value="Completo">Completo</option>' +
    '                  </select>' +
    '                </div>' +

    '           <div class="tile-footer">' +
    '            <button class="btn btn-primary" onClick="cltBtnSaveItemTemplate()">Guardar</button>' +
    '          </div>' +

    '              </div>' +
    '            </div>' +
    '          </div>';
}
/** ###################################################
 * PROMESAS
    ###################################################  */

