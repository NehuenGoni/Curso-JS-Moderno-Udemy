import * as UI from './interfaz.js';

class API {
    constructor(artista, cancion){
        this.artista = artista;
        this.cancion = cancion;

        this.consultarAPI()
    }   

    consultarAPI(){
        const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;

        Spinner()

        fetch(url)
                .then( respuesta => respuesta.json() )
                .then( resultado => {
    
                    if(resultado.lyrics){
                    const { lyrics } = resultado
                    UI.divResultado.textContent = lyrics;
                    UI.headingResultado.textContent = `Letra de la cancion: ${this.cancion} de ${this.artista}`;
                    UI.formularioBuscar.reset()
                    }else{

                        UI.divMensajes.textContent = 'La cancion no existe, prueba con otra busqueda';
                        UI.divMensajes.classList.add('error')

                        setTimeout(() => {
                            UI.divMensajes.textContent = '';
                            UI.divMensajes.classList.remove('error')
                            UI.formularioBuscar.reset()
                        }, 3000)
                    }
                })
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

    UI.divMensajes.appendChild(divSpinner)
}

export default API;

