import {ProxyState} from '../AppState.js'
import {sandBoxApi} from './AxiosService.js'

class WeatherService {
    constructor() {
        this.getWeather()
    }

    async getWeather() {
        try {
            const res = await sandBoxApi.get("weather/")
            ProxyState.currentWeather = res.data
        }catch(err) {
            console.error(err)
        }
    }

    toggleTemps() {
        if(ProxyState.currentWeather != null) {
            let currWeather = ProxyState.currentWeather;
            let currTemp = -1
            if(ProxyState.currentWeatherType == "K") {
                ProxyState.currentWeatherType = "C"
                currTemp = currWeather.main.temp
                currTemp = (currWeather.main.temp - 273.15)
                currWeather.main.temp = currTemp
                let currFeelsLike = currWeather.main.feels_like
                currFeelsLike = (currWeather.main.feels_like - 273.15)
                currWeather.main.feels_like = currFeelsLike
                ProxyState.currentWeather = currWeather
                return;
            } else if(ProxyState.currentWeatherType == "C") {
                ProxyState.currentWeatherType = "F"
                currTemp = currWeather.main.temp
                currTemp = (((currTemp/5)*9)+32)
                currWeather.main.temp = currTemp
                let currFeelsLike = currWeather.main.feels_like
                currFeelsLike = (((currFeelsLike/5)*9)+32)
                currWeather.main.feels_like = currFeelsLike
                ProxyState.currentWeather = currWeather
                return;
            } else if(ProxyState.currentWeatherType == "F") {
                ProxyState.currentWeatherType = "K"
                currTemp = currWeather.main.temp
                currTemp = ((((currTemp - 32)*5)/9)+273.15)
                currWeather.main.temp = currTemp
                let currFeelsLike = currWeather.main.feels_like
                currFeelsLike = ((((currFeelsLike - 32)*5)/9)+273.15)
                currWeather.main.feels_like = currFeelsLike
                ProxyState.currentWeather = currWeather
                return;
            }
        }
    }

}

const weatherService = new WeatherService()
export default weatherService; 