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
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 30)
        let targetPosition

        if (this.canvas.dataset.camera == 'Perspective') 
        {
            targetPosition = new THREE.Vector3(0, 2, -2)
            this.setControls()
        } 
        else if (this.canvas.dataset.camera == 'Orthographic') 
        {
            targetPosition = new THREE.Vector3(20, 20, 0)
        }
        else if (this.canvas.dataset.camera == 'OrthographicBig') 
        {
            targetPosition = new THREE.Vector3(-20, -20, 0)
        }

        this.instance.position.set(targetPosition.x, targetPosition.y + 7, targetPosition.z + 7)
        this.instance.lookAt(targetPosition)
        this.scene.add(this.instance)

        console.log(this.instance.rotation)

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