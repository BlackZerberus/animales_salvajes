//imports de clase de cada animal
import Aguila from "./classes/aguila.js"
import Leon from "./classes/leon.js"
import Oso from "./classes/oso.js"
import Lobo from "./classes/lobo.js"
import Serpiente from "./classes/serpiente.js"

//instanciamos la funcion generadora
const id = generarId()

//objeto que actuara como base de datos
const registroAnimal = {}

//funcion encargada de almacenar objetos de animales, para lo cual pide un id( con el que se identificara cada objeto registrado
//con su respectivo card), el objeto conteniendo el animal y el objeto que actuara como base de datos
const registrarAnimal = (id, animal, registro) => {
    registro += registro[id] = animal  
}


//funcion encargada de obtener los datos del formulario y luego validarlos y llamar a almacenarAnimal en caso de exito
// o en caso de error desplegar un alert con un mensaje
const agregarAnimal = async () => {
    const json = await (await fetch('../../animales.json')).json()
    const nombre = document.getElementById("animal").value
    const edad = document.getElementById("edad").value
    const comentarios = document.getElementById("comentarios").value
    const img = json.animales.find(animal => animal.name === nombre).imagen
    const sonido = json.animales.find(animal => animal.name === nombre).sonido


    if(validar(nombre, edad, comentarios)) {
        const animal = instanciarAnimal({nombre, edad, img, comentarios, sonido})
        const animales = document.getElementById("Animales")
        almacenarAnimal(animal, animales)
        limpiarFormulario()
    }
    else {
        alert("Datos no validos, por favor revisar!")
    }
}

//funcion encargada de instanciar y devolver un objeto hijo de la clase animal, dependiendo del tipo de animal(nombre)
//pasado por parametro
const instanciarAnimal = (animal) => {
    const {nombre, edad, img, comentarios, sonido} = animal
    
    const reg = {
        Leon: new Leon(nombre, edad, img, comentarios, sonido),
        Lobo: new Lobo(nombre, edad, img, comentarios, sonido),
        Oso: new Oso(nombre, edad, img, comentarios, sonido),
        Serpiente: new Serpiente(nombre, edad, img, comentarios, sonido),
        Aguila: new Aguila(nombre, edad, img, comentarios, sonido)
    }
    return reg[nombre]
}


//funcion encargada de llamar al metodo correcto, puesto que cada animal tiene un sonido distinto(metodo unico)
//para lo cual se pide de parametro su nombre y su objeto.
const sonidoAnimal = (animal) => {
    const reg = {
        Leon: animal.Rugir,
        Lobo: animal.Aullar,
        Oso: animal.Gruñir,
        Serpiente: animal.Sisear,
        Aguila: animal.Chillar
    }
    reg[animal.nombre](reproductor, animal.sonido)
}


//funcion encargada de dibujar un elemento card y mostrarla dentro de un div contenedor.
//Para diferenciar una card de otra, se hace uso de la funcion generadora para obtener ids unicos, los cuales
//se agregaran como atributo "id" de la card, ademas de adicionalmente llamar a la funcion que agregara los datos
//en el registro animal.
const almacenarAnimal = (animal, container) => {
    const ID = id.next().value
    container.innerHTML += `<div class='card mx-2' id='${ID}'>
                                <img class='card-img-top img-fluid' src='assets/imgs/${animal.img}' data-toggle="modal" data-target="#exampleModal"></<img>
                                <div class='card-body'>
                                    <button class='btn btn-secondary btn-sm'><i class="fas fa-volume-up"></i></button>
                                </div>
                            </<div>`
                            
    registrarAnimal(ID, animal, registroAnimal)
}

//funcion encargada de mostrar en el modal la info del animal correspondiente
//al cual se le ha hecho click en la foto. Para tal efecto solicita el objeto del animal en cuestion, 
//el cual esta previamente almacenado en registroAnimal
const mostrarInfo = (animal) => {
    const modal = document.getElementById("exampleModal")
    modal.innerHTML =   `<div class="modal-dialog modal-dialog-centered w-25" role="document">
                            <div class="modal-content bg-dark text-white text-center">
                                <div class="modal-body">
                                    <img src='assets/imgs/${animal.img}' class='img-fluid pb-3'></img>
                                    <p>${animal.edad}</p>
                                    <h6>Comentarios</h6>
                                </div>
                                <div class='modal-footer d-flex justify-content-center'>
                                    <p>${animal.comentarios}</p>
                                </div>
                            </div>
                        </div>`
}

//funcion asyncrona que carga la imagen preview del animal a ingresar
const cargarImagen = async() => {
    const json = await (await fetch('../../animales.json')).json()
    const divPreview = document.getElementById("preview")
    const nombre = json.animales.find(animal => animal.name === document.getElementById("animal").value)
    divPreview.innerHTML = `<img src='assets/imgs/${nombre.imagen}' class='img-thumbnail'></img>`
}

//funcion encargada de verificar el evento click de cada card individual de un animal.
//dependiendo del elemento que haya provocado el evento click, llamara a una de las funciones almacenadas
//en el objeto opciones, los cuales de momento solo son dos: activar el sonido si el click viene del boton
// o del icono(I) dentro de este o desplegar la info en el modal si el click viene de la imagen.
const asignarMultimedia = (evento) => {
    const opciones = {
        'BUTTON': () => {
            const animal = registroAnimal[evento.target.parentNode.parentNode.id];
            sonidoAnimal(animal);
        },
        'I': () => {
            const animal = registroAnimal[evento.target.parentNode.parentNode.parentNode.id];
            sonidoAnimal(animal);
        },
        'IMG': () => {
            const animal = registroAnimal[evento.target.parentNode.id];
            mostrarInfo(animal);
        } 
    }
    //una vez obtenemos el objeto funcion correspondiente, lo llamamos con ()
    opciones[evento.target.nodeName]()
}

//funcion reproductor de sonido encargada de reproducir el sonido adecuado en base al parametro sonido entregado
const reproductor = (sonido) => {
    const audio = document.getElementById("player")
    audio.src = `assets/sounds/${sonido}`
    audio.load()
    audio.play()
}
//generador de ids
function  *generarId()  {
    let id = 0
    while(true) {
        yield id++
    }
}

//funcion encargada de limpiar el formulario al ingresar un registro exitoso.
const limpiarFormulario = () => {
    document.getElementById("animal").selectedIndex = 0
    document.getElementById("edad").selectedIndex = 0
    document.getElementById("comentarios").value = ""
}

//funcion encargada de validar que los datos sean validos
const validar = (nombre, edad, comentarios) => {
    return (nombre !== 'Seleccione un animal' && edad !== "Seleccione un rango de años" && comentarios !== "")
}

//iife
(() => {
    //boton del formulario que llama a agregarAnimal al evento click
    const btn = document.getElementById("btnRegistrar")
    btn.addEventListener('click', agregarAnimal)
    //cada vez que el elemento opcion cambie, cargara la imagen del animal correspondiente
    const selector = document.getElementById("animal")
    selector.addEventListener("change", cargarImagen)
    //cada vez que haya un click en una card, asignarMultimedia se encargara de revisar que hacer
    const divAnimales = document.getElementById('Animales')
    divAnimales.addEventListener('click', asignarMultimedia)
})()