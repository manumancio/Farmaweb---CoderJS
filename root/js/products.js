//informacion sobre los medicamentos en venta

const descuentoSocio = 5;

class Medicamento {
    constructor(nombre, generico, precio, stock, imagen, cantidad) {
        this.nombreComercial = nombre;
        this.nombreGenerico = generico;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.cantidad = cantidad;
    }

    calcularConDescuento() {
        return ((this.precio * this.cantidad) - (this.precio * this.cantidad) * descuentoSocio / 100)
    }
    calcularPrecioSegunUnidades() {
        return (this.precio * this.cantidad)
    }
}

const actron = new Medicamento("Actron", "Ibuprofeno 400 mg", 1100, 1000, "./images/rsz_actron.png", 1);
const actronMujer = new Medicamento("Actron Mujer Forte", "Ibuprofeno 400 mg", 1100, 1100, "./images/rsz_actronMujer.png", 1);
const actronPediatrico = new Medicamento("Actron Pediátrico", "Ibuprofeno 2%", 1100, 1000, "./images/rsz_actronPediatrico.png", 1);
const ibupirac = new Medicamento("Ibupirac", "Ibuprofeno 400 mg", 1200, 1500, "./images/rsz_ibupirac.png", 1);
const ibuevanolForte = new Medicamento("Ibuevanol Forte", "Ibuprofeno 400 mg", 1250, 500, "./images/rsz_ibuevanolForte.png", 1);
const bayaspirina = new Medicamento("Bayaspirina", "Aspirina 500 mg", 1000, 1200, "./images/rsz_bayaspirina.jpg", 1);
const aspirinetas = new Medicamento("Aspirinetas", "Aspirina 100 mg", 1050, 500, "./images/rsz_aspirineta.jpg", 1);
const novalgina = new Medicamento("Novalgina", "Dipirona 500 mg", 1150, 500, "./images/rsz_novalgina.jpg", 1);
const naproxeno = new Medicamento("Naproxeno Laproff", "Naproxeno 500 mg", 1350, 500, "./images/rsz_naproxeno.png", 1);
const tafirol = new Medicamento("Tafirol", "Paracetamol 500 mg", 900, 1000, "./images/rsz_tafirol.jpg", 1);
const tafirolPediatrico = new Medicamento("Tafirol Pediátrico", "Paracetamol 120mg/5ml", 145, 500, "./images/rsz_tafirolPediatrico.jpg", 1);
const geniol = new Medicamento("Geniol", "Paracetamol 500 mg", 900, 500, "./images/rsz_geniol.png", 1);


const medicamentosEnVenta = [];

medicamentosEnVenta.push(actron);
medicamentosEnVenta.push(actronMujer);
medicamentosEnVenta.push(actronPediatrico);
medicamentosEnVenta.push(ibupirac);
medicamentosEnVenta.push(ibuevanolForte);
medicamentosEnVenta.push(bayaspirina);
medicamentosEnVenta.push(aspirinetas);
medicamentosEnVenta.push(novalgina);
medicamentosEnVenta.push(naproxeno);
medicamentosEnVenta.push(tafirol);
medicamentosEnVenta.push(tafirolPediatrico);
medicamentosEnVenta.push(geniol);