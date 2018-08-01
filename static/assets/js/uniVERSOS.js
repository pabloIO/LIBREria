'use strict';
const API = 'http://' + window.location.host + '/api/v1';
// let page;
const getPoems = function (){
  $.ajax({
    method: 'GET',
    url: `${API}/poems/page`
  }).done(function(res){
    if(res.success){
        viewParcialPoem(res.books);
    }else{
      alert('Hubo un problema en la recuperación de datos');
    }
  });
}


//Función que dibuja las últimas 5 líneas de la base de tabla <Poema>
const viewParcialPoem = function(arr){
    //Se verifica que existan al menos 5 tuplas en la tabla <Poema>
    let contador = arr.length - 5;
    let i;
    //De tener un número de registros menor a 5 el ciclo de iteraciones recorrerá todo el objeto JSON
    if(contador <= 0){
        i = 0;
    }
    //Si existen más de 5 registros se realizará una diferencia entre total y el total menos 5 registros
    else{
        i = contador;
    }

    for (i; i < arr.length; i++) {
        $(`#content_poem`).append(
            `<h4>
                ${arr[i].verso}
            </h4>`
        );
    }
}

getPoems();
