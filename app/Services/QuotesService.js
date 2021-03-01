import { ProxyState } from '../AppState.js'
import { sandBoxApi } from './AxiosService.js'

let timerId = "";

class QuotesService {

    constructor() {
        this.getQuotes()
    }

    async getQuotes() {
        try {
            const res = await sandBoxApi.get("quotes/")
            ProxyState.activeQuote = res.data
        } catch (err) {
            console.error(err)
        }
    }

    quoteTimer() {
        this.startTimer()
        setTimeout(this.stopTimer, ProxyState.quoteTimer)
    }

    startTimer() {
        let timeRemaining = 60;
        let self = this;
        console.log(ProxyState.quoteTimer + "hi")
        this.timerId = setInterval(self.modifyTimer, 1000)
    }

    modifyTimer() {
        let newVal = ProxyState.quoteTimer - 1
        let self = this;
        if (newVal <= 0) {
            console.log(newVal)
            console.log("stopped")
            this.stopTimer()
            return;
        }
        console.log(newVal)
        ProxyState.quoteTimer = newVal
    }

    stopTimer() {
        console.log("got to 0, now erroring out")
        ProxyState.quoteTimer = 60
        clearInterval(timerId)
    }

}

const quotesService = new QuotesService()
export default quotesService; 