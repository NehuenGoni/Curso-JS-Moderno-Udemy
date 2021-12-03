// Constructores

function Seguro(marca, year, tipo){
    this.marca = marca,
    this.year = year,
    this.tipo = tipo    
}

// realiza la cotizacion de los datos
Seguro.prototype.cotizarSeguro = function(){
    /*
        1- Americano 1,15
        2- Asiatico 1,05
        3- Europeo 1,35
    */

    let cantidad
    const base = 2000

    switch(this.marca){
            
        case '1': 
            cantidad = base * 1.15;
            break
        case '2':
            cantidad = base * 1.05;
            break
        case '3':
            cantidad = base * 1.35;
            break
        default:
            break
    }
        // console.log(cantidad)

    // leer el year
    const diferencia = new Date().getFullYear() - this.year

    // cada year que la diferencia es mayor, el costo va a reducirse un 3%

    cantidad -= ((diferencia * 3) * cantidad ) /100


    /*
        si el seguro es basico => + %30
        si el seguro es completo => +%50
    */

    if(this.tipo === 'basico'){
        cantidad *= 1.30 ;
    } else {
        cantidad *= 1.50
    }
    console.log(cantidad)
    return cantidad
}

function UI(){}

// llena las opc de los years
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 20

    const selectYear = document.querySelector('#year')

    for(let i = max; i > min; i-- ) {
    let option = document.createElement('option')
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option)
}}

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div')

    if(tipo === 'error'){
        div.classList.add('error')
    } else { 
        div.classList.add('correcto')
    }

    div.classList.add('mensaje', 'mt-10')
    div.textContent = mensaje

    //INSERTAR EN HTML  
    const formulario = document.querySelector('#cotizar-seguro')
    formulario.insertBefore(div, document.querySelector('#resultado'))

    setTimeout(() => {
        div.remove()
    }, 3000)
} 

UI.prototype.mostrarResultado = (seguro, total) => {

    const {marca, year, tipo} = seguro

    let textoMarca

    switch (marca) {
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }

    // crear el resultado
    const div = document.createElement('div')
    div.classList.add('mt-10')

    div.innerHTML= `
        <p class="header"> Tu Resumen </p>
        <p class="font-bold"> Marca: <span class="font-normal"> ${textoMarca} </span> </p>
        <p class="font-bold"> Year: <span class="font-normal"> ${year} </span> </p>
        <p class="font-bold"> Total: <span class="font-normal"> $${total} </span> </p>
        <p class="font-bold" > Tipo de seguro: <span class="font-normal" capitalize> ${tipo} </span> </p>
    `

    const resultadoDiv = document.querySelector('#resultado')


    // mostrar el spinner
    const spinner = document.querySelector('#cargando')
    spinner.style.display = 'block'

    setTimeout(() => {
        spinner.style.display = 'none' //borra el sipnner
        resultadoDiv.appendChild(div) // muestra el resultado
    }, 3000 )
}

// instanciarlo
const ui = new UI()


document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones() // llena el select de year
})


eventListeners()
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro')
    formulario.addEventListener('submit', cotizarSeguro )
}

function cotizarSeguro(e){
    e.preventDefault()
    
    // leer marca seleccionada
    const marca = document.querySelector('#marca').value

    // leer year seleccionada
    const year = document.querySelector('#year').value

    // leer tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value

    if( marca === '' || year === '' || tipo === '' ){
        ui.mostrarMensaje('todos los campos deben estar completos', 'error')
        return;
    }

    ui.mostrarMensaje('Realizando cotizacion', 'correto')

    //remover cotizaciones anteriores
    const resultados = document.querySelector('#resultado div')
    if( resultados != null){
        resultados.remove()
    }
    // instanciar el seguro
    const seguro = new Seguro(marca, year, tipo)
    const total = seguro.cotizarSeguro()

    // utiliza el prototype que va a cotizar el seguro

    ui.mostrarResultado(seguro, total)
}