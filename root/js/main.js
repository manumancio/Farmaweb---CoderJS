//buscador de medicamentos

const displayCoincidencias = document.getElementById('displayCoincidencias');
const buscadorMedicamentos = document.getElementById('buscadorMedicamentos');
const btnBuscadorMedicamentos = document.getElementById('btnBuscadorMedicamentos')


const filtrar = () => {
    displayCoincidencias.innerHTML = ''; //para reiniciar
    const texto = buscadorMedicamentos.value.toLowerCase();
    medicamentosEnVenta.forEach((elemento) => {
        let nombreComercialIngresado = elemento.nombreComercial.toLowerCase();
        let nombreGenericoIngresado = elemento.nombreGenerico.toLowerCase();

        if ((nombreComercialIngresado.indexOf(texto) >= 0) || (nombreGenericoIngresado.indexOf(texto) >= 0)) {
            console.log(nombreComercialIngresado.indexOf(texto))
            let displayCoincidenciasItem = document.createElement("displayCoincidenciasItem")
            displayCoincidenciasItem.classList.add("displayCoincidenciasItem")

            displayCoincidenciasItem.innerHTML += `
                <img src="${elemento.imagen}" class="img-buscador" alt="Imagen ilustrativa del medicamento ${elemento.nombreComercial}">
                <div class="card-body p-4">
                    <h5 class="card-title p-1">${elemento.nombreComercial}</h5>
                    <p class="card-text">${elemento.nombreGenerico}</p>
                    <p class="card-text">$ ${elemento.precio}</p>
                    <button id="agregar${elemento.nombreComercial}" class="btn btn-success btn-success-agregar">Agregar al carrito <i class="bi bi-bag-plus"></i></button>      
                 </div> `
            displayCoincidencias.appendChild(displayCoincidenciasItem);


            //CORREGIR :PONGO TÍTULO? RESULTADOS DE BUSQUEDA

            // Agregar productos
            const botonAgregar = document.getElementById(`agregar${elemento.nombreComercial}`)
            botonAgregar.addEventListener(`click`, () => {
                agregarMedicamento(elemento.nombreComercial)
            })
        }
    })
    //si no ponen nada o si no hay coincidencias: 
    if ((buscadorMedicamentos.value === '') || displayCoincidencias.innerHTML === '') {
        displayCoincidencias.innerHTML = `<h4 class="p-4">Lo siento, no hay coincidencias para ese producto.</h4>`
    }
}

//  funcion para que el buscador vaya para arriba
const irArriba = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

btnBuscadorMedicamentos.onclick = () => {
    irArriba();
    filtrar();
}

buscadorMedicamentos.onkeydown = () => {
    irArriba();
    filtrar();
}


//slider
const slider = document.getElementById("slider")
const images = ["slideportada1.jpg", "slideportada2.jpg", "slideportada3.jpg"]
let indexImages = 0
const cambiarImg = function () {
    slider.src = `./images/${images[indexImages]}`
    if (indexImages < 2) {
        indexImages++
    } else {
        indexImages = 0
    }
}
cambiarImg();
setInterval(cambiarImg, 3000)


const slideManualDerecho = document.getElementById('slideManualDerecho')
const slideManualIzquierdo = document.getElementById('slideManualIzquierdo')

slideManualDerecho.addEventListener('click', () => {
    cambiarImg()
})
slideManualIzquierdo.addEventListener('click', () => {
    cambiarImg()
})

//array carro de compras inicial
const carroCompras = [];


//funcion si carro de compras esta vacio
const siCarritoVacio = () => {
    if (carroCompras.length === 0) {
        contenedorCarroCompras.innerHTML = '';
        contenedorCarroCompras.innerHTML += `<h4>Tu carrito de compras está vacío.</h4>`
        localStorage.removeItem('carroCompras')
    }
}


// funcion para mostrar productos
const productsContainer = document.getElementById("productsContainer");

const productos = '../json/productos.json';
fetch(productos)
    .then(response => response.json())
    .then(item => {
        item.forEach(element => {
            let card = document.createElement("div")
            card.classList.add("card")
            card.style = "width: 18rem;"
            card.innerHTML = `
                <img src="${element.imagen}" class="card-img-top" alt="Imagen ilustrativa del medicamento ${element.nombreComercial}">
                <div class="card-body">
                    <h5 class="card-title ">${element.nombreComercial}</h5>
                    <p class="card-text">${element.nombreGenerico}</p>
                    <p class="card-text card-text--price">$ ${element.precio}</p>
                    <p class="card-text card-text--cuotas">3 cuotas sin interés de $ ${(element.precio/3).toFixed(2)}</p>
                    <button id="agregar${element.nombreComercial}" class="btn btn-success btn-success-agregar">Agregar al carrito <i class="bi bi-bag-plus"></i></button>      
                </div>  `
            productsContainer.appendChild(card)

            // boton "Agregar" que agrega productos
            const botonAgregar = document.getElementById(`agregar${element.nombreComercial}`)
            botonAgregar.addEventListener(`click`, () => {
                agregarMedicamento(element.nombreComercial)


            })
        })
    })
    .catch(error => console.log(error))



//funcion para actualizar carrito
const actualizarCarrito = (array) => {
    contenedorCarroCompras.innerHTML = `` //para reinicializarlo

    array.forEach(element => {
        const div = document.createElement('div')
        div.className = ('productosEnElCarrito')
        div.innerHTML = `
        <img src="${element.imagen}" class="productosCarrito-item productosCarrito-img" alt="Imagen ilustrativa del medicamento ${element.nombreComercial}">
    <p class="productosCarrito-item">${element.nombreComercial}</p>
    <p class="productosCarrito-item">$ ${element.precio}</p>
    <div class="productosCarrito-item btn-container">    
        <button id="btnDash${element.nombreComercial}" type="button" class="btn "><i class="bi bi-dash-circle btn-signo"></i></button>       
        <p class="numero-cantidad">${element.cantidad}</p>
        <button id="btnPlus${element.nombreComercial}" type="button" class="btn "><i class="bi bi-plus-circle btn-signo"></i></button>
    </div>
    <button id="eliminar${element.nombreComercial}" class="productosCarrito-item"><i class="bi bi-trash3"></i></button>
    `
        contenedorCarroCompras.appendChild(div)

        // boton "eliminar" productos
        const botonEliminar = document.getElementById(`eliminar${element.nombreComercial}`)
        botonEliminar.addEventListener("click", () => eliminarMedicamento(element.nombreComercial))

        // boton para sumar cantidad
        const btnPlus = document.getElementById(`btnPlus${element.nombreComercial}`)
        btnPlus.addEventListener("click", () => agregarMedicamento(element.nombreComercial))

        //boton para restar cantidad
        const btnDash = document.getElementById(`btnDash${element.nombreComercial}`)
        btnDash.addEventListener("click", () => restarUnidad(element.nombreComercial))


        // para guardar los datos en el local storage
        localStorage.setItem('carroCompras', JSON.stringify(carroCompras));
        if (carroCompras.length === 0) {
            localStorage.removeItem('carroCompras')
        }

        //para reiniciar si selecciono boton vaciarCarrito o finalizarCompra si no hay items en el carro
        siNoHizoCompra.innerHTML = ''; 
        // siNoHizoNingunaCompra.innerHTML = ''; 
    })


    //mostrar numero de elementos en el icono de compras
    const contadorCarroCompras = document.getElementById(`contadorCarroCompras`)
    contadorCarroCompras.innerText = array.length

    //mostrar el precio total inicial
    const precioTotal = document.getElementById(`precioTotal`)
    const precioTotalCalculo = array.reduce((acumulador, element) => acumulador + element.cantidad * element.precio, 0).toFixed(2)
    precioTotal.innerText = precioTotalCalculo

    //mostrar el precio con descuento
    const precioConDescuento = document.getElementById(`precioConDescuento`)
    const precioTotalCalculoConDescuento = (precioTotalCalculo - precioTotalCalculo * 0.2).toFixed(2)
    precioConDescuento.innerText = precioTotalCalculoConDescuento

    //mostrar el precio final
    const precioFinal = document.getElementById(`precioFinal`)
    precioFinal.innerText = precioTotalCalculoConDescuento

    //mostrar precio final en 3 cuotas
    const precioEnCuotas = document.getElementById(`precioEnCuotas`)
    precioEnCuotas.innerText = (precioTotalCalculoConDescuento / 3).toFixed(2)

    // //mostrar valor de un pago y tres cuotas en el formulario final
    // const tarjetaCuotas = document.getElementById(`tarjetaCuotas`)
    // tarjetaCuotas.innerHTML = ``;
    // //una cuota
    // const option = document.createElement('option');
    // option.value = "unaCuota";
    // option.text = `1 pago sin interés de $ ${precioTotalCalculoConDescuento}`
    // //tres cuotas
    // const option2 = document.createElement('option');
    // option2.value = "tresCuota";
    // option2.text = `3 pagos sin interés de $ ${(precioTotalCalculoConDescuento / 3).toFixed(2)}`
    // tarjetaCuotas.append(option, option2);
}

// para obtener la info del local storage
document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('carroCompras')) {
        const almacenados = JSON.parse(localStorage.getItem('carroCompras'))
        for (items of almacenados)
            carroCompras.push(items);
    }
    console.log(carroCompras)
    actualizarCarrito(carroCompras)
})

// funcion para eliminar medicamento 
const eliminarMedicamento = medicamentoABorrar => {
    const medicamento = carroCompras.find(element => element.nombreComercial === medicamentoABorrar);
    const indice = carroCompras.indexOf(medicamento);
    carroCompras.splice(indice, 1);

    console.log(carroCompras)
    siCarritoVacio()
    actualizarCarrito(carroCompras)
}

//funcion para vaciar el carro de compras
const vaciarCarrito = () => {
    carroCompras.length = 0
    actualizarCarrito(carroCompras)
    siCarritoVacio()
    localStorage.removeItem('carroCompras')
}

const vaciarCarroCompras = document.getElementById(`vaciarCarroCompras`)
vaciarCarroCompras.addEventListener("click", vaciarCarrito)

// funcion para agregar medicamento
const agregarMedicamento = medicamentoAAgregar => {
    //primero: veo si ya hay coincidencias -- sumo cantidades
    const siYaExiste = carroCompras.some(element => element.nombreComercial === medicamentoAAgregar)
    if (siYaExiste) {
        carroCompras.map(element => {
            element.nombreComercial === medicamentoAAgregar && element.cantidad++;
        })
    } else {
        //segundo: agrego el medicamento
        const medicamento = medicamentosEnVenta.find(element => element.nombreComercial === medicamentoAAgregar);
        carroCompras.push(medicamento);
        console.log(carroCompras);
    }

    Toastify({
        text: `Se ha agregado a tu carro de compras: ${medicamentoAAgregar}`,
        duration: 1500,
        style: {
            background: "linear-gradient(to right, #58974f, hsla(113, 31%, 45%, 0.8))",
        },
    }).showToast()
    actualizarCarrito(carroCompras)
}

// funcion para restar unidad de medicamentos 
const restarUnidad = (medicamentoARestar) => {
    const siYaExiste = carroCompras.some(element => element.nombreComercial === medicamentoARestar)
    if (siYaExiste) {
        carroCompras.map(element => {
            if (element.nombreComercial === medicamentoARestar) {
                element.cantidad > 1 ? element.cantidad-- : element.cantidad = 1
            }
        })
    }
    actualizarCarrito(carroCompras)
}


//abrir y cerrar modal y setTimeOut
const botonCierreModal = document.getElementById("botonCierreModal")
const modalItem = document.getElementById("modalItem")
const aparecerModal = () => {
    modalItem.classList.add('modalActivo')
}
setTimeout(aparecerModal, 5000)

const cerrarModal = () => {
    modalItem.classList.remove('modalActivo')
}
botonCierreModal.addEventListener("click", cerrarModal)

// abrir y cerrar carro compras off-canvas
const botonCarroCompras = document.getElementById("botonCarroCompras");
const carritoOffCanvas = document.getElementById("carritoOffCanvas");
const botonCierreOffCanvas = document.getElementById("botonCierreOffCanvas");

const abrirOffCanvas = () => {
    carritoOffCanvas.classList.toggle('offCanvasActivo');
    siCarritoVacio();
   
}

const cerrarOffCanvas = () => {
    carritoOffCanvas.classList.remove('offCanvasActivo');
}

botonCarroCompras.addEventListener("click", abrirOffCanvas);
botonCierreOffCanvas.addEventListener("click", cerrarOffCanvas);


//INICIAR Y FINALIZAR DE LA COMPRA

const botonIniciarCompra = document.getElementById('botonIniciarCompra')
const checkout = document.getElementById('checkout')
const siNoHizoCompra = document.getElementById('siNoHizoCompra')
siNoHizoCompra.innerHTML = ''; //para reiniciar

botonIniciarCompra.addEventListener("click", () => {
    if (carroCompras.length === 0) {
        siNoHizoCompra.innerHTML = ''; //para reiniciar
        const tituloNoHayCompra = document.createElement('tituloNoHayCompra')
        tituloNoHayCompra.classList.add('siNoHizoCompra--title')
        tituloNoHayCompra.innerHTML = `<h5>No ha seleccionado ningún producto para comprar.</h5>`
        siNoHizoCompra.appendChild(tituloNoHayCompra)
        localStorage.removeItem('carroCompras')
    } else {
        cerrarOffCanvas()
        actualizarCarrito(carroCompras)
         window.location.href = "../pages/finalizarCompra.html"
    }
})

// //boton finalizar compra
// const botonFinalizarCompra = document.getElementById('botonFinalizarCompra')
// const siNoHizoNingunaCompra = document.getElementById('siNoHizoNingunaCompra')
// botonFinalizarCompra.addEventListener('click', () => {

//     if (carroCompras.length === 0) {
//         siNoHizoNingunaCompra.innerHTML = ''; //para reiniciar
//         const tituloNoHayCompra = document.createElement('tituloNoHayCompra')
//         tituloNoHayCompra.classList.add('siNoHizoCompra--title')
//         tituloNoHayCompra.innerHTML = `<h5>No ha seleccionado ningún producto para comprar.</h5>`
//         siNoHizoNingunaCompra.appendChild(tituloNoHayCompra)
//         localStorage.removeItem('carroCompras')

//     } else {
//         vaciarCarrito()
//         Swal.fire({
//             icon: 'success',
//             title: 'Tu pago se ha realizado con Éxito!',
//             showConfirmButton: false,
//             timer: 2500
//         })
//     }
// })


//CORREGIR FINAL DE CARRO