
import { ProxyState } from '../AppState.js'
import backgroundService from '../Services/BackgroundService.js'
function _drawBackground() {
    let activeBackground = ProxyState.activeBackground;
    let template = ""
    template += `<img src=${activeBackground.url}></img>`
    let appElem = document.getElementById("app")
    appElem.style.backgroundImage = `url(${activeBackground.url})`
    appElem.style.backgroundRepeat = "no-repeat";
    appElem.style.backgroundSize = "cover";
    appElem.style.backgroundAttachment = "fixed";
}

export default class QuotesController {
    constructor() {
        ProxyState.on("activeBackground", _drawBackground)
    }

    getBackground() {
        backgroundService.getBackground()
    }
}