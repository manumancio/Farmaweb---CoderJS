// **********************GESTION DE RESERVA DE TURNOS


let turno = prompt("Seleccioná:\n1- Si querés un turno para que se te mida la presión, o\n2- Si querés un turno para hacerte análisis de laboratorio.")

const pedirTurno = turno => {
    while (turno != "1" && turno != "2") {
        turno = prompt("Selecciona:\n 1- Si querés un turno para que se te mida la presion, o\n 2- Si querés un turno para hacerte análisis de laboratorio.")
    }
    if (turno == "1" || turno == "2") {
        alert("Seleccioná el día y el horario que más te convenga.")
    }
}

pedirTurno(turno);






// **********************CARRITO DE COMPRAS

// const precioAspirina = 100;
// const precioIbuprofeno = 120;
// const precioDiclofenac = 110;
// const precioParacetamol = 90;
// const impuestosIva = 0.21;

// let analgesicoElegido = prompt("Si quieres comprar un analgésico de venta libre, podemos ofrecerte los siguientes. selecciona 1, 2, 3 ó 4 según prefieras: \n1-Aspirina Bayer comprimidos 500mg\n2-Ibuprofeno Ibupirac cápsulas blandas 400mg\n3-Diclofenac Actron comprimidos 50mg\n4-Paracetamol Tafirol comprimidos 500mg\n5-Si decides no optar por ninguno.")


// function elegirAnalgesico(analgesicoElegido) {
//     switch (analgesicoElegido) {
//         case "1":
//             return precioAspirina;
//         case "2":
//             return precioIbuprofeno;
//         case "3":
//             return precioDiclofenac;
//         case "4":
//             return precioParacetamol;
//         default:
//             console.log("solo puedes elegir entre los siguientes valores: \n1-Aspirina Bayer comprimidos 500mg\n2-Ibuprofeno Ibupirac cápsulas blandas 400mg\n3-Diclofenac comprimidos 50mg\n4-Paracetamol comprimidos 500mg\n5-Si decides no optar por ninguno")
//             break; //Lauti: este codigo es inaccesible, tiene sentido que lo escriba??
//     }
// }

// const calculoPrecioConIva = elegirAnalgesico => elegirAnalgesico(analgesicoElegido) + elegirAnalgesico(analgesicoElegido) * impuestosIva / 100;

// const informarPrecio = analgesicoElegido => {
//     if (analgesicoElegido == "1" || analgesicoElegido == "2" || analgesicoElegido == "3" || analgesicoElegido == "4") {
//         console.log("El precio final de tu compra, con impuestos incluidos, es de " + calculoPrecioConIva(elegirAnalgesico) + " pesos.")
//     } else if (analgesicoElegido == "5") {
//         console.log("No elegiste ninguna de nuestras opciones de analgésicos.");
//     } else {
//         let asesoramientoFarmaceutico = prompt("No has realizado ninguna compra.Te gustaría que te asesore algún farmacéutico?")
//         if (asesoramientoFarmaceutico == "si" || asesoramientoFarmaceutico == "SI") {
//             console.log("Aguarda unos minutos, te pondremos en contacto con el farmacéutico")
//         }
//     }
// }

// informarPrecio(analgesicoElegido);