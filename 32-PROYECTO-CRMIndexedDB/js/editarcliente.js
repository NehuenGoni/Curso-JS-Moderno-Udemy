(function(){
    let DB
    let idCliente

    const nombreInput = document.querySelector('#nombre')
    const telefonoInput = document.querySelector('#telefono')
    const empresaInput = document.querySelector('#empresa')
    const emailInput = document.querySelector('#email')

    const formulario = document.querySelector('#formulario')

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB()

        //actualiza el registro
        formulario.addEventListener('submit', actualizarCliente)

        // verificar el id de la url
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');
        if(idCliente){
            setTimeout(() =>  {
                obtenerCliente(idCliente);
            }, 100)
        }
    })

    function actualizarCliente(e){
        e.preventDefault()

        if(nombreInput.value === '' || telefonoInput.value === '' || empresaInput.value === '' || emailInput.value === ''){
            imprimirAlerta('Todos los campos son obligatorios', 'error')
            return
        }

        // actualizar cliente
        const clienteActualizado = {
            nombre: nombreInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            email: emailInput.value,
            id: Number(idCliente)
        }

        const transaction = DB.transaction(['crm'], 'readwrite')
        const objectStore = transaction.objectStore('crm')

        objectStore.put(clienteActualizado)

        transaction.oncomplete = function(){
            imprimirAlerta('editado correctamente')

            setTimeout( () => {
                window.location.href = 'index.html'
            }, 3000)
        }

        transaction.onerror = function(){
            imprimirAlerta('error al editar', 'error')
        }
    }

    function obtenerCliente(id){
        const transaction = DB.transaction(['crm'], 'readwrite')  // puede ser 'readonly'
        const objectStore = transaction.objectStore('crm')

        const cliente = objectStore.openCursor()
        cliente.onsuccess = function(e){
            const cursor = e.target.result

            if(cursor){
                if(cursor.value.id === Number(id)){
                    llenarFormulario(cursor.value)
                }
                cursor.continue()
            }
        }
    }

    function llenarFormulario(datosCliente){
        const {nombre, telefono, empresa, email} = datosCliente

        nombreInput.value = nombre
        telefonoInput.value = telefono
        empresaInput.value = empresa
        emailInput.value = email
    }

    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function() {
            console.log('hubo un error');
        };

        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;
        };
    }

})()