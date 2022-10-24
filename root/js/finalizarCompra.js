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


//array carro de compras inicial
const carroCompras = [];

//funcion para actualizar carrito
const actualizarCarrito = (array) => {
    contenedorCarroCompras.innerHTML = `` //para reinicializarlo

    array.forEach(element => {
        const div = document.createElement('div')
        div.className = ('productosEnElCarrito')
        div.innerHTML = `
       
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
        siNoHizoNingunaCompra.innerHTML = '';
    })

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

    //mostrar valor de un pago y tres cuotas en el formulario final
    const tarjetaCuotas = document.getElementById(`tarjetaCuotas`)
    tarjetaCuotas.innerHTML = ``;
    //una cuota
    const option = document.createElement('option');
    option.value = "unaCuota";
    option.text = `1 pago sin interés de $ ${precioTotalCalculoConDescuento}`
    //tres cuotas
    const option2 = document.createElement('option');
    option2.value = "tresCuota";
    option2.text = `3 pagos sin interés de $ ${(precioTotalCalculoConDescuento / 3).toFixed(2)}`
    tarjetaCuotas.append(option, option2);
}

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

// funcion para eliminar medicamento 
const eliminarMedicamento = medicamentoABorrar => {
    const medicamento = carroCompras.find(element => element.nombreComercial === medicamentoABorrar);
    const indice = carroCompras.indexOf(medicamento);
    carroCompras.splice(indice, 1);

    console.log(carroCompras)
    siCarritoVacio()
    actualizarCarrito(carroCompras)
}

//funcion si carro de compras esta vacio
const siCarritoVacio = () => {
    if (carroCompras.length === 0) {
        contenedorCarroCompras.innerHTML = '';
        contenedorCarroCompras.innerHTML += `<h4>Tu carrito de compras está vacío.</h4>`
        localStorage.removeItem('carroCompras')
    }
}


//funcion para vaciar el carro de compras
const vaciarCarrito = () => {
    carroCompras.length = 0
    actualizarCarrito(carroCompras)
    siCarritoVacio()
    localStorage.removeItem('carroCompras')
}


//boton para continuar comprando
const btnContinuarComprando = document.querySelector('.continuar-comprando')
btnContinuarComprando.onclick = () => {
    window.location.href = '../index.html'
}

//boton finalizar compra
const botonFinalizarCompra = document.getElementById('botonFinalizarCompra')
const siNoHizoNingunaCompra = document.getElementById('siNoHizoNingunaCompra')
botonFinalizarCompra.addEventListener('click', (e) => {
    if (carroCompras.length === 0) {
        siNoHizoNingunaCompra.innerHTML = ''; //para reiniciar
        const tituloNoHayCompra = document.createElement('tituloNoHayCompra')
        tituloNoHayCompra.classList.add('siNoHizoCompra--title')
        tituloNoHayCompra.innerHTML = `<h5>No ha seleccionado ningún producto para comprar.</h5>`
        siNoHizoNingunaCompra.appendChild(tituloNoHayCompra)
        localStorage.removeItem('carroCompras')
    } else {
        e.preventDefault()
        vaciarCarrito()
        setTimeout(() => {
            window.location.href = '../index.html'
        }, 3000);
        ejecutarSweetAlert()
    }
})

//funcion para ejecutar mensaje final
const ejecutarSweetAlert = () => {
    let timerInterval
    Swal.fire({
        icon: 'success',
        title: 'Tu pago se ha realizado con Éxito!',
        html: 'Se cerrará en <b></b> milisegundos.',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}