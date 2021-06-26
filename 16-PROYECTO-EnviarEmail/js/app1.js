//Variables
const btnEnviar = document.querySelector('#enviar')
const btnReset = document.querySelector('#resetBtn')
let formulario = document.querySelector('#enviar-mail')


// variables para campos

const email = document.querySelector('#email')
const asunto = document.querySelector('#asunto')
const mensaje = document.querySelector('#mensaje')

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

eventListeners();
function eventListeners(){
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp)

    //campos del fromulario
    email.addEventListener('blur', validarFormulario)
    asunto.addEventListener('blur', validarFormulario)
    mensaje.addEventListener('blur', validarFormulario)

    //reinicia el formulario
    // btnReset.addEventListener('click', resetearFormulario);

    //eviar email
    formulario.addEventListener('submit', enviarEmail)
}


// funciones

function iniciarApp(){
    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not.allowed', 'opacity-50')
}

// validar formular
function validarFormulario(e) {
    

    if(e.target.value.length > 0) {
        // eliminar los errores
        const error = document.querySelector('p.error')
        if(error){
            error.remove()  
        }
        

        // console.log('Hay algo')
        e.target.classList.remove('border', 'border-red-500')
        e.target.classList.add('border', 'border-green-500')

    } else{
        e.target.classList.remove('border', 'border-green-500')
          e.target.classList.add('border', 'border-red-500')
          mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email') {
        // expresion regular

        if(er.test(e.target.value)){
            const error = document.querySelector('p.error')
            if(error){
                error.remove()  
            }

    
            // console.log('Hay algo')
            e.target.classList.remove('border', 'border-red-500')
            e.target.classList.add('border', 'border-green-500')
    
        } else{
            e.target.classList.remove('border', 'border-green-500')
            e.target.classList.add('border', 'border-red-500')
            mostrarError('email no valido');
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false
        btnEnviar.classList.remove('cursor-not.allowed', 'opacity-50')    
    } else{
        console.log('hay campos sin validar')
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p')
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error')

    const errores = document.querySelectorAll('.error')
    if(errores.length === 0){
        formulario.insertBefore(mensajeError, document.querySelector('.mb-10'))
    }

    
}


// enviar email
function enviarEmail(e){
    e.preventDefault();
    // mostrar sppiner

    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

  // despues de 3'' ocular el spinner y mostrar el mensaje

    setTimeout(() => {  //es igual a una vez
        
        spinner.style.display = 'none';

        // mensaje enviado correctamente
        let enviar = document.createElement('p'),
        enviar.textContent = 'el email a sido enviado',
        enviar.classList.add('text-center', 'my-10', 'bg-green-500', 'text-white', 'font-bold', 'uppercase', 'p-2')

        // inserta el parrafo antes del spinner
        formulario.insertBefore(enviar, spinner),

        setTimeout(() => {
            enviar.remove(); // elimina el mensaje de texto
            resetearFormulario();

        }, 2000);
    }, 3000 ); //cada segundo es igual a mil

    // setInterval(() => { //esta cada tres segundos se ejecuta
    //         console.log('esta funcion se ejecuta despues de 3 segundos...')
    //     }, 3000 ) //cada segundo es igual a mil 
}

// funcion resetar el formulario
function resetearFormulario(){
    formulario.reset();
    iniciarApp()
}