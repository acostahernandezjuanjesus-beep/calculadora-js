// --- Estado ---
// Aqui vive toda la informacion de la calculadora en memoria
let valorActual = "0"
let valorAnterior= ""
let operador= null
let esperandoSegundoNumero = false

// --- REFERENCIAS AL DOM ---
//Le decimos a JS qué elementos del HTML vamos a manipular
const display= document.getElementById("display")
const historial =document.getElementById("historial")

// --- FUNCIONES ---

function actualizarPantalla() {
    display.textContent = valorActual
}

function presionarNumero(numero) {
    if (esperandoSegundoNumero) {
        valorActual = numero
        esperandoSegundoNumero = false
    } else {
        valorActual = valorActual === "0" ? numero : valorActual + numero
    }
    actualizarPantalla()
}


function presionarDecimal() {
    if (valorActual.includes(".")) return
    valorActual =valorActual + "."
    actualizarPantalla()
}

function presionarOperador(op) {
    valorAnterior = valorActual
    operador = op
    esperandoSegundoNumero = true
    historial.textContent = valorActual + " " + op
}

function calcular () {
    if (!operador || esperandoSegundoNumero) return

    const a = parseFloat(valorAnterior)
    const b= parseFloat(valorActual)
    let resultado

    if (operador === "+") resultado = a + b
    if (operador === "-") resultado = a - b
    if (operador === "*") resultado = a * b
    if (operador === "/") resultado = b !== 0? a/b : "Error"

    historial.textContent = valorAnterior + " " + operador + " " + valorActual + " ="
    valorActual = String(resultado)
    operador = null
    esperandoSegundoNumero = false
    actualizarPantalla()
}

function limpiar() {
    valorActual = "0"
    valorAnterior = ""
    operador = null
    esperandoSegundoNumero = false
    historial.textContent = ""
    actualizarPantalla()
}

function cambiarSigno() {
    valorActual= String(parseFloat(valorActual) * -1)
}

function porcentaje() {
    valorActual = String(parseFloat(valorActual) / 100)
    actualizarPantalla()
}

// --- EVENTOS ---
// Recorremos todos los botones y les asignamos que hacer al hacer click

document.querySelectorAll(".btn").forEach(boton => {
    boton.addEventListener ("click", () => {
        const texto = boton.textContent
        if (boton.classList.contains("numero")) {
            if (texto === ".") {
                presionarDecimal()
            } else {
                presionarNumero(texto)
            
            }
        }

        if (boton.classList.contains("operador")) {
            if (texto === "+/-")cambiarSigno()
                else if  (texto === "%") porcentaje()
            else presionarOperador(texto)
            }
        
            if (boton.classList.contains("borrar")) limpiar()
            if (boton.classList.contains("igual")) calcular()
            })
        })