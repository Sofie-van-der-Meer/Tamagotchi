import * as THREE from 'three'
import Experience from "./Experience";

export default class Manupulation {
    constructor() {
        this.experience = new Experience()
        this.listOfcolorCheckboxes = document.querySelectorAll('.inputColor')

        this.isGroupsReady()
        this.setEvents()  

    }
    isGroupsReady() {
        const allGroupsReady = this.experience.renderers.renderer3.scene.children.every(sceneChild => {
            if (sceneChild instanceof THREE.Group) {
                return (
                    sceneChild.children.length > 0 &&
                    sceneChild.children.some(child => child.name == 'device')
                );
            }
            return true;
        })
        if (allGroupsReady) {
            this.sceneObjects = this.experience.renderers.renderer3.scene.children
        } else {
            requestAnimationFrame(this.isGroupsReady.bind(this))
        }
    }

    getMesh(_meshName) {
        let foundMesh = null

        this.sceneObjects.some(sceneChild => {
            if (sceneChild instanceof THREE.Group) {
                const mesh = sceneChild.children.find(child => child.name == _meshName)

                if (mesh) {
                    foundMesh = mesh
                }
            } 
        })
        if (foundMesh) {
            return foundMesh
        }

    }
    setEvents() {
        this.listOfcolorCheckboxes.forEach(box => {
            box.addEventListener('click', () => {
                const cover = this.getMesh('cover')

                let hex;
                switch (box.dataset.color) {
                    case '#B41C1C':
                        hex = 0xB41C1C
                        break;
                    case '#8C8C8C':
                        hex = 0x8C8C8C
                        break;
                    case '#F4F4F4':
                        hex = 0xF4F4F4
                        break;
                    case '#000000':
                        hex = 0x000000
                        break;
                    case '#6A4C9C':
                        hex = 0x6A4C9C
                        break;
                    default:
                        break;
                }                
                cover.material.color.set(hex)
            })
        })
    }
}
