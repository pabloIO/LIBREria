'use strict';

var libros = 
`[
    { 
        "titulo":"El Principito" , 
        "autor":"Antoine de Saint-Exupéry" ,
        "descripcion":"El principito es un cuento poético que viene acompañado de ilustraciones hechas con acuarelas por el mismo Saint-Exupéry.​ En él, un piloto se encuentra perdido en el desierto del Sahara después de que su avión sufriera una avería, pero para su sorpresa, es allí donde conoce a un pequeño príncipe."
    },
    { 
        "titulo":"La colina de WhaterShip" , 
        "autor":"Antoine de Saint-Exupéry" ,
        "descripcion":"El principito es un cuento poético que viene acompañado de ilustraciones hechas con acuarelas por el mismo Saint-Exupéry.​ En él, un piloto se encuentra perdido en el desierto del Sahara después de que su avión sufriera una avería, pero para su sorpresa, es allí donde conoce a un pequeño príncipe."
    },
    { 
        "titulo":"La Biblia" , 
        "autor":"Antoine de Saint-Exupéry" ,
        "descripcion":"El principito es un cuento poético que viene acompañado de ilustraciones hechas con acuarelas por el mismo Saint-Exupéry.​ En él, un piloto se encuentra perdido en el desierto del Sahara después de que su avión sufriera una avería, pero para su sorpresa, es allí donde conoce a un pequeño príncipe."
    },
    { 
        "titulo":"Necronomicon" , 
        "autor":"Antoine de Saint-Exupéry" ,
        "descripcion":"El principito es un cuento poético que viene acompañado de ilustraciones hechas con acuarelas por el mismo Saint-Exupéry.​ En él, un piloto se encuentra perdido en el desierto del Sahara después de que su avión sufriera una avería, pero para su sorpresa, es allí donde conoce a un pequeño príncipe."
    }
]`;


var contador_grupos = 0;
var contador_item = 0;
var libros = JSON.parse(libros);

//Se recorre el objeto JSON
libros.forEach(element => {
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
                ${formato_item(element.titulo, element.autor, element.descripcion)}
            </div>`
        );
        contador_item++;

    }else{
        //De existir el primer item en el grupo div n se crean los 2 restantes
        $(`#content_group_${contador_grupos}`).append(
            formato_item(element.titulo, element.autor, element.descripcion)
        );
        contador_item++;
    }
});

//formato_item: devuelve item a item el recorrido del objeto JSON

function formato_item(titulo, autor, descripcion){
    let contenido_item = 
        `<div class="col-md-4 col-sm-4">
            <div class="panel panel-warning">
                <div class="panel-heading">
                    <h3><b>${titulo}</b></h3>
                </div>
                <div class="panel-body panel-body-background">
                    <div class="col-md-12">
                        <img class="center-block" src="assets/img/portada_1.png" alt="">
                    </div>
                    <div class="col-md-12">
                        <br>
                        <p>
                            <b>Autor</b>: ${autor}
                        </p>
                        <p>
                            <b>Descripci&oacute;n</b>:  ${descripcion}
                        </p>
                    </div>
                </div>
                <div class="panel-footer panel-footer-background">
                    <a href="#" class="btn btn-primary btn-upload">Empezar a leer</a>
                </div>
            </div>
        </div>`;

    return contenido_item;
}

