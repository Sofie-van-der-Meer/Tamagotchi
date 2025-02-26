import * as THREE from 'three'
import Experience from '../Experience.js'
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setSunLight()
        this.setAmbientLight()
        this.setRectAreaLight()
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4.5)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 10
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0
        this.sunLight.position.set(22, 50, -5.3)
        this.scene.add(this.sunLight)

        // Debug
        if(this.debugFolder)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(100)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(- 100)
                .max(100)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(- 100)
                .max(100)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(- 100)
                .max(100)
                .step(0.001)
        }
    }
    
    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight(0x404040, 9.5)
        this.scene.add(this.ambientLight)

        // Debug
        if(this.debugFolder)
        {
            this.debugFolder
                .add(this.ambientLight, 'intensity')
                .name('ambientLightIntensity')
                .min(0)
                .max(100)
                .step(0.001)
            
        }
    }

    setRectAreaLight()
    {
        this.rectAreaLight = new THREE.RectAreaLight(0x404040, 100, 10, 10)
        this.rectAreaLight.position.set(-5, -5, -2)
        this.rectAreaLight.lookAt(0, 0, 0)
        this.scene.add(this.rectAreaLight)

        // const rectAreaLightHelper = new RectAreaLightHelper(this.rectAreaLight)
        // this.rectAreaLight.add(rectAreaLightHelper)

        // Debug
        if(this.debugFolder)
        {
            this.debugFolder
                .add(this.rectAreaLight, 'intensity')
                .name('rectAreaLightIntensity')
                .min(0)
                .max(100)
                .step(0.001)

            this.debugFolder
                .add(this.rectAreaLight, 'width')
                .name('rectAreaLightWidth')
                .min(- 100)
                .max(100)
                .step(0.001)
            
            this.debugFolder
                .add(this.rectAreaLight, 'height')
                .name('rectAreaLightHeight')
                .min(- 100)
                .max(100)
                .step(0.001)

            this.debugFolder
                .add(this.rectAreaLight.position, 'x')
                .name('rectAreaLightX')
                .min(- 100)
                .max(100)
                .step(0.001)
            
            this.debugFolder
                .add(this.rectAreaLight.position, 'y')
                .name('rectAreaLightY')
                .min(- 100)
                .max(100)
                .step(0.001)
            
            this.debugFolder
                .add(this.rectAreaLight.position, 'z')
                .name('rectAreaLightZ')
                .min(- 100)
                .max(100)
                .step(0.001)
            
        }
    }
}