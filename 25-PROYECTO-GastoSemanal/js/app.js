//  variables
const formulario = document.querySelector('#agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')

// eventos

addEventListener()
function addEventListener(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
}

// clases
class Presupuesto{
    constructor(presupuesto){

        this.presupuesto = Number(presupuesto)
        this.restante = Number(presupuesto)
        this.gastos = []
    }

    nuevoGasto(gasto){
    this.gastos = [... this.gastos, gasto]
    this.calcularRestante()
    }

    calcularRestante(){
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad , 0 )
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id){
        this.gastos = this.gastos.filter( gasto => gasto.id !== id)
        console.log(this.gastos)
        this.calcularRestante()
    }
}

class UI {
    insertarPresupuesto(cantidad){
        // extrayendo el valor
        const { presupuesto , restante } = cantidad

        // insertando en el html
        document.querySelector('#total').textContent = presupuesto
        document.querySelector('#restante').textContent = restante

    }

    imprimirAlerta(mensaje, tipo){
         // crear el div
         const divMensaje = document.createElement('div')
         divMensaje.classList.add('text-center', 'alert')

         if(tipo === 'error'){
             divMensaje.classList.add('alert-danger')
         } else {
             divMensaje.classList.add('alert-success')
         }

         //mensje de error
         divMensaje.textContent = mensaje

         // agragar en el html
         document.querySelector('.primario').insertBefore(divMensaje, formulario)

         //quitarlo 
         setTimeout(() => {
             divMensaje.remove()
         },3000)
    }

    mostrarGastos(gastos){ 

        this.limpiarHTML() // elimina el html previo

        //iterar sobre los gastos
        gastos.forEach( gasto => {
            const { cantidad, nombre, id } = gasto

            // crear el LI
            const nuevoGasto = document.createElement('li')
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center'
            nuevoGasto.dataset.id = id

            // agregar el html del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge bagde-primary bagde-pill"> $${cantidad} </span>`

            // boton para borar 
            const btnBorrar = document.createElement('button')
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto')
            btnBorrar.innerHTML = 'Borrar &times;'
            btnBorrar.onclick = () => {
                eliminarGasto(id)
            }
            nuevoGasto.appendChild(btnBorrar)

            // agregar al html
            gastoListado.appendChild(nuevoGasto)
        })
    }

    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild)
        }
    }

    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante
    }

    comprobarPresupuesto(preupuestoObj){
        const { presupuesto , restante } = preupuestoObj
        
        const restanteDiv = document.querySelector('.restante')
        // comprobar %25

        if ( (presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning')
            restanteDiv.classList.add('alert-danger')
        } else if ( (presupuesto / 2) > restante ) {
            restanteDiv.classList.remove('alert-success')
            restanteDiv.classList.add('alert-warning')
        } else {
            restanteDiv.classList.remove('alert-danger', ' alert-warning')
        }

        // si el total es 0 o menor
        if(restante <= 0){
            ui.imprimirAlerta('el presupuesto se ha agotado', 'error')
            formulario.querySelector('button[type="submit"]').disabled = true
        }
    }
}

// instanciar 
const ui = new UI()
let presupuesto;

// funciones

function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('Cual es tu presupuesto?')

     
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload()
    }

    // presupuesto valido 
    presupuesto = new Presupuesto(presupuestoUsuario) 

    console.log(presupuesto)

    ui.insertarPresupuesto(presupuesto)
}

// anadir gasto
function agregarGasto(e){
    e.preventDefault()

    // leer los datos del formulario
    const nombre = document.querySelector('#gasto').value
    const cantidad = Number(document.querySelector('#cantidad').value)

    // validar
    if(nombre === '' || cantidad === ''){
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error')

        return;

    } else if (cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta('NO ES UN MONTO VALIDO', 'error')

        return;
    }

    //generar objeto con el gasto
    const gasto = { nombre , cantidad , id: Date.now()} 

    // anade nuevo gasto
    presupuesto.nuevoGasto( gasto )

    // mensaje de correcto  
    ui.imprimirAlerta('Gasto agregado correctamente')

    // imprimir los gastos 
    const { gastos , restante } = presupuesto
    ui.mostrarGastos(gastos)
    ui.actualizarRestante(restante)
    ui.comprobarPresupuesto(presupuesto)

    // reinicia el formulario
    formulario.reset()
}


function eliminarGasto(id){
    presupuesto.eliminarGasto(id)
    const {gastos, restante} = presupuesto
    ui.mostrarGastos(gastos)
    ui.actualizarRestante(restante)
    ui.comprobarPresupuesto(presupuesto)
}