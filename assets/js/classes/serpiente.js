//importamos la superclase
import Animal from "./animal.js"

//creamos la clase y su herencia
class Serpiente extends Animal {
    
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido)
    }

    Sisear(reproductor, sonido){
        console.log("sisear")
        reproductor(sonido)
    }


}

export default Serpiente