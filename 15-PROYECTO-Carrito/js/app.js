// variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

registrarEventListeners()
function registrarEventListeners (){
    // cuando agregas un curso presionando "agregar carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // eliminar eventos del carrito
    carrito.addEventListener('click', eliminarCurso)

    // vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',() => {
        articulosCarrito =[]  //reseteamos el arreglo 
        limpiarHTML()  //eliminamos todo el HTML
    } )
}


// funciones
function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}

// elimina un curso del carrito 
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        
        let cursoId = e.target.getAttribute('data-id')

        // eliminar el arreglo por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        
        carritoHTML()  //iterar sobre el carrito y mostrar su HTML
    }}

// leer el contenido del html al que hicimos click y extraer la info del curso

function leerDatosCurso(curso){
    // console.log(curso)

    // crear objeto con el contenido del curso actual
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
        
    }
    
    //recisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //actualizamos la cantidad
        let cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;   // retorna el objeto actualizado
            } else {
                return curso;      //retorna los objetos que no estan dulicados
            }
        })
    } else {
        // agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso]

    }




    console.log(articulosCarrito)

    carritoHTML()
}


//muestra el carrito de compras en el html
function carritoHTML(){

    limpiarHTML()

    // recorre el carrito y genera el HTML. la posicion de los td es import
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr');
        row.innerHTML = `               
            <td>                   
                <img src="${imagen}", width="100"
            </td>
            <td>${titulo} </td>
            <tb> ${precio}</td>
            <td> ${cantidad}</td>
            <td> 
                <a href='#' class="borrar-curso" data-id='${id}'> X  </a>
            </td>
            `;
        // agrega el HTML en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// elimia los cursos del tbody
function limpiarHTML () {
    // forma lenta
    // contenedorCarrito.innerHTML = ''

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}