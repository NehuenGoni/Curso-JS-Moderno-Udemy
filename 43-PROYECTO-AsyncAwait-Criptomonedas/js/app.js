const criptomonedasSelect = document.querySelector('#criptomonedas')
const monedaSelect = document.querySelector('#moneda')
const formulario = document.querySelector('#formulario')
const resultado = document.querySelector('#formulario')

let objBusqueda = {
    moneda: '',
    criptomoneda: '',
}
// crear un promise
const obtenerCriptomonedas = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas);
})

document.addEventListener('DOMContentLoaded', () => {
    consultarCiptomonedas()
    formulario.addEventListener('submit', submitFormulario)
    criptomonedasSelect.addEventListener('change', leerValor)
    monedaSelect.addEventListener('change', leerValor)
})

async function consultarCiptomonedas(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=usd'

    // fetch(url)
    //     .then( respuesta => respuesta.json() )
    //     .then( resultado => obtenerCriptomonedas(resultado.Data))
    //     .then( criptomonedas => selectCriptomonedas(criptomonedas))

    try {
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        const criptomonedas = await obtenerCriptomonedas(resultado.Data)
        selectCriptomonedas(criptomonedas)
    } catch (error) {
        
    }
}

function selectCriptomonedas(criptomonedas){
    criptomonedas.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option);
    });
}

function leerValor(e){
    objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e){
    e.preventDefault()

    // validar el formulario
    const { moneda , criptomoneda } = objBusqueda
    if(moneda === '' || criptomoneda === ''){
        mostrarAlerta('Ambos campos son obligatorios')
        return
    }

    consultarAPI()
}

function mostrarAlerta(mensaje){
    const existrError = document.querySelector('.error')

    if(!existrError){
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('error')

        //mensaje de errror
        divMensaje.textContent = mensaje

        formulario.appendChild(divMensaje)

        setTimeout(() => {
            divMensaje.remove()
        }, 3000)
    }
}

async function consultarAPI(){
    const { moneda, criptomoneda } = objBusqueda

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    mostrarSpinner()

    // fetch(url)
    //     .then( respuesta => respuesta.json() )
    //     .then( cotizacion => {
    //         mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])
    //     })
    
    try {
        const respuesta = await fetch(url)
        const cotizacion = await respuesta.json()
        mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])
    } catch (error) {
        console.log(error)
    }
}

function mostrarCotizacionHTML(cotizacion) {

    limpiarHTML()

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;



    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `<FONT COLOR="white">El precio es <span> ${PRICE} </span></FONT>`;

    const maxDay = document.createElement('p');
    maxDay.innerHTML = `<FONT COLOR="white"> El precio maximo del dia es:<span> ${HIGHDAY} </SPAN></FONT>`;

    const MinDay = document.createElement('p');
    MinDay.innerHTML = `<FONT COLOR="white"> El precio minimo del dia es:<span> ${LOWDAY} </SPAN></FONT>`;

    const change = document.createElement('p');
    change.innerHTML = `<FONT COLOR="white"> El porcentaje de variacion en 24hs es:<span> %${CHANGEPCT24HOUR} </SPAN></FONT>`;

    const lastUpdate = document.createElement('p');
    lastUpdate.innerHTML = `<FONT COLOR="white"> Ultima actualizacion:<span> ${LASTUPDATE} </SPAN></FONT>`;

    resultado.appendChild(precio)
    resultado.appendChild(maxDay);
    resultado.appendChild(MinDay);
    resultado.appendChild(change);
    resultado.appendChild(lastUpdate);
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function mostrarSpinner(){
    limpiarHTML()

    const spinner = document.createElement('div')
    spinner.classList.add('sk-fading-circle')

    spinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `

    resultado.appendChild(spinner)
}