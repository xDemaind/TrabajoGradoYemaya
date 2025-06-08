// contacto.js

// ---------------------------------------------------
// 1. Función iniciarMapa (ya en ámbito global)
// ---------------------------------------------------
function iniciarMapa() {
  // Coordenadas de Playa del Faro, Cádiz
  const coordsYemaya = { lat: 36.2238, lng: -6.0645 };
  const mapa = new google.maps.Map(document.getElementById('mapa'), {
    center: coordsYemaya,
    zoom: 15,
  });

  // Marcador de la empresa
  const marcador = new google.maps.Marker({
    position: coordsYemaya,
    map: mapa,
    title: 'Yemayá Surf',
  });

  // Autocompletar ubicación del usuario y calculadora de ruta
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(mapa);

  const inputOrigen = document.createElement('input');
  inputOrigen.type = 'text';
  inputOrigen.id = 'origen';
  inputOrigen.placeholder = 'Introducir tu ubicación';
  inputOrigen.classList.add('input-origen');
  document.getElementById('mapa').appendChild(inputOrigen);

  const botonRuta = document.createElement('button');
  botonRuta.textContent = 'Calcular ruta';
  botonRuta.classList.add('btn-ruta');
  document.getElementById('mapa').appendChild(botonRuta);

  botonRuta.addEventListener('click', () => {
    const origen = inputOrigen.value;
    if (!origen) return alert('Introduce tu ubicación');
    directionsService.route(
      {
        origin: origen,
        destination: coordsYemaya,
        travelMode: 'DRIVING',
      },
      (respuesta, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(respuesta);
        } else {
          alert('No se pudo calcular la ruta: ' + status);
        }
      }
    );
  });
}

// ---------------------------------------------------
// 2. Validación de formulario de contacto
// ---------------------------------------------------
const formContacto = document.getElementById('form-contacto');
const nombreC = document.getElementById('nombre');
const emailC = document.getElementById('email');
const asuntoC = document.getElementById('asunto');
const mensajeC = document.getElementById('mensaje');

// Mensajes de error
const errorNombreC = document.getElementById('error-nombre');
const errorEmailC = document.getElementById('error-email');
const errorAsuntoC = document.getElementById('error-asunto');
const errorMensajeC = document.getElementById('error-mensaje');

// Funciones de validación
function validarNombreC() {
  const valor = nombreC.value.trim();
  if (valor.length < 3) {
    errorNombreC.textContent = 'Debes introducir al menos 3 caracteres.';
    return false;
  }
  errorNombreC.textContent = '';
  return true;
}

function validarEmailC() {
  const valor = emailC.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
    errorEmailC.textContent = 'Formato de correo inválido.';
    return false;
  }
  errorEmailC.textContent = '';
  return true;
}

function validarAsuntoC() {
  const valor = asuntoC.value.trim();
  if (valor.length < 5) {
    errorAsuntoC.textContent = 'Debes introducir un asunto válido.';
    return false;
  }
  errorAsuntoC.textContent = '';
  return true;
}

function validarMensajeC() {
  const valor = mensajeC.value.trim();
  if (valor.length < 10) {
    errorMensajeC.textContent = 'El mensaje debe tener al menos 10 caracteres.';
    return false;
  }
  errorMensajeC.textContent = '';
  return true;
}

// Eventos de validación en tiempo real
nombreC.addEventListener('input', validarNombreC);
emailC.addEventListener('input', validarEmailC);
asuntoC.addEventListener('input', validarAsuntoC);
mensajeC.addEventListener('input', validarMensajeC);

// Envío del formulario
formContacto.addEventListener('submit', function (e) {
  e.preventDefault();

  const esNombreValido = validarNombreC();
  const esEmailValido = validarEmailC();
  const esAsuntoValido = validarAsuntoC();
  const esMensajeValido = validarMensajeC();

  if (esNombreValido && esEmailValido && esAsuntoValido && esMensajeValido) {
    alert('Formulario enviado correctamente.');
    formContacto.reset();
  } else {
    alert('Revisa los campos marcados en rojo.');
  }
});

// Reiniciar mensajes de error al resetear
formContacto.addEventListener('reset', function () {
  [errorNombreC, errorEmailC, errorAsuntoC, errorMensajeC].forEach(el => {
    el.textContent = '';
  });
});
