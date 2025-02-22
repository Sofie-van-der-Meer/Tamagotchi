import Experience from '../Experience.js'
import Mesh from './Mesh.js'
import Environment from './Environment.js'
import Model from './Model.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.resourcesModels = this.experience.resourcesModels

        this.setModels()
        this.setMeshes()
    }

    setModels() {
        this.resourcesModels.on('ready', () =>
        {
            this.device = new Model('device')
        })
    }

    setMeshes() {
        // this.grass = new Mesh('grass')
        // this.soil = new Mesh('soil')
        this.environment = new Environment()
    }

    update()
    {
        if (this.fox) this.fox.update()
    }
}