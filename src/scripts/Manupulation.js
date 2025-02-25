import Experience from "./Experience";

export default class Manupulation {
    constructor() {
        this.experience = new Experience()
        this.listOfcolorCheckboxes = document.querySelectorAll('.inputColor')

        this.setEvents()  

    }
    setEvents() {
        this.listOfcolorCheckboxes.forEach(box => {
            box.addEventListener('click', () => {
                console.log(box.dataset.color);
                this.cover = this.experience.renderers.renderer3.scene.children[4].children.find(obj => obj.name == 'cover')

                let r, g, b;
                switch (box.dataset.color) {
                    case '#B41C1C':
                        r = 180
                        g = 28
                        b = 28
                        break;
                    case '#8C8C8C':
                        r = 140
                        g = 140
                        b = 140
                        break;
                    case '#F4F4F4':
                        r = 244
                        g = 244
                        b = 244
                        break;
                    case '#000000':
                        r = 0
                        g = 0
                        b = 0
                        break;
                    case '#6A4C9C':
                        r = 106
                        g = 76
                        b = 156
                        break;
                    default:
                        break;
                }                
                this.cover.material.color.r = r
                this.cover.material.color.g = g
                this.cover.material.color.b = b
                // console.log(this.cover.material.color);
            })
        })
    }
}
