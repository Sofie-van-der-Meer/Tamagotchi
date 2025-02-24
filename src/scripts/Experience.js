import * as THREE from 'three'
import Debug from './Utils/Debug.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import Renderer from './Renderer.js'
import World from './World/World.js'

import sourcesModels from './sourcesModels.js'
let instance = null;

export default class Experience {
    constructor() {
        // Singleton
        if(instance) return instance
        instance = this
        
        // Global access
        window.experience = this
        
        // Setup
        this.debug = new Debug()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resourcesModels = new Resources(sourcesModels)
        this.world = new World()
        
        // Options
        this.canvas1 = document.getElementById('canvasOne')
        this.canvas2 = document.getElementById('canvasTwo')
        this.canvas3 = document.getElementById('canvasThree')
        
        this.renderer1 = new Renderer(this.canvas1)
        this.renderer2 = new Renderer(this.canvas2)
        this.renderer3 = new Renderer(this.canvas3)
        
        // Resize event
        this.renderer1.sizes.on('resize', () => this.resize())
        this.renderer2.sizes.on('resize', () => this.resize())
        this.renderer3.sizes.on('resize', () => this.resize())
        
        // Time tick event
        this.time.on('tick', () => this.update())
    }
    
    resize()
    {
        this.renderer1.camera.resize()
        this.renderer2.camera.resize()
        this.renderer3.camera.resize()
        this.renderer1.resize()
        this.renderer2.resize()
        this.renderer3.resize()
    }
    
    update()
    {
        this.world.update()
        this.renderer1.camera.update()
        this.renderer2.camera.update()
        this.renderer3.camera.update()
        this.renderer1.update()
        this.renderer2.update()
        this.renderer3.update()
    }
    
    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')
        
        // Traverse the whole scene
        this.scene.traverse((child) =>
            {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
                {
                child.geometry.dispose()
                
                // Loop through the material properties
                for(const key in child.material)
                    {
                    const value = child.material[key]
                    
                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                        {
                        value.dispose()
                    }
                }
            }
        })
        
        this.renderer1.camera.controls.dispose()
        this.renderer2.camera.controls.dispose()
        this.renderer3.camera.controls.dispose()
        this.renderer1.instance.dispose()
        this.renderer2.instance.dispose()
        this.renderer3.instance.dispose()
        
        if(this.debug.active)
            this.debug.ui.destroy()
    }
}