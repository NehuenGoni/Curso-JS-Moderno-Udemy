import * as UI from './interfaz.js';
import API from './api.js'

UI.formularioBuscar.addEventListener('submit', buscarCancion)

function buscarCancion(e){
    limpiarHTML();
    e.preventDefault();

    // obtener datos del formulario
    const artista = document.querySelector('#artista').value
    const cancion = document.querySelector('#cancion').value

    if(artista === '' || cancion === ''){
        UI.divMensajes.textContent = 'Error! Todos los campos son obligatirios'
        UI.divMensajes.classList.add('error')
    }

    setTimeout(() => {
        UI.divMensajes.textContent = ''
        UI.divMensajes.classList.remove('error')
    }, 2000)

    // consultar nuestra api

    const busqueda = new API(artista, cancion)

}

function limpiarHTML(){
    while(UI.divResultado.firstChild){
        UI.divResultado.removeChild(resultado.firstChild)
    }
}