import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor(_canvas, _sizes)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.canvas = _canvas
        this.sizes = _sizes

        if (this.debug.active)
            {
                this.debugFolder = this.debug.ui.addFolder(this.canvas.id)
            }
            
        this.setInstance()
        this.setControls()
        
    }

    setInstance()
    {
        if (this.canvas.dataset.camera == 'Perspective') {
            this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        } else if (this.canvas.dataset.camera == 'Orthographic') {
            this.instance = new THREE.OrthographicCamera(-3, 3, 4, -4, 0.1, 100)
        }else if (this.canvas.dataset.camera == 'OrthographicBig') {
            this.instance = new THREE.OrthographicCamera(-2.5, 3.5, 4, -4, 0.1, 100)
        }
            this.instance.position.set(0, 10, 1)
            this.scene.add(this.instance)


        // Debug
        if (this.debugFolder)
            {
                this.debugFolder
                    .add(this.instance.position, 'x')
                    .name('cameraPositionX')
                    .min(- 180)
                    .max(180)
                    .step(0.001)
                
                this.debugFolder
                    .add(this.instance.position, 'y')
                    .name('cameraPositionY')
                    .min(- 180)
                    .max(180)
                    .step(0.001)
                
                this.debugFolder
                    .add(this.instance.position, 'z')
                    .name('cameraPositionZ')
                    .min(- 180)
                    .max(180)
                    .step(0.001)
            }
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        if (this.controls) this.controls.update()
    }
}