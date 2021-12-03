import { obtenerCliente, editarCliente } from './API.js'
import {mostrarAlerta, validar} from './funciones.js'
 
(function(){

    // campos del formulario 
    const nombreInput = document.querySelector('#nombre')
    const emailInput = document.querySelector('#email')
    const empresaInput = document.querySelector('#empresa')
    const telefonoInput = document.querySelector('#telefono')
    const idInput = document.querySelector('#id')


    document.addEventListener('DOMContentLoaded', async () => {
        const parametrosURL = new URLSearchParams(window.location.search)

        const idCliente = parseInt(parametrosURL.get('id'))

        const cliente = await obtenerCliente(idCliente)

        mostrarCliente(cliente)

        //submit a formulario
        const formulario = document.querySelector('#formulario')
        formulario.addEventListener('submit', validarCliente)
    })

    function mostrarCliente(cliente){
        const {nombre, id, email, empresa, telefono} = cliente

        nombreInput.value = nombre,
        empresaInput.value = empresa,
        telefonoInput.value = telefono,
        emailInput.value = email,
        idInput.value = id
    }

    function validarCliente(e){
        e.preventDefault()

        const cliente = {
            nombre: nombreInput.value,
            email: emailInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: parseInt(idInput.value)
        }
        
        if(validar(cliente)){
            //mostrar mensaje
            mostrarAlerta('Todos los campos son obligatorios')
            return
        }

        // reescribe el objeto
        editarCliente(cliente)
    }

})()