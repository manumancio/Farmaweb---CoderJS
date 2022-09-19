// **********************CARRITO DE COMPRAS

//informacion sobre los medicamentos en venta
const impuestosIva = 21;

class Medicamento {
    constructor(nombre, generico, precio) {
        this.nombreComercial = nombre;
        this.nombreGenerico = generico;
        this.precio = precio;
    }

    calcularPrecioConIva() {
        return (this.precio + this.precio * impuestosIva / 100)
    }
}

const medicamento1 = new Medicamento("Actron", "Diclofenac 50 mg", 110, 1000);
const medicamento2 = new Medicamento("Ibupirac", "Ibuprofeno 400 mg", 120, 1500);
const medicamento3 = new Medicamento("Tafirol", "Paracetamol 500 mg", 90, 1000);
const medicamento4 = new Medicamento("Bayaspirina", "Aspirina 500 mg", 100, 1200);

const medicamentosEnVenta = [];

medicamentosEnVenta.push(medicamento1);
medicamentosEnVenta.push(medicamento2);
medicamentosEnVenta.push(medicamento3);
medicamentosEnVenta.push(medicamento4);


//array carro de compras inicial
const carroCompras = []


//funcion que muestra menu inicial
function mostrarMenuInicial() {
    alert("Bienvenidos a FarmaWeb.\nPor el momento solo vendemos analgésicos de venta libre.")
    let eleccionCliente = prompt("Elige una de las siguientes opciones.\n1- Comprar analgésicos.\n2- LLamar un Farmacéutico para mayor asesoramiento.\n3- Salir.")

    while (eleccionCliente != "1" && eleccionCliente != "2" && eleccionCliente != "3") {
        eleccionCliente = prompt("Elige una de las siguientes opciones.\n1- Comprar analgésicos.\n2- LLamar un Farmacéutico para mayor asesoramiento.\n3- Salir.")
    }
    return eleccionCliente
}


//funcion consulta sobre las opciones de analgesicos disponibles
function mostrarOpcionesAnalgesico() {
    let analgesicoElegido = prompt("Si quieres comprar un analgésico de venta libre, podemos ofrecerte los siguientes. Selecciona 1, 2, 3 ó 4 según prefieras: \n1-Aspirina Bayer comprimidos 500mg\n2-Ibuprofeno Ibupirac cápsulas blandas 400mg\n3-Diclofenac Actron comprimidos 50mg\n4-Paracetamol Tafirol comprimidos 500mg\n5-Si decides no optar por ninguno.")

    while (analgesicoElegido != "1" && analgesicoElegido != "2" && analgesicoElegido != "3" && analgesicoElegido != "4" && analgesicoElegido != "5") {
        analgesicoElegido = prompt("Si quieres comprar un analgésico de venta libre, podemos ofrecerte los siguientes. selecciona 1, 2, 3 ó 4 según prefieras: \n1-Aspirina Bayer comprimidos 500mg\n2-Ibuprofeno Ibupirac cápsulas blandas 400mg\n3-Diclofenac Actron comprimidos 50mg\n4-Paracetamol Tafirol comprimidos 500mg\n5-Si decides no optar por ninguno.")
    }
    return analgesicoElegido
}


// //funcion para sumar un medicamento al carro de compras
// function sumarMedicamento(medicamento) {
//     carroCompras.push(medicamento);
//     alert(medicamento.nombreComercial + " se agregó a tu carro de compras, el precio con impuestos incluidos es de " + medicamento.calcularPrecioConIva() + " pesos.");
//     let nuevaCompra = seguirComprando();
//     segundoMenu(nuevaCompra)
// }


//funcion consulta sobre nueva compra
function seguirComprando() {
    let nuevaCompra = prompt("Si quieres presiona:\n1- Para agregar otro analgésico.\n2- Mostrar tu carrito de compras.\n3- Eliminar algun item del carrito de compras.\n4- Si quieres finalizar tu compra.");

    while (nuevaCompra != "1" && nuevaCompra != "2" && nuevaCompra != "3" && nuevaCompra != "4") {
        nuevaCompra = prompt("Si quieres presiona:\n1- Para agregar otro analgésico.\n2- Mostrar tu carrito de compras.\n3- Eliminar algun item del carrito de compras.\n4- Si quieres finalizar tu compra.");
    }
    return nuevaCompra;
}


// //funcion para mostrar carrito e compras
// function mostrarCarrito() {
//     let carrito = "aún está vacío"
//     carrito = carroCompras.map(medicamento => medicamento.nombreGenerico);
//     alert("Ítems de tu carro de compra: " + carrito);
//     let nuevaCompra = seguirComprando();
//     segundoMenu(nuevaCompra)
// }


// //funcion para eliminar un medicamento del carro
// function eliminarMedicamento() {
//     let carrito = "aún está vacío"
//     carrito = carroCompras.map(medicamento => medicamento.nombreComercial);
//     let medicamentoABorrar = prompt(`Por el momento tienes en tu carro de compras ${carrito}. Indica el nombre comercial del medicamento que deseas eliminar de tu carro de compras (Bayaspirina, Ibupirac, Actron, Tafirol).`);
//     let medicamento = carroCompras.find(medicamento => medicamento.nombreComercial === medicamentoABorrar)
//     let indice = carroCompras.indexOf(medicamento);
//     carroCompras.splice(indice, 1);
//     console.log(carroCompras);
//     let nuevaCompra = seguirComprando();
//     segundoMenu(nuevaCompra);
// }


// //funcion del cálculo del precio total de la compra
// function calcularTotal() {
//     let totalCompra = 0;
//     for (total of carroCompras) {
//         totalCompra += total.calcularPrecioConIva()
//     }
//     alert("Gracias por tu compra, el precio total que debes abonar es de " + totalCompra.toFixed(2) + " pesos.");
//     console.log(carroCompras);
// }


//funcion eleccion del segundo menu
const segundoMenu = nuevaCompra => {
    //comprar otro analgesico
    if (nuevaCompra == "1") {
        eleccionMedicamento()

        //mostrar el carro de compras
    } else if (nuevaCompra == "2") {
        mostrarCarrito()

        //eliminar item del carro de compras
    } else if (nuevaCompra == "3") {
        eliminarMedicamento()

        //finalizacion de la compra
    } else if (nuevaCompra == "4") {
        calcularTotal()

    } else {
        alert("La opción no es válida.")
    }
}




//EJECUCION DEL PROGRAMA

let eleccionCliente = mostrarMenuInicial()

switch (eleccionCliente) {
    case "1":
        let analgesicoElegido = mostrarOpcionesAnalgesico();
    switch (analgesicoElegido) {
        case "1":
            sumarMedicamento(medicamento4);
            break;
        case "2":
            sumarMedicamento(medicamento2);
            break;
        case "3":
            sumarMedicamento(medicamento1);
            break;
        case "4":
            sumarMedicamento(medicamento3);
            break;
        case "5":
            alert("No elegiste ninguna de nuestras opciones de analgésicos.");
            calcularTotal()
            break;
    }
        break;
    case "2":
        alert("Aguarda unos minutos, te pondremos en contacto con el Farmacéutico.");
        break;
    case "3":
        alert("Saliste del sistema de compras. Esperamos tu nueva visita. Gracias.");
        break;
    default:
        alert("Lo siento, no es una opcion válida.");
        break;
}






// // **********************GESTION DE RESERVA DE TURNOS


// // let turno = prompt("Seleccioná:\n1- Si querés un turno para que se te mida la presión, o\n2- Si querés un turno para hacerte análisis de laboratorio.")

// // const pedirTurno = turno => {
// //     while (turno != "1" && turno != "2") {
// //         turno = prompt("Selecciona:\n 1- Si querés un turno para que se te mida la presion, o\n 2- Si querés un turno para hacerte análisis de laboratorio.")
// //     }
// //     if (turno == "1" || turno == "2") {
// //         alert("Seleccioná el día y el horario que más te convenga.")
// //     }
// // }

// // pedirTurno(turno);