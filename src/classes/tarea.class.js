// Vamos a tener una clase que es la tarea, esta recibirá una tarea nueva y a partir de ahi creará una serie de datos
export class Tarea {
    constructor (tarea) {
        this.tarea = tarea;   

        // Necesitamos un identificador unico para cada tarea
        this.id = new Date().getTime();
        // Necesitamos saber si las tareas están completadas o no
        this.completado = false;
        this. fecha = new Date();
    }
}