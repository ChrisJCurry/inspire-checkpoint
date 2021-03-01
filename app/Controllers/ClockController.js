
import { ProxyState } from '../AppState.js'
import clockService from '../Services/ClockService.js'
function _drawClock() {
    let results = ""
    let clockId = setInterval(function () {
        results = _getCurrentTime()
        ProxyState.currentTime = results
        let newDay = new Date()
        //console.log(newDay)
        if (newDay.getDate == ProxyState.currentDate.getDate) {
            console.log("same day still")
        } else {
            _getDate()
        }
        let clockElem = document.getElementById("clock")
        clockElem.innerHTML = `<h1 class="title-font text-white stroke">${ProxyState.currentTime}</h1>`
    }, 1000)


}

function _getCurrentTime() {
    let d = new Date();
    let hours = _fixLowNumber(d.getHours())
    let minutes = _fixLowNumber(d.getMinutes())
    let seconds = _fixLowNumber(d.getSeconds())

    return `${hours}:${minutes}:${seconds}`
}

function _getDate() {
    let d = new Date();
    let month = _fixLowNumber(d.getMonth() + 1)
    let day = _fixLowNumber(d.getDate())
    let year = d.getFullYear()

    console.log(month, day, year)
    ProxyState.currentDate = d
    document.getElementById("date").innerHTML = `<h1 class="title-font text-white stroke">${month}/${day}/${year}</h1>`;
}

function _fixLowNumber(n) {
    return (n < 10 ? '0' : '') + n
}

export default class ClockController {
    constructor() {
        //ProxyState.on("currentTime", _drawClock)
        _drawClock()
        _getDate()
    }
}