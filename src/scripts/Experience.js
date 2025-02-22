import * as THREE from 'three'
import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'

import sourcesModels from './sourcesModels.js'
import sourcesMeshes from './sourcesMeshes.js'
import DomManupulation from './DomManupulation.js'
import makeScene from './Scene.js'
import Scene from './Scene.js'

let instance = null;

export default class Experience {
    constructor(_canvas) {
        if(instance) return instance;
        instance = this

        this.canvas = _canvas
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scenes = []
        // this.scenes.scene1 = new Scene('#scene1')
        // console.log(this.scenes.scene1);
        // const scene = new THREE.Scene() // this is wath we need!!
        // this.scene1 = makeScene(document.querySelector('scene1')).scene
        // this.scene2 = makeScene(document.querySelector('scene2')).scene
        this.resourcesModels = new Resources(sourcesModels)
        this.resourcesMeshes = sourcesMeshes
        // this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.dom = new DomManupulation()

        this.setScenes()

        this.sizes.on('resize', () => this.resize());
        this.time.on('tick', () => this.update());
    }

    setScenes() {
        this.sceneOne = new Scene('sceneOne')
        this.sceneTwo = new Scene('sceneTwo')

        this.scenes.push(this.sceneOne)
        this.scenes.push(this.sceneTwo)
    }
    
    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        // this.camera.update()
        // this.world.update()
        // this.renderer.update()
    }
    
    destroy() {
        
        this.sizes.off('resize')
        this.time.off('tick')

        this.scene.traverse( (child) => 
        {
            if (child instanceof THREE.Mesh)
            {
                child.geometry.dispose()
        
                for (const key in child.material)
                {
                    const value = child.material[key]
        
                    if (value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })
        
        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        instance = null

    }
}   