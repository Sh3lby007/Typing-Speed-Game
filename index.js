const random_quote_api = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')

console.log(random_quote_api)

function getRandomQuote() {
    return fetch(random_quote_api)
        .then(response => response.json())
        .then(data => data.content)
}

async function getNextQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.textContent = quote
    quoteInputElement.textContent = null
    console.log(quote)
}

