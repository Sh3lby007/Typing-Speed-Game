// To create a typing speed game, what do I need? 
/*
1. A big box that contains random generated texts
2. A highlighted bar that follows the text ater you have typed the word
3. There probably should be an eventlistener to listen to input for the highlighted bar
4. The highlighted bar needs highlight the errors made if any alphabet is typed incorrectly
5. The timer will start counting down from 60 by itself when you start typing
6. After the 
7. The bar allows you to go back and edit on your mistakes.
8. Once everything is done, it will display WPM, Characters typed, accuracy and a try again button which will reset everything
*/
/*
Step 2:
 
*/
/*
Step 3
// *
/*
Step 4
When the timer stops and the game ends, there needs to be a a compilation of WPM, how many characters are typed and the accuracy of the typing. A try again button also need to appear which resets all value to default and we can create a function call restart() to handle this.
A new quote also needs to appear when we click the try again button, we can call a newQuote() function to handle this request.
*/

/*
Step 1:
Assign variables to elements from the HTML document so that they can easily accessed and modified. Make sure that these variables are used multiple times as it is not good practice to declare global variables if you only gonna use them once
*/

const inputField = document.getElementById('quoteInput')
const quoteDisplayField = document.getElementById('quoteDisplay')
const clock = document.getElementById('timer')
const mistakeTag = document.getElementById('mistake')
const charTyped = document.getElementById('char-typed')
const wpmTag = document.getElementById('wpm')
const restartGame = document.getElementById('button')

let timeLeft = 60
let charIndex = 0
let wpmCharIndex = 0
let mistakes = charIndex
let isTyping = charIndex
let timer

inputField.addEventListener('input', () => {
    // This variable holds all the nodes of individual characters that are held in the span tag
    let characters = quoteDisplayField.querySelectorAll('span')

    // This variable holds the value of each characters user has typed
    let typedCharacter = inputField.value.split('')[charIndex]

    // If the there are still time left, we want the code below to continue to operate.
    if (timeLeft > 0) {
        // Once we call the countdown function when there is an input, it won't restart again on every key clicked.
        if (!isTyping) {
            timer = setInterval(function countDown() {
                if (timeLeft > 0) {
                    timeLeft--
                    clock.innerText = timeLeft + 's'
                } else {
                    clearInterval(timer)
                }
            }, 1000)
            isTyping = true
        }
        // If user hasn't entered any characters or press the backspace: 1. Decrease the character index count. 2. if the span contains incorrect class, remove it and reduce the mistake count. 3. Reduce both incorrect and correct classlist if backspace is clicked. 
        if (typedCharacter == null) {
            charIndex--
            wpmCharIndex--
            if (characters[charIndex].classList.contains('incorrect')) {
                mistakes--
            }
            characters[charIndex].classList.remove("correct", "incorrect")
            // if user typed character and displayed character matches then add the correct class else increase the mistakes and assign the 'incorrect' class to the span
        } else {
            if (characters[charIndex].innerText === typedCharacter) {
                characters[charIndex].classList.add('correct')

            } else {
                mistakes++
                characters[charIndex].classList.add('incorrect')
            }
            // Increase the character index number whenever user types in an input, dont care correct or incorrect character
            charIndex++
            wpmCharIndex++
        }
        // If the amount of characters type is equals to the length of the quote, we want to call a new quote and reset char index.
        if (characters.length === charIndex) {

            renderQuote()

            // Reset char index, so that on new quote you can split and retrieve char again
            // But this will not affect the wpmCharIndex used for WPM calculation
            charIndex = 0
        }
        // Only display the characters typed, mistakes made and wpm after timer stops.
        charTyped.innerText = 'Characters Typed:' + wpmCharIndex
        mistakeTag.innerText = 'Mistakes:' + mistakes
        // How to calculate WPM = Total key pressed correctly divided by 5. Giving it a math.round function to round wpm up to the nearest integer because wpm can't have decimals.
        let wpm = Math.round((wpmCharIndex - mistakes) / 5)
        wpmTag.innerText = 'WPM:' + wpm

    } else {
        // If the time becomes 0, we dont want user to be able to input anything in the field because we need to stop counting anything mistakes/wpm characters typed. 
        inputField.value = ''
    }
})

/**
 * This functions fetches the random quote from the API
 */
function randomQuote() {
    return fetch('http://api.quotable.io/random')
        .then(response => response.json())
        .then(data => data.content)
}

/**
 * This function sets a new quote for user to type
 */
async function renderQuote() {
    const quote = await randomQuote()

    // When we call this function, the previous quote have to be removed for the new quote to appear.
    quoteDisplayField.innerHTML = ''

    // Spllittng all characters in the parapgrah by spacing and reiterate through the array and add span tag to each individual characters. 
    // This is so we can manipulate each characters easily by adding classlist so that in the css file, they display the colour we want if the user enters wrong characters.
    quote.split('').forEach(span => {
        let characterSpan = `<span>${span}</span>`
        quoteDisplayField.innerHTML += characterSpan
    });

    // Clears the user input field
    inputField.value = null
}

// Reloads the page and restarts the game
restartGame.addEventListener('click', () => {
    location.reload()
})

renderQuote()