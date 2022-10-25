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
// Declare paragraph array and put in one paragraoh first to get stuff working, will include the api mehtod after this is working.
const paragraphs = ["He ordered his regular breakfast. Two eggs sunnyside up, hash browns, and two strips of bacon. He continued to look at the menu wondering if this would be the day he added something new. This was also part of the routine. A few seconds of hesitation to see if something else would be added to the order before demuring and saying that would be all. It was the same exact meal that he had ordered every day for the past two years."]


const inputField = document.getElementById('quoteInput')
const quoteDisplayField = document.getElementById('quoteDisplay')
const clock = document.getElementById('timer')
const mistakeTag = document.getElementById('mistake')
const charTyped = document.getElementById('char-typed')
const wpmTag = document.getElementById('wpm')
const restartGame = document.getElementById('button')
// The total key pressed will need to include spaces, numbers, letters and punctuation
const totalKeys = paragraphs[0].split('').length
let timeLeft = 60
let charIndex = 0
let mistakes = charIndex
let isTyping = charIndex
let timer


inputField.addEventListener('input', () => {
    const characters = quoteDisplayField.querySelectorAll('span')
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
            if (characters[charIndex].classList.contains('incorrect')) {
                mistakes--
            }
            characters[charIndex].classList.remove("correct", "incorrect")
        } else {
            // if user typed character and displayed character matches then add the correct class else increase the mistakes and assign the 'incorrect' class to the span
            if (characters[charIndex].innerText === typedCharacter) {
                characters[charIndex].classList.add('correct')

            } else {
                mistakes++
                characters[charIndex].classList.add('incorrect')
            }
            charIndex++
        }
        // Increase the character index number whenever user types in an input, dont care correct or incorrect character
    } else { // If the time becomes 0, we dont want user to be able to input anything in the field because we need to stop counting anything mistakes/wpm/characters typed. Only display the characters typed, mistakes made and wpm after timer stops.
        inputField.value = ''
        charTyped.innerText = 'Characters Typed:' + charIndex
        mistakeTag.innerText = 'Mistakes:' + mistakes
        // How to calculate WPM = Total key pressed correctly divided by 5. Giving it a math.round function to round wpm up to the nearest integer because wpm can't have decimals.
        let wpm = Math.round((charIndex - mistakes) / 5)
        wpmTag.innerText = 'WPM:' + wpm
    }
})

function displayParagraph() {
    // Spllittng all characters in the parapgrah and reiterate through the array and add span tag to each individual characters. 
    // This is so we can check manipulate each characters easily from now on and later manipulate them in the css file so they display the colour we want if the user enters wrong characters.
    paragraphs[0].split('').forEach(span => {
        let characterSpan = `<span>${span}</span>`;
        quoteDisplayField.innerHTML += characterSpan
        inputField.value = null
    })
}

displayParagraph()


// Reloads the page and restarts the game
restartGame.addEventListener('click', () => {
    location.reload()
})
