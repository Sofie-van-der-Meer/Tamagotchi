import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter
{
    constructor(_canvas)
    {
        super()
        this.canvas = _canvas

        // Resize event
        this.setSizes()

        window.addEventListener('resize', () =>
        {
            this.setSizes()
            this.trigger('resize')
        })
    }
    setSizes() {
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        this.height = this.canvas.clientHeight // * this.pixelRatio
        this.width = this.canvas.clientWidth // * this.pixelRatio
    }
    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0
    }
}