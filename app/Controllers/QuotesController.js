
import { ProxyState } from '../AppState.js'
import quotesService from '../Services/QuotesService.js'
function _drawQuotes() {
    let activeQuote = ProxyState.activeQuote;
    if (ProxyState.quoteTimer == 60) {
        quotesService.startTimer()
    }
    let template = ""
    if (activeQuote != null) {
        template += /*html*/`
        <div class="quote">
            <h3>${activeQuote.content}</h3>
            <div class="quote-author">
                <h2 class="author-font">~ ${activeQuote.author}</h2>
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
    let updatedVal = ProxyState.quoteTimer * 1.66667
    progElem.style.width = `${updatedVal.toFixed(0)}%`
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