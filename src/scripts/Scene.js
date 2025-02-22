import * as THREE from 'three'
import Camera from './Camera'
import Renderer from './Renderer'
import Environment from './World/Environment'


export default
class Scene {
    constructor(_name) {
        this.name = _name
        this.container = document.querySelector(`#${_name}`)
        this.scene = new THREE.Scene()
        // this.camera = new Camera(this.container)
        this.renderer = new Renderer()
        this.meshes = []

        this.setScene()
    }
    setScene() {
        // this.camera.setPosition(0, 1, 2)
        // this.camera.lookAt(0, 0, 0)
        const camera = new Camera(this.container)
        this.scene.add(camera.camera)
        const light = new Environment()
        this.scene.add(light.sunLight)

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: 'red'});
        const mesh = new THREE.Mesh(geometry, material);

        this.scene.add(mesh)
    }
    update() {

    }
}
