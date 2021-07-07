// variables
const formulario = document.querySelector('#formulario')
let listaTweets = document.querySelector('#lista-tweets')
let tweets = []

// event listeners
eventListeners()

function eventListeners(){
    //cuando un usuario agrega un tweet
    formulario.addEventListener('submit', agregarTweet)

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []
        console.log(tweets)
        crearHTML()
    });
}

   


// funciones
function agregarTweet(e) {

    e.preventDefault();

    // donde el usuario escribe
    const tweet = document.querySelector('#tweet').value
    
    
    // valiacion
    if(tweet === ''){
        mostrarError('no puede ir vacio')

        return;   //evita que se siga ejecutando codigo
    }

    const tweetOBJ = {
        id: Date.now(),
        tweet  // es igual a tweet : tweet
    }

    //anadir al arreglo de tweets
    tweets = [... tweets, tweetOBJ]

    // una vez que lo agrego, voy a crear el HTML
    crearHTML()


    //reiniciar el formulario
    formulario.reset()
}


// mostrar mensje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error
    mensajeError.classList.add('error')

    //insertar el contenido del mensaje en html
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError)


    // elimina el alerta
    setTimeout(() => {
        mensajeError.remove()
    }, 3000)

    }
 
// muestra listado de tweets
function crearHTML() {
    
    limpiarHTML()

    if( tweets.length > 0 ){
        
        tweets.forEach( tweet => {
            // agregar btn de elimnar
            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.textContent = 'x'

            // funcion de eliminar
            btnEliminar.onclick =() => {
                borrarTweet(tweet.id)
            }

            // crear HTML
            const li = document.createElement('li');

            //anadir el texto
            li.innerText = tweet.tweet;

            // asignar el boton
            li.appendChild(btnEliminar)

            // insertarlo en el HTML
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage()
}

//limpair el HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }

}

//agrega los tweets a localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// eliminar el tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id)
    crearHTML()

}