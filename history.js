
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;




$(document).ready(function()
{

     $('.optional').toggle();

     especie_paciente.addEventListener("change", function(){

        vacunas_felinas.style.display = "none";
        vacunas_caninas.style.display = "none";

        if(especie_paciente.value == "perro"){
           fillSelect(razas_perro, raza_paciente);
           vacunas_caninas.style.display = "";
        }

        if(especie_paciente.value == "gato"){
           fillSelect(razas_gatos, raza_paciente);
           vacunas_felinas.style.display = "";
        }

     });


     $('#doc').on( "focusout", function(){

        var params = { "user_doc" : $('#doc').val() };
        request("history", "get_user_by_doc", params,function(data){

           if(data != "null")
           {
              data = $.parseJSON(data);
              nombre.value = data["name"];
              apellidos.value = data["lastname"];
              email.value = data["email"];
              direccion.value = data["address"];
              celular.value = data["phone"];
           }

        });

     });


     $('#bntSaveData').click(function()
     {

        if(!validate())
        {
          return;
        }

        var json = formToJSON();
        var params = { 'form_data' : json, 'reservation' : 0, 'doc' : doc.value };
        
        var now = new Date();
        localStorage.setItem(now.getTime(), JSON.stringify(params));

        console.log("Información guardada");

     });

     $('.panel-heading').click(function(evt){
           var parent = $(evt.target).parent().parent();
           parent.find(".panel-body").toggle();
     });
     
  });


  function fillSelect(data,select)
  {
      select.innerHTML = "<option value=''>Seleccione</option>";
      for(var opt in data){
          select.innerHTML += "<option value='" + data[opt] + "'>" + data[opt] + "</option>";
      }
  }


  function validate()
  {
    var controles = $('input');

    $.each(controles, function (iterator) 
    {
      var input = controles[iterator];
      if(input.value == "")
      {
        input.focus();
        input.style = "border-color :red";
        alert("Complete todos los campos obligatorios");
        return false;
      }
      else
      {
        input.style = "border-color:#dadada";
      }
    });

    return true;
  }



function formToJSON()
{
  var form_data = [];
  var json = {};

  var controles = $('input, textarea');

  $.each(controles, function (iterator) 
  {
    var input = controles[iterator];
    var value = "";


    if(input.type == "button")  {
      //continue;
    }

    //depende del tipo de control entonces guarda.
    if(input.type == "text" ){
        var value = input.value;
    }

    if(input.type == "radio"){
      value = $('input[name=' + input.name + ']:checked').val()            
    }

    if(input.type == "select"){
      value = $("select[name='" + input.name + "'] option:selected").val();
    }

    if(input.type == "checkbox"){
      value = input.checked;
    }

    if(input.type == "textarea"){
      value = input.value;
    }

    var json_input = 
    {
      'name'      : input.name
      , 'value'     : value
      , 'type'      : input.type
      , 'category'  : input.getAttribute("category")
    }

    form_data.push(json_input);

  });

  return form_data;
}


