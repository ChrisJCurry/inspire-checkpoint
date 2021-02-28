
import {ProxyState} from '../AppState.js'
import weatherService from '../Services/WeatherService.js'
function _drawWeather() {
    if(!ProxyState.currentWeather || ProxyState.currentWeather != null) {
        let currWeather = ProxyState.currentWeather;
        let template = ""
    
        template += /*html*/`
        <div onclick="app.weatherController.toggleTemps()" class="no-select">
            <h3>${parseFloat((currWeather.main.temp.toFixed(2)))}${ProxyState.currentWeatherType}</h3>
            <p>Feels like: ${parseFloat((currWeather.main.feels_like.toFixed(2)))}${ProxyState.currentWeatherType}</p>
        </div>
        `
        document.getElementById("weather-app").innerHTML = template;
    }
    
}

export default class TodosController {
    constructor() {
        ProxyState.on("currentWeather", _drawWeather)
        ProxyState.on("currentWeatherType", _drawWeather)
    }

    toggleTemps() {
        weatherService.toggleTemps()
    }

}