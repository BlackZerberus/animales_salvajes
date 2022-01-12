//importamos la superclase
import Animal from "./animal.js"

//creamos la clase y su herencia
class Leon extends Animal {
    
    constructor(nombre, edad, img, comentarios, sonido) {
        super(nombre, edad, img, comentarios, sonido)
    }

    Rugir(reproductor, sonido){
        console.log("rugir")
        reproductor(sonido)
    }


}

export default Leon