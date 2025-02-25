import Experience from '../Experience.js'
import Environment from './Environment.js'
import Model from './Model.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.resourcesModels = this.experience.resourcesModels
        console.log(this.resourcesModels);

        this.setModels()
        this.setMeshes()
    }

    setModels() {
        this.resourcesModels.on('ready', () =>
        {
            this.device = new Model('device')
            this.icon1 = new Model('icon1')
            this.icon2 = new Model('icon2')
            this.icon3 = new Model('icon3')
            this.icon4 = new Model('icon4')
            this.icon5 = new Model('icon5')
            this.icon6 = new Model('icon6')
            this.icon7 = new Model('icon7')
            this.icon8 = new Model('icon8')
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