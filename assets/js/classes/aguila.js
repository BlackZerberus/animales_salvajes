//importamos la superclase
import Animal from "./animal.js"

//creamos la clase y su herencia
class Aguila extends Animal {
    
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido)
    }

    Chillar(reproductor, sonido){
        console.log("chillar")
        reproductor(sonido)
    }


}

export default Aguila