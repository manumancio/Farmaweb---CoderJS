// **********************CARRITO DE COMPRAS

//informacion sobre los medicamentos en venta
const impuestosIva = 21;

class Medicamento {
    constructor(nombre, generico, precio) {
        this.nombreComercial = nombre;
        this.nombreGenerico = generico;
        this.precio = precio;
    }

    calculoPrecioConIva() {
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


//compras y nuevas compras
const carroCompras = []

const comprar = medicamento => {
    carroCompras.push(medicamento);
    alert(medicamento.nombreGenerico + " se agregó a tu carro de compras, el precio con impuestos incluidos es de " + medicamento.calculoPrecioConIva() + " pesos.");

    let nuevaCompra = seguirComprando();

    if (nuevaCompra == "1") {
        let analgesicoElegido = eleccionAnalgesico();
        switch (analgesicoElegido) {
            case "1":
                comprar(medicamento4);
                break;
            case "2":
                comprar(medicamento2);
                break;
            case "3":
                comprar(medicamento1);
                break;
            case "4":
                comprar(medicamento3);
                break;
            case "5":
                alert("No elegiste ninguna de nuestras opciones de analgésicos. Te esperamos para una nueva compra. Gracias.");
                break;
        }
    } else if (nuevaCompra == "2") {
        let totalCompra = calculoTotal();
        alert("Gracias por tu compra, el precio total que debes abonar es de " + totalCompra.toFixed(2) + " pesos.");
        console.log(carroCompras);
        
    } else {
        alert("la opcion no es válida")
        seguirComprando()
    }
}

function seguirComprando() {
    let nuevaCompra = prompt("Si quieres presiona:\n1- Para agregar otro analgésico.\n2- Si quieres finalizar tu compra.");

    while (nuevaCompra != "1" && nuevaCompra != "2") {
        nuevaCompra = prompt("Si quieres presiona:\n1- Para agregar otro analgésico.\n2- Si quieres finalizar tu compra.");
    }
    return nuevaCompra;
}


//menu inicial
function menuInicial() {
    alert("Bienvenidos a FarmaWeb.\nPor el momento solo vendemos analgésicos de venta libre.")
    let eleccionCliente = prompt("Elige una de las siguientes opciones.\n1- Comprar analgésicos.\n2- LLamar un Farmacéutico para mayor asesoramiento.\n3- Salir.")

    while (eleccionCliente != "1" && eleccionCliente != "2" && eleccionCliente != "3") {
        eleccionCliente = prompt("Elige una de las siguientes opciones.\n1- Comprar analgésicos.\n2- LLamar un Farmacéutico para mayor asesoramiento.\n3- Salir.")
    }
    return eleccionCliente
}


//eleccion de analgesico
function eleccionAnalgesico() {
    let analgesicoElegido = prompt("Si quieres comprar un analgésico de venta libre, podemos ofrecerte los siguientes. Selecciona 1, 2, 3 ó 4 según prefieras: \n1-Aspirina Bayer comprimidos 500mg\n2-Ibuprofeno Ibupirac cápsulas blandas 400mg\n3-Diclofenac Actron comprimidos 50mg\n4-Paracetamol Tafirol comprimidos 500mg\n5-Si decides no optar por ninguno.")

    while (analgesicoElegido != "1" && analgesicoElegido != "2" && analgesicoElegido != "3" && analgesicoElegido != "4" && analgesicoElegido != "5") {
        analgesicoElegido = prompt("Si quieres comprar un analgésico de venta libre, podemos ofrecerte los siguientes. selecciona 1, 2, 3 ó 4 según prefieras: \n1-Aspirina Bayer comprimidos 500mg\n2-Ibuprofeno Ibupirac cápsulas blandas 400mg\n3-Diclofenac Actron comprimidos 50mg\n4-Paracetamol Tafirol comprimidos 500mg\n5-Si decides no optar por ninguno.")
    }
    return analgesicoElegido
}


//cálculo del precio total
function calculoTotal() {
    let totalCompra = 0;
    for (total of carroCompras) {
        totalCompra += total.calculoPrecioConIva()
    }
    return totalCompra
}


//ejecución el programa
let eleccionCliente = menuInicial()

switch (eleccionCliente) {
    case "1":

        let analgesicoElegido = eleccionAnalgesico()
        switch (analgesicoElegido) {
            case "1":
                comprar(medicamento4);
                break;
            case "2":
                comprar(medicamento2);
                break;
            case "3":
                comprar(medicamento1);
                break;
            case "4":
                comprar(medicamento3);
                break;
            case "5":
                alert("No elegiste ninguna de nuestras opciones de analgésicos. Te esperamos para una nueva compra. Gracias.");
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