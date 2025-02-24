import Experience from '../Experience.js'
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
        this.environment = new Environment()
    }

    update()
    {
        if (this.fox) this.fox.update()
    }
}