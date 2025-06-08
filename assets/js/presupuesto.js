// assets/js/presupuesto.js

// Referencias a elementos del DOM
const form           = document.getElementById('form-presupuesto');
const btnEnviar      = document.getElementById('btn-enviar');
const nombre         = document.getElementById('nombre');
const apellidos      = document.getElementById('apellidos');
const telefono       = document.getElementById('telefono');
const email          = document.getElementById('email');
const productoRadios = document.querySelectorAll('input[name="producto"]');
const plazoInput     = document.getElementById('plazo');
const unidadSelect   = document.getElementById('unidad-plazo');
const extrasChecks   = document.querySelectorAll('input[name="extras"]');
const presupuestoOut = document.getElementById('presupuesto-final');
const descuentoInfo  = document.getElementById('descuento-info');
const condiciones    = document.getElementById('condiciones');

// Funciones de validación según el PDF
function validarNombre() {
  const re = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]{1,15}$/;
  if (!re.test(nombre.value.trim())) {
    document.getElementById('error-nombre').textContent = 'Solo letras (máx. 15).';
    return false;
  }
  document.getElementById('error-nombre').textContent = '';
  return true;
}

function validarApellidos() {
  const re = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]{1,40}$/;
  if (!re.test(apellidos.value.trim())) {
    document.getElementById('error-apellidos').textContent = 'Solo letras (máx. 40).';
    return false;
  }
  document.getElementById('error-apellidos').textContent = '';
  return true;
}

function validarTelefono() {
  const re = /^\d{9}$/;
  if (!re.test(telefono.value.trim())) {
    document.getElementById('error-telefono').textContent = 'Debe tener 9 dígitos.';
    return false;
  }
  document.getElementById('error-telefono').textContent = '';
  return true;
}

function validarEmail() {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email.value.trim())) {
    document.getElementById('error-email').textContent = 'Email inválido.';
    return false;
  }
  document.getElementById('error-email').textContent = '';
  return true;
}

function validarProducto() {
  const ok = Array.from(productoRadios).some(r => r.checked);
  document.getElementById('error-producto').textContent = ok ? '' : 'Selecciona un tipo de clase.';
  return ok;
}

function validarPlazo() {
  const v = Number(plazoInput.value);
  const u = unidadSelect.value;
  if (!v || v < 1 || !u) {
    document.getElementById('error-plazo').textContent = 'Indica duración y unidad.';
    return false;
  }
  document.getElementById('error-plazo').textContent = '';
  return true;
}

function validarCondiciones() {
  if (!condiciones.checked) {
    document.getElementById('error-condiciones').textContent = 'Debes aceptar las condiciones.';
    return false;
  }
  document.getElementById('error-condiciones').textContent = '';
  return true;
}

// Cálculo del presupuesto y del descuento
function calcularPresupuesto() {
  // 1) Calcular días totales
  const dias = Number(plazoInput.value) || 0;
  const unidad = unidadSelect.value;
  const diasTotales = unidad === 'meses' ? dias * 30 : dias;

  // 2) Precio bruto
  let bruto = 0;
  const seleccionado = Array.from(productoRadios).find(r => r.checked);
  if (seleccionado) {
    bruto += Number(seleccionado.dataset.precio) * diasTotales;
  }
  extrasChecks.forEach(cb => {
    if (cb.checked) bruto += Number(cb.dataset.precio);
  });

  // 3) Descuento: 0% + 5% por cada semana completa, hasta 35%
  const semanas = Math.floor(diasTotales / 7);
  const porcentaje = Math.min(semanas * 5, 35);

  // 4) Calcular neto y actualizar salidas
  const neto = bruto * (1 - porcentaje / 100);
  presupuestoOut.value = neto.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR'
  });
  descuentoInfo.textContent = 
    `Descuento aplicado: ${porcentaje}% (-${(bruto - neto).toLocaleString('es-ES', {
      style: 'currency',
      currency: 'EUR'
    })})`;
}

// Comprueba todas las validaciones y habilita/deshabilita el botón Enviar
function checkForm() {
  const valido = [
    validarNombre(),
    validarApellidos(),
    validarTelefono(),
    validarEmail(),
    validarProducto(),
    validarPlazo(),
    validarCondiciones()
  ].every(v => v);

  btnEnviar.disabled = !valido;
}

// Asociar eventos
nombre.addEventListener('input', () => { validarNombre(); checkForm(); });
apellidos.addEventListener('input', () => { validarApellidos(); checkForm(); });
telefono.addEventListener('input', () => { validarTelefono(); checkForm(); });
email.addEventListener('input', () => { validarEmail(); checkForm(); });
productoRadios.forEach(r => r.addEventListener('change', () => {
  validarProducto(); calcularPresupuesto(); checkForm();
}));
plazoInput.addEventListener('input', () => {
  validarPlazo(); calcularPresupuesto(); checkForm();
});
unidadSelect.addEventListener('change', () => {
  validarPlazo(); calcularPresupuesto(); checkForm();
});
extrasChecks.forEach(cb => cb.addEventListener('change', () => {
  calcularPresupuesto(); checkForm();
}));
condiciones.addEventListener('change', () => { validarCondiciones(); checkForm(); });

// Inicialización al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  calcularPresupuesto();
  checkForm();
});
