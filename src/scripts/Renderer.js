import * as THREE from 'three'
import Experience from './Experience.js'
import Sizes from './Utils/Sizes.js'
import Camera from './Camera.js'

export default class Renderer
{
    constructor(_canvas)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.canvas = _canvas
        this.sizes = new Sizes(this.canvas)
        this.camera = new Camera(this.canvas, this.sizes)

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        })
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#F4F4F4')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}