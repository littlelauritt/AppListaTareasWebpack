import { Tarea } from "../classes/index";
import { listaTareas } from "../index";


//  ---------- VARIABLES COGIDAS DEL DOMHTML ----------  //
// Cojo el input donde escribimos las tareas
const nuevaTarea = document.querySelector('.new-todo');
// Cojo el padre de las li, que es el elemento ul
const ul = document.querySelector('.todo-list');
// Cojo el boton de eliminar completados del HTML
const borrarCompletados = document.querySelector('.clear-completed');
// Cojo la lista donde se encuentran los botones que realizan los filtros
const filtros = document.querySelector('.filters');
// Cojo cada uno de los filtros para poder recorrer el vector
const filtrosMarco = document.querySelectorAll('.filtro');
// Cojo el footer para ocultarlo cuando no hay ninguna tarea
const footer = document.querySelector('.footer');
// Cojo el strong donde se muestran el numero de tareas pendientes
let numeroTareasPend = document.querySelector('strong');

//  ---------- FUNCIONES ----------  //
// Funcion que sirve paraa que cuando escribamos una tarea se renderice en el HTML
export const anadirtareaHTML = (tarea) => {
    const tareasHTML = `
    <li class="${(tarea.completado) ? 'completed' : ''}" data-id="${tarea.id}">
						<div class="view">
							<input class="toggle" type="checkbox" "${(tarea.completado) ? 'checked' : ''}">
							<label>${tarea.tarea}</label>
							<button class="destroy"></button>
						</div>
						    <input class="edit" value="Create a TodoMVC template">
					</li>
                `
                ul.innerHTML += tareasHTML;
}

// Funcion que muestra y oculta el footer en funcion de si hay tareas o no
 export const mostrarFooter = () => {
    // Si hay algo en la lista de tareas lo muestras y si no lo ocultas
    (listaTareas.listaTareas.length !== 0) ? (footer.classList.remove('hidden')) : (footer.classList.add('hidden'));
}
// Funcion que muestra y oculta el numero de elementos pendientes en un span dentro del footer
export const mostrarPendientes = () => {
    const contarPendientes = listaTareas.listaTareas.filter((tarea) => tarea.completado === false);
    numeroTareasPend.textContent = contarPendientes.length;
}
// Funcion que muestra el boton de eliminar completadas cuando hay tareas ya hechas
export const mostrarBorrarCompletadas = ( () =>{
    const hayCompletadas = listaTareas.listaTareas.filter( (tarea) => tarea.completado === true);
    (hayCompletadas.length > 0) ? (borrarCompletados.classList.remove('hidden')) : (borrarCompletados.classList.add('hidden'));
})

//  ---------- EVENTOS ----------  //
// Evento que al pulsar la tecla enter a??ade la tarea
nuevaTarea.addEventListener('keyup', (evento) => {
    // Hacemos una condicion que ser?? si pulsa la tecla Enter y si hay contenido dentro del input de tipo texto y le a??adimos el metodo trim para eliminar espacios al inicio
    if (evento.key === 'Enter' && nuevaTarea.value.trim().length > 0){
        // Creo una nueva instancia a la tarea
        const nuevaTareaCreada = new Tarea(nuevaTarea.value);
        // A??adimos la nueva tarea al vector
        listaTareas.anadirTarea(nuevaTareaCreada);
        // A??adimos la tarea al HTML
        anadirtareaHTML(nuevaTareaCreada);
        // Borramos el contenido del input de texto
        nuevaTarea.value = '';
    }
    mostrarFooter();
    mostrarPendientes();
    mostrarBorrarCompletadas();
})
// Evento que marca los elementos como completados y da funcionalidad al bot??n de borrar
ul.addEventListener( 'click', ( evento ) => {
    // Hacemos click en una de las partes del texto y tenemos que saber donde pulsamos, tenemos una propiedad en el target que se llama localName que nos va a decir donde pulsar,
    // podremos pulsar en el checkbox, label o boton de eliminar, pues tendremos que hacer condiciones segun donde pulsemos.
    const nombreElemento    = evento.target.localName;
    // Tengo que coger la li donde hago click para que cuando pulsemos el boton de eliminar borre toda la tarea
    const tareaSeleccionada = evento.target.parentElement.parentElement;
    // Cojo el id ??nico de las tareas, este id est?? en el atributo de HTML data-id
    const tareaId           = tareaSeleccionada.dataset.id;
    // Una vez que tenemos toda la informaci??n haremos un condicional, si se pulsa en el check se llama al m??todo marcarCompletado y
    // si se pulsa el bot??n de elimminar se llama al m??todo de borrar la tarea
    if( nombreElemento === 'input' ){
        listaTareas.marcarCompletado( tareaId );
        // En el console vemos que va cambiando la propiedad completado pero no tacha la tarea, para hacer eso tenemos que jugar con las clases y a??adirle y quitarle la clase completed al li
        tareaSeleccionada.classList.toggle( 'completed' );        
    }
    if( nombreElemento === 'button' ){
        listaTareas.eliminarTarea( tareaId );
        ul.removeChild( tareaSeleccionada );
    }
    mostrarFooter();
    mostrarPendientes();
    mostrarBorrarCompletadas();
});
// Eliminar completados
borrarCompletados.addEventListener('click', () => {
    // Llamamos al m??todo de la clase eliminar completados
    listaTareas.eliminarCompletados();
    // Recorremos la ul donde est??n los li, esta es un vector y con la propiedaad children puedo sacar el numero de elementos
    // Tendremos que recorrer el vector al reves desde el ultimo elemento al primero, porque si lo recorremos al inicio y al final como se borra un elemento las posiciones del vector ya no coinciden
    for ( let index = ul.children.length - 1; index >= 0; index-- ){
        // Guardamos lo que hay en cada una de las posiciones en una variable
        const elemento = ul.children[ index ];
        // Hago un condicional en el que le digo si contiene la clase completed, si es verdad lo elimino de la lista
        if( elemento.classList.contains('completed')){
            elemento.remove();
        } 
    }
    mostrarFooter();
    mostrarPendientes();
    mostrarBorrarCompletadas();
});

// Evento para seleccionar los elementos completados y no completados
filtros.addEventListener('click', (evento) => {
    // Recorremos las a y le quitamos el cuadrado cuando pulsamos en cualquier lado de la ul
    filtrosMarco.forEach( (filtro) => filtro.classList.remove('selected') );
    // Ponemos el marco en el elemento seleccionado
    evento.target.classList.add('selected');
    // Ponemos el texto que tiene el elemento selecciondo en una variable y despues hacemos un switch para cada uno de los casos
    const textoFiltroSeleccionado = evento.target.text;
    // Podriamos a??adir una medida de seguridad  es que si pulso donde no hay elemento, osea, la constante texto est?? vacia que salga del evento
    if (!textoFiltroSeleccionado){return}
    // Tenemos que recorrer el vector para saber cuales est??n completadas y cuales no
    for (elemento of ul.children){
        
        // El filtro del switch se lo asigna y se quite, adem??s nos servir?? para que funcione el boton de tareas ya que mostrar?? todas ellas
        elemento.classList.remove('hidden');
        // Seg??n el boton que pulse ocultar?? las completadas o las que no lo est??n
        switch (textoFiltroSeleccionado) {
        case 'Pendientes':
            // Comprobamos si el elemento seleccionado tiene la clase "completed", si es as?? le asignamos la clase del css hiden que oculta los elementos con el display none
            if (elemento.classList.contains('completed')){
                elemento.classList.add('hidden');
            }
            break;
            case 'Completadas':
                // Comprobamos si el elemento seleccionado tiene la clase "completed", si es as?? le asignamos la clase del css hiden que oculta los elementos con el display none
                if(!elemento.classList.contains('completed')){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});
// A??ado el evento que al hacer doble clic sobre una label automaticamente la pueda modificar a??adiendo el atributo contentEditable ="true"
ul.addEventListener('dblclick', (evento) => {
    const nombreElemento = evento.target.localName;
    const tareaSeleccionada = evento.target.parentElement.parentElement;
    const tareaId = tareaSeleccionada.dataset.id;
    // Accedemos a la label que hemos pulsado y le ponemos el contenteditable = true
    if (nombreElemento === 'label'){
        const etiquetaSeleccionada = tareaSeleccionada.children[0].children[1];
        etiquetaSeleccionada.setAttribute('contenteditable',true);
        etiquetaSeleccionada.setAttribute('style', 'border: 1px solid #000');
        // Una vez que editamos la etiqueta ponemos un evento para que cuando pulsemos la tecla enter deje de ser editable
        etiquetaSeleccionada.addEventListener('keypress', (evento) => {
            if(evento.key === 'Enter'){
                // Tenemos que coger el valor que hay dentro de la etiqueta y guardarlo en una constante para modificarlo en el vector
                const textoLabel = etiquetaSeleccionada.innerHTML;
                etiquetaSeleccionada.setAttribute('contenteditable', false);
                etiquetaSeleccionada.removeAttribute('style');
                // Tendr??amos que modificar la tarea que hemos editado usando su id
                listaTareas.listaTareas.forEach( (tarea) => {
                    // Lo que hay en el atributo es texto y lo que hay en la clase es un numero
                    if(tarea.id == tareaId) {
                        tarea.tarea = textoLabel;
                        // Faltar??a actualizar el locaL Storage
                        listaTareas.guardarLocalStorage();

                    }
                });
            }
        });
    }
});