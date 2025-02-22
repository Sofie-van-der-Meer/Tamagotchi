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
        this.height = window.innerHeight
        this.width = window.innerWidth - 8 // 0.5rem aka 0.5 * 16px would be a variable

        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    }
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0
    }
}