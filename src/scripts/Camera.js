import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Sizes from './Utils/Sizes.js'
import Debug from './Utils/Debug.js'

export default class Camera
{
    constructor(_container)
    {
        this.container = _container
        // this.experience = new Experience()
        this.sizes = new Sizes()
        // this.scene = this.experience.scene
        // this.canvas = this.experience.canvas
        this.debug = new Debug()
        this.camera = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)

        if (this.debug.active)
            {
                this.debugFolder = this.debug.ui.addFolder('camera')
            }
            
        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        // this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.camera.position.set(-1.65, 14, 6)
        // this.scene.add(this.instance)

        // Debug
        if (this.debug.active)
            {
                this.debugFolder
                    .add(this.camera.position, 'x')
                    .name('cameraPositionX')
                    .min(- 180)
                    .max(180)
                    .step(0.001)
                
                this.debugFolder
                    .add(this.camera.position, 'y')
                    .name('cameraPositionY')
                    .min(- 180)
                    .max(180)
                    .step(0.001)
                
                this.debugFolder
                    .add(this.camera.position, 'z')
                    .name('cameraPositionZ')
                    .min(- 180)
                    .max(180)
                    .step(0.001)
            }
    }

    setControls()
    {
        this.controls = new OrbitControls(this.camera, this.container)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.camera.aspect = this.sizes.width / this.sizes.height
        this.camera.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}