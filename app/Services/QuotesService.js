import { ProxyState } from '../AppState.js'
import { sandBoxApi } from './AxiosService.js'

let timerId = "";
var self = this;

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

    startTimer() {
        this.timerId = setInterval(this.modifyTimer.bind(this), 1000)
        //uses bind to bind the timerId to the current object. this allows to have multiple ids over a period of time
    }

    modifyTimer() {
        let newVal = ProxyState.quoteTimer - 1
        if (newVal <= 0) {
            this.stopTimer(this)
            return;
        }
        ProxyState.quoteTimer = newVal
    }

    stopTimer() {
        //uses this to delete the current timer id, otherwise it goes twice as fast (assuming its not deleting the right ID)
        clearInterval(this.timerId)
        ProxyState.quoteTimer = 60 //resets counter
        this.getQuotes() //calls quotes, so may not be exactly every 60 seconds since it may not connect to a new one by then.
    }

}

const quotesService = new QuotesService()
export default quotesService; 