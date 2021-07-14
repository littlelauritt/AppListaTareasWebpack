// Importamos la clase que necesitamos
import './css/style.css';

// Importamos la clase que necesitamos
import { ListaTareas } from './classes/index';

import { anadirtareaHTML, mostrarFooter, mostrarPendientes, mostrarBorrarCompletadas } from './js/components';

//  ---------- LLAMADAS A LAS FUNCIONES ----------  //
export const listaTareas = new ListaTareas();
// Tengo que llamar a la funcion que dibuja el HTML
listaTareas.listaTareas.forEach((tarea) => anadirtareaHTML(tarea));
mostrarFooter();
mostrarPendientes();
mostrarBorrarCompletadas();