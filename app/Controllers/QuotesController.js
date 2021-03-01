
import { ProxyState } from '../AppState.js'
import quotesService from '../Services/QuotesService.js'
function _drawQuotes() {
    let activeQuote = ProxyState.activeQuote;
    if (ProxyState.quoteTimer == 60) {
        quotesService.quoteTimer()
    }
    let template = ""
    if (activeQuote != null) {
        template += /*html*/`
        <div class="quote">
            <h1>${activeQuote.content}</h1>
            <div class="quote-author">
                <h1 class="author-font">~ ${activeQuote.author}</h1>
            </div>
        </div>
        `
    } else {
        template += "Quotes failed to load"
    }


    //template += `<button>hey</button>`
    document.getElementById("quotes").innerHTML = template;
}

function _updateTimer() {
    let progElem = document.getElementById("quote-progress")
    progElem.style.width = `${ProxyState.quoteTimer}%`
    let timerValElem = document.getElementById("timer")
    timerValElem.innerText = ProxyState.quoteTimer
}


export default class QuotesController {
    constructor() {
        ProxyState.on("activeQuote", _drawQuotes)
        ProxyState.on("quoteTimer", _updateTimer)
    }

    getQuotes() {
        quotesService.getQuotes()
    }
}