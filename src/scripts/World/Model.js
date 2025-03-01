import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Model
{
    constructor(_sourcesName, _currentAnimation)
    {
        this.currentAnimation = _currentAnimation

        this.experience =       new Experience()
        this.scene =            this.experience.scene
        this.time =             this.experience.time
        this.debug =            this.experience.debug
        this.resources =        this.experience.resourcesModels
        this.source =           this.resources.items[_sourcesName]
        this.sourceModel =      this.resources.sources.find(obj => obj.name == _sourcesName)
        this.modelPosition =    this.sourceModel.position
        this.modelRotation =    this.sourceModel.rotation

        if (this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder(_sourcesName)
            this.debugFolder.close()
        }

        this.setModel()
        // this.setAnimation()
    }

    setModel()
    {
        this.model = this.source.scene
        this.model.scale.set(this.sourceModel.scale, this.sourceModel.scale,
            this.sourceModel.scale)
        this.model.position.x = this.modelPosition[0]
        this.model.position.z = this.modelPosition[1]
        this.model.position.y = this.modelPosition[2]

        this.model.rotation.x = (this.modelRotation[0] * Math.PI)
        this.model.rotation.z = (this.modelRotation[1] * Math.PI)
        this.model.rotation.y = (this.modelRotation[2] * Math.PI)

        this.scene.add(this.model)

        this.model.traverse((child) => child.castShadow = (child instanceof THREE.Mesh))

        // Debug
        if (this.debugFolder)
            {
                this.debugFolder
                    .add(this.model.position, 'x')
                    .name('PositionX')
                    .min(- 100)
                    .max(100)
                    .step(0.001)

                this.debugFolder
                    .add(this.model.position, 'z')
                    .name('PositionZ')
                    .min(- 100)
                    .max(100)
                    .step(0.001)
                
                this.debugFolder
                    .add(this.model.position, 'y')
                    .name('PositionY')
                    .min(- 100)
                    .max(100)
                    .step(0.001)
                
                this.debugFolder
                    .add(this.model.rotation, 'x')
                    .name('rotationX')
                    .min(- 6.3)
                    .max(6.3)
                    .step(0.001)

                this.debugFolder
                    .add(this.model.rotation, 'z')
                    .name('rotationZ')
                    .min(- 6.3)
                    .max(6.3)
                    .step(0.001)
                
                this.debugFolder
                    .add(this.model.rotation, 'y')
                    .name('rotationY')
                    .min(- 6.3)
                    .max(6.3)
                    .step(0.001)
            }
    }
    setAnimation()
    {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        this.animation.actions = {}

        for (let i = 0; i < this.source.animations.length; i++) {
            const animation = this.source.animations[i]
            this.animation.actions[animation.name] = this.animation.mixer.clipAction(animation)
        }
        
        this.animation.actions.current = this.animation.actions[this.currentAnimation]
        this.animation.actions.current.play()
        // this.playAnimation('Survey')

        // Debug 
        // if (this.debug.active)
        // {
        //     const debugObject = {}

        //     for (let i = 0; i < this.source.animations.length; i++) {
        //         const animationName = this.source.animations[i].name
        //         debugObject[`play${animationName}`] = () => this.animation.play(animationName)
        //         this.debugFolder.add(debugObject, `play${animationName}`)
        //     }
        //     debugObject.stopAnimation = () => this.stopAnimation()
        //     this.debugFolder.add(debugObject, 'stopAnimation')
        // }
    }
    playAnimation(name) {
        const newAction = this.animation.actions[name]
        const oldAction = this.animation.actions.current

        newAction.reset()
        newAction.play()
        newAction.crossFadeFrom(oldAction, 1)

        this.animation.actions.current = newAction
        this.currentAnimation = newAction
    }
    stopAnimation() {
        this.animation.mixer.stopAllAction()
    }
    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}