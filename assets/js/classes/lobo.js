//importamos la superclase
import Animal from "./animal.js"

//creamos la clase y su herencia
class Lobo extends Animal {
    
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido)
    }

    Aullar(reproductor, sonido){
        console.log("aullar")
        reproductor(sonido)
    }


}

export default Lobo