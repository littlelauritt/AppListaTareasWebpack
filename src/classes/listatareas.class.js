export class ListaTareas {
    constructor() {
        // El constructor va a ser un vector en el cual se almacenan todas las tareas que se crean e inicialmente estará vacio
        // this.listaTareas = [];
        this.cargarLocalStorage();
        // // Guardo la key del localStorage
        // this.key = 'tareas';
    }
    // El primer metodo que tiene que existir es el de añadir elementos a la lista de tareas
    anadirTarea( tarea ) {
        this.listaTareas.push( tarea );
        this.guardarLocalStorage();
    }
    // Otro metodo será eliminar el elemento seleccionado de la lista de tareas
    eliminarTarea(id) {
        this.listaTareas = this.listaTareas.filter( (tarea) => tarea.id != id);
        this.guardarLocalStorage();
    }
    // Otro metodo será el de eliminar todos los elementos que hemos completado
    eliminarCompletados() {
        // Filtraremos todos los elementos que no tengan this.completado = true
        this.listaTareas = this.listaTareas.filter( (tarea) => tarea.completado === false);
        this.guardarLocalStorage();
    }
    marcarCompletado(id) {
        //Para marcar completado tendré que recorrer el vector y comprobar cada uno de los id con el que recibiré del evento y cuando coincidan le tendo que cambiar el estado
        for(const tarea of this.listaTareas){
            if(tarea.id == id) {
                // En tarea id voy a tener un numero que es el que se crea automaticamente cuando creamos la tarea y recibiremos un id de tipo texto que estará guardado en el atributo data-id
                // Cuando pulso en el checkbox cambiará de estado (si está true a falso o al revés)
                tarea.completado = !tarea.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }
    guardarLocalStorage() {
        localStorage.setItem('tareas', JSON.stringify(this.listaTareas));
    }
    cargarLocalStorage() {
        // // Cuando cargamos datos del localStorage tenemos dos posibilidades, si no hay nada creamos un vector vacío y si hay algo cargamos los datos del local. Esto servirá para que
        // // en el constructor llamemos a esta funcion
        // if (localStorage.getItem('tareas')){
        //     this.listaTareas = JSON.parse(localStorage.getItem('tareas')); 
        // } else {
        //     this.listaTareas = [];
        // }
        this.listaTareas = (localStorage.getItem ('tareas') ) ? (JSON.parse (localStorage.getItem ('tareas') ) ) : ( [ ] );              
    }
}