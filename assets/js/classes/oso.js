//importamos la superclase
import Animal from "./animal.js"

//creamos la clase y su herencia
class Oso extends Animal {
    
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido)
    }

    Gruñir(reproductor, sonido){
        console.log("gruñir")
        reproductor(sonido)
    }


}

export default Oso