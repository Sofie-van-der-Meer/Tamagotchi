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
        // let this.targetPosition

        if (this.canvas.dataset.camera == 'Perspective') 
        {
            this.targetPosition = new THREE.Vector3(0, 2, -7)
            this.setControls()
        } 
        else if (this.canvas.dataset.camera == 'Orthographic') 
        {
            this.targetPosition = new THREE.Vector3(20, 20, 0)
            // this.setMouseMove()
        }
        else if (this.canvas.dataset.camera == 'OrthographicBig') 
        {
            this.targetPosition = new THREE.Vector3(-20, -20, 0)
            // this.setMouseMove()
        }

        this.instance.position.set(this.targetPosition.x, this.targetPosition.y + 7, this.targetPosition.z + 7)
        this.instance.lookAt(this.targetPosition)
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

    setMouseMove() {
        this.startPosition = this.instance.position
        this.cursor = {}
        this.cursor.x = this.startPosition.x
        this.cursor.y = this.startPosition.y
        console.log(this.startPosition, this.cursor.x, this.cursor.y)

        this.canvas.addEventListener('mousemove', (event) => {
        if (this.cursor.x == 0) {
            this.cursor.x += this.startPosition.x + ((event.clientX / this.sizes.width - 0.5) * 0.1)
        } else {
            this.cursor.x = ((event.clientX / this.sizes.width - 0.5) * 0.1)
        }
        if (this.cursor.y == 0) {
            this.cursor.y = this.startPosition.x + ((event.clientY / this.sizes.height - 0.5) * 0.1)
        } else {
            this.cursor.y += - ((event.clientY / this.sizes.height - 0.5) * 0.1)
        }
        console.log(this.cursor.x, this.cursor.y)
        })
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        if (this.controls) this.controls.update()
        if (this.cursor &&
            this.cursor.x != 0 &&
            this.cursor.y != 0
        ) {
            this.instance.position.x = this.cursor.x 
            this.instance.position.y = this.cursor.y 
            this.instance.lookAt(this.targetPosition)
        }
    }
}