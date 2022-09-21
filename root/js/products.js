//informacion sobre los medicamentos en venta

const impuestosIva = 21;

class Medicamento {
    constructor(nombre, generico, precio, stock, imagen) {
        this.nombreComercial = nombre;
        this.nombreGenerico = generico;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }

    calcularPrecioConIva() {
        return (this.precio + this.precio * impuestosIva / 100)
    }
}

const actron = new Medicamento("Actron", "Ibuprofeno 400 mg", 110, 1000, "./images/rsz_actron.png");
const actronMujer = new Medicamento("Actron Mujer", "Ibuprofeno 400 mg", 110, 1100, "./images/rsz_actronMujer.jpg");
const actronPediatrico = new Medicamento("Actron Pediátrico", "Ibuprofeno 2%", 110, 1000, "./images/rsz_actronPediatrico.png");
const ibupirac = new Medicamento("Ibupirac", "Ibuprofeno 400 mg", 120, 1500, "./images/rsz_ibupirac.png");
const ibuevanolForte = new Medicamento("Ibuevanol Forte", "Ibuprofeno 400 mg", 125, 500, "./images/rsz_ibuevanolForte.png");
const bayaspirina = new Medicamento("Bayaspirina", "Aspirina 500 mg", 100, 1200, "./images/rsz_bayaspirina.jpg");
const aspirinetas = new Medicamento("Aspirinetas", "Aspirina 100 mg", 105, 500, "./images/rsz_aspirineta.jpg");
const novalgina = new Medicamento("Novalgina", "Dipirona 500 mg", 115, 500, "./images/rsz_novalgina.jpg");
const naproxeno = new Medicamento("Naproxeno Laproff", "Naproxeno 500 mg", 135, 500, "./images/rsz_naproxeno.png");
const tafirol = new Medicamento("Tafirol", "Paracetamol 500 mg", 90, 1000, "./images/rsz_tafirol.jpg");
const tafirolPediatrico = new Medicamento("Tafirol Pediátrico", "Paracetamol 120mg/5ml", 145, 500, "./images/rsz_tafirolPediatrico.jpg");
const geniol = new Medicamento("Geniol", "Paracetamol 500 mg", 90, 500, "./images/rsz_geniol.png");


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