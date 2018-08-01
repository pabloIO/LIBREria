'use strict';
var contador_grupos = 0;
var contador_item = 0;
const addBookLibrary = function(arr, id){
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
          $(id).append(
              `<div class="row" id="content_group_${contador_grupos}">
                  ${formato_item_biblio(element.nombre, element.autor, element.descripcion, element.imagen, element.archivo, element.licencia)}
              </div>`
          );
          contador_item++;

      }else{
          //De existir el primer item en el grupo div n se crean los 2 restantes
          $(`#content_group_${contador_grupos}`).append(
            formato_item_biblio(element.nombre, element.autor, element.descripcion, element.imagen, element.archivo, element.licencia)
          );
          contador_item++;
      }
  });
}

function formato_item_biblio(titulo, autor, descripcion, img, book, licencia){
    let licenciaIcon;
    if (licencia == undefined){
	licenciaIcon = "";
    } else if (licencia == "Creative Commons"){
	licenciaIcon = '<p class="licencia"><a href="/licencias" data-toggle="tooltip" title="Creative Commons"><i class="fab fa-creative-commons"></i></a></p>'
    } else {
	licenciaIcon = '<p class="licencia"><a href="/licencias" data-toggle="tooltip" title="Dominio público"><i class="fab fa-creative-commons-share"></i></a></p>'
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

const BIBLIOS = {
    "BBB": [
        {
          "id": 1,
          "nombre": "CARTAS PARA COMPRENDER LA HISTORIA DE BOLIVIA",
          "autor": "Mariano Baptista Gumucio",
          "imagen": "CartasParaComprender-750.jpg",
          "archivo": "Cartas para comprender la historia de Bolivia - Mariano Baptista.epub",
          "licencia": "Creative Commons"
        },
        {
          "id": 2,
          "nombre": "SIRINGA. ARREANDO DESDE MOJOS",
          "autor": "Juan B. Coímbra Cuéllar",
          "imagen": "SiringaMojos-750.jpg",
          "archivo": "Siringa. Arreando desde Mojos - Juan B. Coimbra. Rodolfo Pinto Parada.epub",
          "licencia": "Creative Commons"
        },
        {
          "id": 3,
          "nombre": "DIARIO DE UN COMANDANTE DE LA GUERRA DE LA INDEPENDENCIA",
          "autor": "José Santos Vargas",
          "imagen": "tlwp-DiarioComandante_750.png",
          "archivo": "Diario de un comandante de la guerra de la independencia - Jose Santos Vargas.epub",
          "licencia": "Creative Commons"
        },
        {
          "id": 4,
          "nombre": "EL MACIZO BOLIVIANO",
          "autor": "Jaime Mendoza",
          "imagen": "webBBB_0317int001.jpg",
          "archivo": "El Macizo Boliviano - Jaime Mendoza.epub",
          "licencia": "Creative Commons"
        },
        {
          "id": 5,
          "nombre": "JUAN DE LA ROSA",
          "autor": "Nataniel Aguirre",
          "imagen": "bbb-070-JuanDeLaRosa-a.jpg",
          "archivo": "Juan de la Rosa - Nataniel Aguirre.epub",
          "licencia": "Creative Commons"
        },
        {
          "id": 6,
          "nombre": "CUANDO VIBRABA LA ENTRAÑA DE PLATA",
          "autor": "José Enrique Viaña",
          "imagen": "CuandoVibrabaLaEntranaDePlata-750.jpg",
          "archivo": "Cuando Vibraba La Entrana De Plata - Jose Enrique Viana.epub",
          "licencia": "Creative Commons"
        },
        {
          "id": 7,
          "nombre": "ANTOLOGÍA DEL CUENTO BOLIVIANO",
          "autor": "Manuel Vargas Severiche",
          "imagen": "AntologiaCuentoBol-750.jpg",
          "archivo": "Antologia del Cuento Boliviano - Varios autores.epub",
          "licencia": "Creative Commons"
        },
        {
          "id": 8,
          "nombre": "NACIONALISMO Y COLONIAJE",
          "autor": "Carlos Montenegro",
          "imagen": "bbb-160-NacionalismoColoniaje-B.jpg",
          "archivo": "Nacionalismo y Coloniaje - Carlos Montenegro.epub",
          "licencia": "Creative Commons"
        }
      ]
};


addBookLibrary(BIBLIOS['BBB'], '#content_bbb');
