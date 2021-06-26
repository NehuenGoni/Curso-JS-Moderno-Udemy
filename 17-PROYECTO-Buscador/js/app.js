// variables
const year = document.querySelector('#year')
const marca = document.querySelector('#marca')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')

// contenedor para los resultados
const resultado = document.querySelector('#resultado')
const max = new Date().getFullYear()
const min = max - 10

// generar datos de la busqueda

const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : '',

}


// eventos
addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos)  // muestra los autos cuando carga 

    // llena las opc 
    llenarSelect()

});


// event listener para los select de busqueda

marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value

    filtrarAuto()
}) 

year.addEventListener('change', (e) => {
    datosBusqueda.year = e.target.value

    filtrarAuto()
}) 

minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = e.target.value

    filtrarAuto()
}) 

maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = e.target.value

    filtrarAuto()
}) 

puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = e.target.value

    filtrarAuto()
}) 

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value

    filtrarAuto()
}) 

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value

    filtrarAuto()
}) 

console.log(datosBusqueda)
// funciones
function mostrarAutos(autos) {
    
    limpiarHTML()

    autos.forEach( auto => {

        const {marca , modelo, year, puertas, transmision, precio, color} = auto ;
        const autoHTML = document.createElement('p')

        autoHTML.textContent = `
        Marca: ${marca} - Modelo: ${modelo} - Year:${year} - Puertas:${puertas} - Transmision:${transmision} - Precio:$ ${precio} - Color: ${color}
        `
        ;
        // insertar en el HTML
        resultado.appendChild(autoHTML)

    })


}

// limpiar el HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function llenarSelect() {
    for(let i = max;  i >= min; i--){
        const option = document.createElement('option')
        option.value = i
        option.textContent = i
        year.appendChild(option) // agrega las opc de year al select
    }

}

// funcion que filtra 

function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)
    // console.log(resultado)
    if(resultado.length){
        mostrarAutos(resultado)
    } else {
        noResultado()
    }

}

function noResultado(){
    limpiarHTML()
    
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'no hay resultados intenta de nuevo';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca
    }
    return auto;
}

function filtrarYear(auto) {

    const {year} = datosBusqueda;
    if(year){
        return auto.year === parseInt(year)
    }
    return auto;
}

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= parseInt(minimo)
    }
    return auto;
}

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= parseInt(maximo)
    }
    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    if(puertas){
        return auto.puertas == puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision == transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color == color;
    }
    return auto;
}
