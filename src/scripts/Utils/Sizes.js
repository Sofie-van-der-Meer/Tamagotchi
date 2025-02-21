import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()

        // Resize event
        this.setSizes()

        window.addEventListener('resize', () =>
        {
            this.setSizes()
            this.trigger('resize')
        })
    }
    setSizes() {
        this.height = window.innerHeight * 0.5

        if (window.innerWidth > (window.innerHeight * 0.5) ) {
            this.width = (window.innerHeight * 0.5) * 0.7
        } else this.width = window.innerWidth * 0.5

        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    }
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0
    }
}