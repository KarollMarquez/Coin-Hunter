//Diseño tablero
function setHeightEqualToWidth(elementId) {
    const element = document.getElementById('container');
    const width = element.offsetWidth;
    element.style.height = width + 'px';
  }

  window.addEventListener('resize', function() {
    setHeightEqualToWidth('container');
  });

// Llamar a la función inicialmente para establecer la altura igual al ancho
setHeightEqualToWidth('container');


//Funcionamiento del juego
var puntaje = 0;
var vidas = 3;

function perderVida() {
  // Reduce una vida
  vidas--;

  // Obtén la lista de elementos de vida
  var vidasElementos = document.getElementsByClassName("icons");

  // Verifica si se agotaron las vidas
  if (vidas === 0) {
    // Muestra un mensaje de Game Over
    if (nombreUsuario && puntajeUsuario) {
        swal({title: "Game Over"});
        
        guardarPuntaje();
    }      
    else{
        swal({
            title: "Game Over"},"Este puntaje no se guardará");
    }
    restaurarJuego();
    mostrarPuntaje();
  }

  // Actualiza la opacidad de los elementos de vida
  vidasElementos[vidasElementos.length - vidas - 1].classList.add("lost-life");
}

var vidas = 3;

function revelarImagen(casilla) {
  // Verifica si la casilla ya fue revelada
  if (!casilla.classList.contains("revelada")) {
    var imagen = obtenerImagenAleatoria();

    // Agrega la clase "revelada" para evitar que se revele nuevamente
    casilla.classList.add("revelada");

    // Actualiza el contenido de la casilla con la imagen revelada
    casilla.style.backgroundImage = `url('${imagen}')`;

    // Actualiza el puntaje y las vidas en función de la imagen revelada
    if (imagen === "images/oro.png") {
      puntaje += 15;
    } else if (imagen === "images/ladron.png") {
      puntaje -= 10;
      perderVida();
    }

    // Actualiza el puntaje en el elemento HTML correspondiente
    document.getElementById("puntaje").textContent = puntaje;
  }
}

function perderVida() {
  // Reduce una vida
  vidas--;

  // Obtén la lista de elementos de vida
  var vidasElementos = document.getElementsByClassName("icons");

  // Verifica si se agotaron las vidas
  if (vidas === 0) {
    // Muestra un mensaje de Game Over
    if (nombreUsuario && puntajeUsuario) {
      swal({title: "Game Over"});
      
      guardarPuntaje();
  }      
  else{
      swal({
          title: "Game Over"},"Este puntaje no se guardará");
  }
  restaurarJuego();
  mostrarPuntaje();
  }

  // Actualiza la opacidad de los elementos de vida
  for (var i = 0; i < vidasElementos.length; i++) {
    if (i >= vidas) {
      vidasElementos[i].classList.add("lost-life");
    }
  }
}

function obtenerImagenAleatoria() {
    var totalMonedas = 25 - 10; // Total de casillas menos el número de ladrones
    var imagenes = [];
  
    // Agrega las imágenes de monedas al arreglo
    for (var i = 0; i < totalMonedas; i++) {
      imagenes.push("images/oro.png");
    }
  
    // Agrega las imágenes de ladrones al arreglo
    for (var i = 0; i < 10; i++) {
      imagenes.push("images/ladron.png");
    }
  
    var indiceAleatorio = Math.floor(Math.random() * imagenes.length);
    return imagenes.splice(indiceAleatorio, 1)[0];
}

function restaurarJuego() {
    // Restablecer vidas
    vidas = 3;
    var vidasElementos = document.getElementsByClassName("icons");
    Array.from(vidasElementos).forEach((elemento) => {
      elemento.classList.remove("lost-life");
    });
  
    // Restablecer puntaje
    puntaje = 0;
    document.getElementById("puntaje").textContent = puntaje;
  
    // Restablecer casillas
    var casillas = document.getElementsByClassName("casilla");
    Array.from(casillas).forEach((casilla) => {
      casilla.classList.remove("revelada");
      casilla.style.backgroundImage = "";
    });
}
