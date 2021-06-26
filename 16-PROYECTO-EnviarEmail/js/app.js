 // variables
const btnEnviar = document.querySelector('#enviar')
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail')


// variables para campos
const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


eventListeners()
function eventListeners(){
    // cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp)

    // campos del formulario
    email.addEventListener('blur', validarFormulario)
    asunto.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)

    // reinicia el form
    btnReset.addEventListener('click', resetearFormulario);

    //enviar email
    formulario.addEventListener('submit', enviarEmail)
}




//  funciones
function iniciarApp(){
    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

// valida el formulario
function validarFormulario(e){


        if(e.target.value.length > 0) {

            //elimina los errores
            const error = document.querySelector('p.error');
            if(error){
            error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('todos los campos son obligatorios');
        }
        if(e.target.type === 'email') {
            if(er.test(e.target.value)){
                // elimina los errores
                const error = document.querySelector('p.error');
                if(error){
                error.remove();
                }
                e.target.classList.remove('border', 'border-red-500');
                e.target.classList.add('border', 'border-green-500');
            } else {
                e.target.classList.remove('border', 'border-green-500');
                e.target.classList.add('border', 'border-red-500');
                mostrarError('email no valido')
            }
        }
        if(er.test(email.value) !== '' && asunto.value !== '' && mensaje.value !== ''){
            btnEnviar.disabled = false
            btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
        }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error')

    const errores = document.querySelectorAll('.error')
    if(errores.length === 0){
       formulario.insertBefore(mensajeError, document.querySelector('.mb-10'))
    }
}

// enviar email
function enviarEmail(e){
    e.preventDefault()
    
    //mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //despues de 3 segundos ocultar el spinner
    setTimeout(( ) => {
        spinner.style.display = 'none'
        // mensaje que se envio ok
        const parrafo = document.createElement('p')
        parrafo.textContent = 'el mensaje se envio correctamente';
        parrafo.classList.add('border', 'font-bold', 'text-white', 'bg-green-500', 'p-2', 'my-10', 'text-center', 'uppercase');

        //inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner)
        setTimeout(() => {
            parrafo.remove()
            resetearFormulario(e)
            iniciarApp()
        }, 2000)
    }, 3000 );
}

// funcion que resetea el formulario
function resetearFormulario(e){
    e.preventDefault()
    formulario.reset();

    iniciarApp()
}