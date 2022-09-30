//buscador de medicamentos

const displayCoincidencias = document.getElementById('displayCoincidencias');
const buscadorMedicamentos = document.getElementById('buscadorMedicamentos');
const btnBuscadorMedicamentos = document.getElementById('btnBuscadorMedicamentos')

const filtrar = () => {
    displayCoincidencias.innerHTML = ''; //para reiniciar
    const texto = buscadorMedicamentos.value.toLowerCase();

    medicamentosEnVenta.forEach((elemento) => {
        let nombreIngresado = elemento.nombreComercial.toLowerCase();

        if (nombreIngresado.indexOf(texto) >= 0) {
            console.log(nombreIngresado.indexOf(texto))
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
            displayCoincidencias.appendChild(displayCoincidenciasItem)

            // boton "Agregar" que agrega productos
            const botonAgregar = document.getElementById(`agregar${elemento.nombreComercial}`)
            botonAgregar.addEventListener(`click`, () => {
                agregarMedicamento(elemento.nombreComercial)
            })
        }

        // else  {
        //      displayCoincidencias.innerHTML = `<h4 class="p-4">Lo siento, no hay coincidencias para ese producto <i class="bi bi-emoji-frown"></i>`
        // }
    })
    //si no ponen nada 
    buscadorMedicamentos.value === "" && (displayCoincidencias.innerHTML = `<h4 class="p-4">Lo siento, no hay coincidencias para ese producto <i class="bi bi-emoji-frown"></i>`)
}

btnBuscadorMedicamentos.onclick = () => {
    filtrar();
}


//array carro de compras inicial
const carroCompras = []


// funcion para mostrar productos
const productsContainer = document.getElementById("productsContainer");

function mostrarProductos(items) {
    items.forEach(element => {
        let card = document.createElement("div")
        card.classList.add("card")
        card.style = "width: 18rem;"
        card.innerHTML = `
                <img src="${element.imagen}" class="card-img-top" alt="Imagen ilustrativa del medicamento ${element.nombreComercial}">
                <div class="card-body">
                    <h5 class="card-title ">${element.nombreComercial}</h5>
                    <p class="card-text">${element.nombreGenerico}</p>
                    <p class="card-text">$ ${element.precio}</p>
                    <button id="agregar${element.nombreComercial}" class="btn btn-success btn-success-agregar">Agregar al carrito <i class="bi bi-bag-plus"></i></button>      
                </div>  `
        productsContainer.appendChild(card)

        // boton "Agregar" que agrega productos
        const botonAgregar = document.getElementById(`agregar${element.nombreComercial}`)
        botonAgregar.addEventListener(`click`, () => {
            agregarMedicamento(element.nombreComercial)
        })
    })
}

mostrarProductos(medicamentosEnVenta)


//funcion para mostrar carrito
const mostrarCarrito = (array) => {
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

        // boton "Eliminar" productos
        const botonEliminar = document.getElementById(`eliminar${element.nombreComercial}`)
        botonEliminar.addEventListener("click", () => eliminarMedicamento(element.nombreComercial))

        // boton suma cantidad
        const btnPlus = document.getElementById(`btnPlus${element.nombreComercial}`)
        btnPlus.addEventListener("click", () => agregarMedicamento(element.nombreComercial))

        //boton resta cantidad
        const btnDash = document.getElementById(`btnDash${element.nombreComercial}`)
        btnDash.addEventListener("click", () => restarUnidad(element.nombreComercial))

        // para guardar los datos en el local storage    
        function guardarLocal(clave, valor) {
            localStorage.setItem(clave, (valor));
        }
        guardarLocal('carroCompras', JSON.stringify(carroCompras));
    })


    //mostrar numero de elementos en el icono de compras
    const contadorCarroCompras = document.getElementById(`contadorCarroCompras`)
    contadorCarroCompras.innerHTML = array.length

    //mostrar el precio total inicial
    const precioTotal = document.getElementById(`precioTotal`)
    precioTotal.innerHTML = carroCompras.reduce((acumulador, element) => acumulador + element.calcularPrecioSegunUnidades(), 0).toFixed(2)

    //mostrar el precio con descuento
    const precioConDescuento = document.getElementById(`precioConDescuento`)
    precioConDescuento.innerHTML = carroCompras.reduce((acumulador, element) => acumulador + element.calcularConDescuento(), 0).toFixed(2)

    //mostrar el precio final
    const precioFinal = document.getElementById(`precioFinal`)
    precioFinal.innerHTML = carroCompras.reduce((acumulador, element) => acumulador + element.calcularConDescuento(), 0).toFixed(2)
}


// para obtener la info del local storage
document.addEventListener('DOMContentLoaded', () => {
    const carroCompras = []
    if (localStorage.getItem('carroCompras')) {
        const almacenados = JSON.parse(localStorage.getItem('carroCompras'))
        for (items of almacenados)
            carroCompras.push(items);
    }
    console.log(carroCompras)
    mostrarCarrito(carroCompras)
})


// funcion para eliminar medicamento 
const eliminarMedicamento = medicamentoABorrar => {
    const medicamento = carroCompras.find(element => element.nombreComercial === medicamentoABorrar);
    const indice = carroCompras.indexOf(medicamento);
    carroCompras.splice(indice, 1);
    console.log(carroCompras)
    mostrarCarrito(carroCompras)
}

//funcion para vaciar el carro de compras
const vaciarCarroCompras = document.getElementById(`vaciarCarroCompras`)
vaciarCarroCompras.addEventListener("click", () => {
    Swal.fire({
        title: '¿Estás seguro de que quieres vaciar tu carro de compras?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: ' Cancelar',
        confirmButtonText: 'Si, eliminar items!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tus items han sido removidos de tu carro de compras!',
                showConfirmButton: false,
                timer: 1500
            })
            carroCompras.length = 0
            mostrarCarrito(carroCompras)
        }
    })
})

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
        text: "Se ha agregado a tu carro de compras!",
        duration: 2500,
        style: {
    background: "linear-gradient(to right, #58974f, hsla(113, 31%, 45%, 0.8))",
  },
    }).showToast()
    mostrarCarrito(carroCompras)
}

//borrar con dash
const restarUnidad = (medicamentoARestar) => {
    const siYaExiste = carroCompras.some(element => element.nombreComercial === medicamentoARestar)
    if (siYaExiste) {
        carroCompras.map(element => {
            if (element.nombreComercial === medicamentoARestar) {
                element.cantidad > 1 ? element.cantidad-- : element.cantidad = 1
            }
        })
    }
    mostrarCarrito(carroCompras)
}


//FINALIZACION DE LA COMPRA

// const botonFinalizarCompra = document.getElementById('botonFinalizarCompra')
// botonFinalizarCompra.addEventListener("click", () => {

// //ventana modal. css: formulario
//     carroCompras.length = 0
//     mostrarCarrito(carroCompras)    
// })