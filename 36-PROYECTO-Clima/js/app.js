const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e){
    e.preventDefault();

    //Validar el formulario
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value

    if(ciudad === '' || pais === "") {
        //hubo un error
        mostrarError('Todos los campos son obligatorios')
        return;
    }

    // consular la API
    consultarAPI(ciudad, pais)
}


function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100')

    if(!alerta){

    // crear alerta
    const alerta = document.createElement('div');

    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML =`
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);
    
    // eliminar la alerta
    setTimeout(() => {
        alerta.remove()
    }, 3000)
    }
}

function consultarAPI(ciudad, pais){

    const appID = '0c4f9a070b3d7d782f4856aced261aa2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`
    
    Spinner()

    fetch(url)
        .then(respuesta => respuesta.json())
        .then( datos => {

            console.log(datos)

            limpiarHTML()
            if(datos.cod === "404" ){
                mostrarError('Ciudad no encontrada')
                return;
            }

            // imprime la respuesta en el HTML
            mostrarClima(datos)
        })
}

function mostrarClima(datos){
    const { main: {temp, temp_max, temp_min, }, name } = datos

    const centigrados = kelvinaCentigrados(temp);
    const max = kelvinaCentigrados(temp_max);
    const min = kelvinaCentigrados(temp_min);

    const nombreCiudad = document.createElement('p')
    nombreCiudad.textContent = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')

    const actual = document.createElement('p')
    actual.innerHTML = `Temp Actual: ${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl')
    
    const tempMax = document.createElement('p')
    tempMax.innerHTML = `Max: ${max} &#8451;`;
    tempMax.classList.add('text-xl')

    const tempMin = document.createElement('p')
    tempMin.innerHTML = `Min: ${min} &#8451;`;
    tempMin.classList.add('text-xl')

    const resultadoDiv = document.createElement('div')
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(tempMax)
    resultadoDiv.appendChild(tempMin)

    resultado.appendChild(resultadoDiv)
}

const kelvinaCentigrados = grados => parseInt(grados - 273.15)


function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function Spinner(){
    const divSpinner = document.createElement('div')
    divSpinner.classList.add('spinner')

    divSpinner.innerHTML = `
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    `

    resultado.appendChild(divSpinner)
}