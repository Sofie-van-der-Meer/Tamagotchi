import * as THREE from 'three'
import Debug from './Utils/Debug.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import Renderer from './Renderer.js'
import World from './World/World.js'

import sourcesModels from './sourcesModels.js'
import Manupulation from './Manupulation.js'
let instance = null;

export default class Experience {
    constructor(
        // _canvasHtmlElement
    ) {
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
        this.renderers = []

        // Options
        
        this.canvas1 = document.getElementById('canvasOne')
        this.canvas2 = document.getElementById('canvasTwo')
        this.canvas3 = document.getElementById('canvasThree')

        // if (_canvasHtmlElement.id == 'canvasOne') {
        //     this.canvas1 = _canvasHtmlElement
        // }
        // if (_canvasHtmlElement.id == 'canvasTwo') {
        //     this.canvas2 = _canvasHtmlElement
        // }
        // if (_canvasHtmlElement.id == 'canvasThree') {
        //     this.canvas3 = _canvasHtmlElement
        // }
        
        if (this.canvas1 != undefined) {
            this.renderers.renderer1 = new Renderer(this.canvas1)
            this.renderers.renderer1.sizes.on('resize', () => this.resize())
        }
        if (this.canvas2 != undefined) {
            this.renderers.renderer2 = new Renderer(this.canvas2)
            this.renderers.renderer2.sizes.on('resize', () => this.resize())
        }
        if (this.canvas3 != undefined) {
            this.renderers.renderer3 = new Renderer(this.canvas3)
            this.renderers.renderer3.sizes.on('resize', () => this.resize())
            // this.setSetupWhenRenderersReady()
        }
        
        this.setSetupWhenRenderersReady()
        
        // Time tick event
        this.time.on('tick', () => this.update())
        
        
    }
    
    setSetupWhenRenderersReady() {
        const allRenderersReady = this.renderers.every(renderer => {
            return (
                renderer && 
                renderer.scene && 
                renderer.scene.children.length > 0 && 
                // renderer.scene.children[4] && 
                // renderer.scene.children[4].children > 0 && 
                renderer.scene.children.every(child => { return child.children.length > 0}));
        })
        if (allRenderersReady) {
            this.manupulation = new Manupulation()
        } else {
            requestAnimationFrame(this.setSetupWhenRenderersReady)
        }
    }

    resize()
    {
        if (this.renderers.renderer1) this.renderers.renderer1.camera.resize()
        if (this.renderers.renderer2) this.renderers.renderer2.camera.resize()
        if (this.renderers.renderer3) this.renderers.renderer3.camera.resize()
        if (this.renderers.renderer1) this.renderers.renderer1.resize()
        if (this.renderers.renderer2) this.renderers.renderer2.resize()
        if (this.renderers.renderer3) this.renderers.renderer3.resize()
    }
    
    update()
    {
        if (this.world) this.world.update()
        if (this.renderers.renderer1) this.renderers.renderer1.camera.update()
        if (this.renderers.renderer2) this.renderers.renderer2.camera.update()
        if (this.renderers.renderer3) this.renderers.renderer3.camera.update()
        if (this.renderers.renderer1) this.renderers.renderer1.update()
        if (this.renderers.renderer2) this.renderers.renderer2.update()
        if (this.renderers.renderer3) this.renderers.renderer3.update()
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
        
        if (this.renderers.renderer1.camera.controls) this.renderers.renderer1.camera.controls.dispose()
        if (this.renderers.renderer2.camera.controls) this.renderers.renderer2.camera.controls.dispose()
        if (this.renderers.renderer3.camera.controls) this.renderers.renderer3.camera.controls.dispose()
        if (this.renderers.renderer1.instance) this.renderers.renderer1.instance.dispose()
        if (this.renderers.renderer2.instance) this.renderers.renderer2.instance.dispose()
        if (this.renderers.renderer3.instance) this.renderers.renderer3.instance.dispose()
        
        if(this.debug.active)
            this.debug.ui.destroy()
    }
}