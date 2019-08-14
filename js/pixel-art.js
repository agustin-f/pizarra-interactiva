var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];


//-----------VARIABLES------------

var paleta = document.getElementById("paleta");
var grillaDePixeles = document.getElementById("grilla-pixeles"); 
var indicadorDeColor = document.getElementById("indicador-de-color");
var $colorPersonalizado = $('#color-personalizado');
var mouseApretado = false;



//-------------FUNCIONES---------------

//GENERAR LA PALETA DE COLORES
function generarPaletaColores(){
  for(var i=0; i < nombreColores.length; i++){
    var div = document.createElement("div");
    div.style.background = nombreColores[i];
    div.className = "color-paleta";
    div.setAttribute("id", nombreColores[i]);
    paleta.appendChild(div);    
  }
}

//GENERAR LA GRILLA DE PIXELES
function crearGrillaDePixeles(){
  for(var i=0; i < 1749; i++){
    var pixel = document.createElement("div");
    pixel.style.background = nombreColores[i];
    pixel.style.width = "15px";
    pixel.style.height = "15px";
    pixel.className = "pixel";
    grillaDePixeles.appendChild(pixel);
  }
}

//DECLARO LAS FUNCIONES APRETAR Y SOLTAR MOUSE
function apretarMouse(){
    mouseApretado = true;
    console.log(mouseApretado);
}

function soltarMouse(){
    mouseApretado = false;
    console.log(mouseApretado);
}

//HAGO USO DE LAS FUNCI0NES ANTES DECLARADAS
var $grillaDePixeles = $('#grilla-pixeles');
$(window).mouseup(soltarMouse);
$grillaDePixeles.mousedown(apretarMouse);

//CAMBIAR EL INDICADOR DE COLOR DE ACUERDO AL COLOR QUE OPTE EL USARIO Y PINTAR LA GRILLA NE MOVIMIENTO
function pintarGrilla(){
    var $indicadorDeColor = $('#indicador-de-color');
    var $indicadorDeColorMensaje = $('#indicador-de-color-mensaje');

    function cambiarIndicadorDePincel(color){
        $indicadorDeColor.css("background-color", color);
        $indicadorDeColorMensaje.text(`Pincel: ${color}`);
    }

    function elegirColor(event) {
        var colorActual = $(event.target).css('background-color');
        cambiarIndicadorDePincel(colorActual);
    }
    
    var $paleta = $('#paleta');
    $paleta.click(elegirColor);


    var $grillaDePixeles = $('#grilla-pixeles');

    function pintarPixel(event){
      var colorActual = $indicadorDeColor.css("background-color");
      $(event.target).css('background-color', colorActual);
    }

    function pintarEnMovimiento(event){
        if (mouseApretado) {
            pintarPixel(event);
        }
    }

    $grillaDePixeles.click(pintarPixel);
    $grillaDePixeles.mousemove(pintarEnMovimiento);
}


//FUNCION PARA GUARDAR EL PIXEL ART EN UN ARCHIVO LOCAL
function guardarPixelArt() {
  html2canvas($("#grilla-pixeles") , {
    onrendered: function(canvas) {
      theCanvas = canvas;
      canvas.toBlob(function(blob) {
        saveAs(blob, "pixel-art.png");
      });
    }
  });
}

// CARGA A A UN SUPERHEROE PREDEFINIDO
function cargarSuperheroe(superheroe) {
  var $pixeles = $("#grilla-pixeles div.pixel");
  for (var i = 0; i < superheroe.length; i++) {
    $pixeles[i].style.backgroundColor = superheroe[i];
  }
}



//------------EVENTOS-------------

//EVENTO CHANGE QUE CAMBIA EL COLOR DE ACUERDO AL DEL COLORPICKER
$colorPersonalizado.change(function() {
  // Se guarda el color de la rueda en colorActual
  var colorActual = $colorPersonalizado.val();
  // Completar para que cambie el indicador-de-color al colorActual
  $("#indicador-de-color").css("background-color",colorActual);
});


//GUARDAR LA OBRA DE ARTE
$("#guardar").click(function(){
      guardarPixelArt();
});


//BORARR LA GRILLA
$("#borrar").click(function(){
      $(".pixel").css("background-color","white");
});

// CARGO CADA UNO DE LOS SUPERHEROES HACIENDO CLICK EN CADA IMAGEN

//cargar batman
$("#batman").click(function(){
  cargarSuperheroe(batman);
})

//cargar batman
$("#wonder").click(function(){
  cargarSuperheroe(wonder);
})

//cargar batman
$("#flash").click(function(){
  cargarSuperheroe(flash);
})

//cargar batman
$("#invisible").click(function(){
  cargarSuperheroe(invisible);
})



//----------INVOCANDO LAS FUNCIONES----------
generarPaletaColores();
crearGrillaDePixeles();
pintarGrilla();

//LO QUE FUNCIONA UN POCO RARO ES EL COLORPICKER , TENES QUE PRIMERO SELECCIONAR UN COLOR PARA PODER CAMBIARLO LUEGO
//PD: GRACIAS POR LAS CORRECCIONES!!! :)