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


// How to calculate WPM = Total key pressed / time elasped in minute

// The total key pressed will need to include spaces, numbers, letters and punctuation





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
const accuracyTag = document.getElementById('accuracy')
// How to calculate accuracy = Correct keys pressed / Total keys pressed
let charIndex = 0
let mistakes = charIndex
const totalKeys = paragraphs[0].split('').length
let accuracy = ((totalKeys - mistakes) / totalKeys) + '%'



inputField.addEventListener('input', () => {
    timer()
    const characters = quoteDisplayField.querySelectorAll('span')
    let typedCharacter = inputField.value.split('')[charIndex]
    // If user hasn't entered any characters or pressed the backspace
    if (typedCharacter == null) {
        charIndex--
        if (characters[charIndex].classList.remove('incorrect')) {
            mistakes--
        }
        characters[charIndex].classList.remove('incorrect', 'correct')
    } else if (characters[charIndex].innerHTML === typedCharacter) {
        characters[charIndex].classList.add('correct')
        characters[charIndex].classList.remove('incorrect')
    } else {
        mistakes++
        characters[charIndex].classList.add('incorrect')
        characters[charIndex].classList.remove('correct')
    }
    charIndex++
})


function displayParagraph() {

    // Spllittng all characters in the parapgrah and reiterate through the array and add span tag to each individual characters. 
    // This is so we can check manipulate each characters easily from now on.
    paragraphs[0].split('').forEach(span => {
        let characterSpan = `<span>${span}</span>`;
        quoteDisplayField.innerHTML += characterSpan
        inputField.value = null
    })

}

function timer() {
    clock.innerText = 0 + 's'
    setInterval(() => {

    },);
}

displayParagraph()
