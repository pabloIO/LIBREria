'use strict';
const API = 'http://' + window.location.host + '/api/v1';

const getBooks = function(){
  console.log('hey')
  $.ajax({
    method: 'GET',
    url: `${API}/libros`
  }).done(function(res){
    if(res.success){
      addBookDom(res.books);
    }else{
      alert('Hubo un problema al cargar los libros');
    }
  });
}

var contador_grupos = 0;
var contador_item = 0;

//Se recorre el objeto JSON
const addBookDom = function(arr){
  arr.forEach(element => {
      //Si el grupo div n que contiene los 3 elementos de tamaño 4 cada uno, se crea un nuevo grupo div n
      if(contador_item == 3){
          contador_item = 0;
          contador_grupos++;
      }
      //Dentro de un grupo div n, se evalua si esta por ingresar el primer elemento o si ya existe
      if(contador_item == 0){
          //Se crea un nuevo grupo div n y dentro de este el primer item (un grupo div n solo puede contener 3 items)
          contador_grupos++;
          $(`#content_books`).append(
              `<div class="row" id="content_group_${contador_grupos}">
                  ${formato_item(element.name, element.author, element.descripcion, element.image, element.file, element.licencia)}
              </div>`
          );
          contador_item++;

      }else{
          //De existir el primer item en el grupo div n se crean los 2 restantes
          $(`#content_group_${contador_grupos}`).append(
            formato_item(element.name, element.author, element.descripcion, element.image, element.file, element.licencia)
          );
          contador_item++;
      }
  });
}

//formato_item: devuelve item a item el recorrido del objeto JSON

function formato_item(titulo, autor, descripcion, img, book, licencia){
    let licenciaIcon;
    if (licencia == undefined){
	licenciaIcon = "";
    } else if (licencia == "Creative Commons"){
	licenciaIcon = '<p class="licencia"><a href="/licencias"><i class="fab fa-creative-commons"></i></a></p>'
    } else {
	licenciaIcon = '<p class="licencia"><a href="/licencias"><i class="fab fa-creative-commons-share"></i></a></p>'
    };
    let contenido_item =
        `<div class="col-md-4 col-sm-4">
            <div class="panel panel-warning">
                <div class="panel-heading">
                    <h3>${titulo}</h3>
                    <p class="autor">${autor}</p>
                </div>
                <div class="panel-body panel-body-background">
                    <div class="col-md-12">
                        <img class="center-block" src="/static/images/${img || 'default.jpg'}" alt="" style="width:auto;height:300px">
                        <a title="Leer libro" href="/static/books/${book}" class="btn btn-primary btn-upload" download><i class="fab fa-readme"></i></a>
                    </div>
                </div>
                ${licenciaIcon}
            </div>
        </div>`;

    return contenido_item;
}


getBooks();
