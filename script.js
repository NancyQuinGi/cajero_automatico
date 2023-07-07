const cuentas = [
  { nombre: "Mali", saldo: 200, password: "1234" },
  { nombre: "Gera", saldo: 290, password: "1234" },
  { nombre: "Maui", saldo: 67, password: "1234" }
];

let cuentaSeleccionada;
let inputPassword;
let opcionesDiv;
let resultadoDiv;
let formularioTransaccion;

function ingresar() {
  const seleccionCuenta = document.getElementById("seleccion-cuenta");
  const nombreCuenta = seleccionCuenta.value;
  const password = document.getElementById("password").value;

  for (let i = 0; i < cuentas.length; i++) {
    if (nombreCuenta === cuentas[i].nombre && password === cuentas[i].password) {
      cuentaSeleccionada = i;
      inputPassword.value = "";
      document.getElementById("inicio").style.display = "none";
      opcionesDiv.style.display = "block";
      resultadoDiv.innerHTML = "";
      return;
    }
  }

  alert("Nombre de cuenta o contraseña incorrectos. Intenta nuevamente.");
}

function mostrarFormularioDeposito() {
  formularioTransaccion.style.display = "block";
  formularioTransaccion.addEventListener("submit", realizarDeposito);
  document.getElementById("monto-transaccion").value = "";
  document.getElementById("monto-transaccion").focus();
}

function mostrarFormularioRetiro() {
  formularioTransaccion.style.display = "block";
  formularioTransaccion.addEventListener("submit", realizarRetiro);
  document.getElementById("monto-transaccion").value = "";
  document.getElementById("monto-transaccion").focus();
}

function cancelarTransaccion() {
  formularioTransaccion.style.display = "none";
  formularioTransaccion.removeEventListener("submit", realizarDeposito);
  formularioTransaccion.removeEventListener("submit", realizarRetiro);
}

function realizarDeposito(event) {
  event.preventDefault();

  const monto = parseInt(document.getElementById("monto-transaccion").value);
  const saldoActual = cuentas[cuentaSeleccionada].saldo;

  if (monto > 0 && monto <= 990 && saldoActual + monto <= 990) {
    cuentas[cuentaSeleccionada].saldo += monto;
    const saldo = cuentas[cuentaSeleccionada].saldo;
    resultadoDiv.innerHTML = "Monto ingresado: $" + monto + "<br>Nuevo saldo: $" + saldo;
    cancelarTransaccion();
  } else {
    alert("Monto inválido o excede los límites permitidos.");
  }

  document.getElementById("monto-transaccion").value = "";
}

function realizarRetiro(event) {
  event.preventDefault();

  const monto = parseInt(document.getElementById("monto-transaccion").value);
  const saldoActual = cuentas[cuentaSeleccionada].saldo;

  if (monto > 0 && monto >= 10 && monto <= saldoActual && saldoActual - monto >= 10) {
    cuentas[cuentaSeleccionada].saldo -= monto;
    const saldo = cuentas[cuentaSeleccionada].saldo;
    resultadoDiv.innerHTML = "Monto retirado: $" + monto + "<br>Nuevo saldo: $" + saldo;
    cancelarTransaccion();
  } else {
    alert("Monto inválido o excede los límites permitidos.");
  }

  document.getElementById("monto-transaccion").value = "";
}

function consultarSaldo() {
  const saldo = cuentas[cuentaSeleccionada].saldo;
  resultadoDiv.innerHTML = "Saldo actual: $" + saldo;
}

function mostrarFormularioConsulta() {
  formularioTransaccion.style.display = "none"; // Oculta el formulario de ingreso o retiro de saldo
  resultadoDiv.innerHTML = ""; // Limpia el resultado anterior, si lo hubiera
  consultarSaldo(); // Llama a la función de consulta de saldo directamente
}


function cerrarSesion() {
  opcionesDiv.style.display = "none";
  document.getElementById("inicio").style.display = "block";
  cuentaSeleccionada = undefined;
  inputPassword = undefined;
  resultadoDiv.innerHTML = "";
}

window.onload = function () {
  inputPassword = document.getElementById("password");
  opcionesDiv = document.getElementById("opciones");
  resultadoDiv = document.getElementById("resultado");
  formularioTransaccion = document.getElementById("formulario-transaccion");
};
