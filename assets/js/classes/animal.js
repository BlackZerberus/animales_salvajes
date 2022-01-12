
//superclase
class Animal {
    
    constructor(nombre, edad, img, comentarios, sonido) {
        //atributos privados
        let _nombre = nombre
        let _edad = edad
        let _img = img
        let _comentarios = comentarios
        let _sonido = sonido

        //getters
        this.getNombre = () => _nombre
        this.getEdad = () => _edad
        this.getImg = () => _img
        this.getSonido = () => _sonido 
        this.getComentarios = () => _comentarios

        //setters
        this.setComentarios = (comentarios) => { _comentarios = comentarios }
    }

    get nombre() {
        return this.getNombre()
    }

    get edad() {
        return this.getEdad()
    }

    get img() {
        return this.getImg()
    }

    get sonido() {
        return this.getSonido()
    }

    get comentarios() {
        return this.getComentarios()
    }

    set comentarios(comentarios) {
        this.setComentarios(comentarios) 
    }
}

//hacemos la clase exportable
export default Animal