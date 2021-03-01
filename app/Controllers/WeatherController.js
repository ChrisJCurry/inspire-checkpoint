
import { ProxyState } from '../AppState.js'
import weatherService from '../Services/WeatherService.js'
function _drawWeather() {
    if (!ProxyState.currentWeather || ProxyState.currentWeather != null) {
        let currWeather = ProxyState.currentWeather;
        let template = ""
        let currWeatherInfo = currWeather.weather.map(c => c.icon)
        let currWeatherIcon = "http://openweathermap.org/img/wn/" + currWeatherInfo + "@2x.png"

        template += /*html*/`
        <div onclick="app.weatherController.toggleTemps()" class="no-select">
            <img id="weather-icon" class="weather-shadow">
            <h3>Current: ${parseFloat((currWeather.main.temp.toFixed(2)))}${ProxyState.currentWeatherType}</h3>
            <h4>Feels like: ${parseFloat((currWeather.main.feels_like.toFixed(2)))}${ProxyState.currentWeatherType}</h4>
        </div>
        `
        document.getElementById("weather-app").innerHTML = template;
        document.getElementById("weather-icon").src = currWeatherIcon
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