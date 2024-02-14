let gameName = "Guess The Word" ;
document.title = gameName ;
document.querySelector('h1').innerHTML = gameName ;
document.querySelector('footer').innerHTML = `${gameName} Created by BrHoussem`;


const arrayWords = ['happy', 'smile', 'laugh', 'dream', 'funny', 'light', 'peace', 'sweet', 'music', 'friend', 'green', 'clean', 'child', 'learn', 'magic', 'heart', 'fresh', 'faith', 'brave', 'calm', 'quiet', 'truth', 'grace', 'young', 'share', 'clear', 'swift', 'shine', 'spark', 'joyful', 'sunny', 'golden', 'silver', 'sunset', 'sunrise', 'moon', 'stars', 'beach', 'ocean', 'river', 'cloud', 'sky', 'mount', 'valley', 'bloom', 'flower', 'breeze', 'garden', 'park', 'walk', 'dreams', 'happy', 'smiles', 'laughs', 'dreamy', 'funny', 'light', 'peace', 'music', 'friend', 'green', 'clean', 'learn', 'magic', 'heart', 'faith', 'brave', 'calm', 'quiet', 'truth', 'grace', 'share', 'clear', 'swift', 'shine', 'spark', 'sunny', 'golden', 'silver', 'sunset', 'sunrise', 'stars', 'beach', 'ocean', 'river', 'cloud', 'mount', 'valley', 'bloom', 'flower', 'garden', 'walk']

function randomWord() {
    const randomIndex = Math.floor(Math.random() * arrayWords.length);
    return arrayWords[randomIndex].toLowerCase();
}

let word = randomWord()
let numberOfLetters = word.length;
let numberOfTries = 6;
let currentTry = 1;


function generateInput() {
    const inputs = document.querySelector('.inputs')

    for (let i = 1 ; i <= numberOfTries ; i++) {
        const tryDiv = document.createElement('div')
        tryDiv.classList.add(`try-${i}`)
        tryDiv.innerHTML = `<span>Try ${i} </span>`
        if (i !== 1) tryDiv.classList.add('disabled-input')

        for (let j = 1 ; j <= numberOfLetters ; j++) {
            const inputLetter = document.createElement('input')
            inputLetter.type ='text'
            inputLetter.id =`guess-${i}-letter-${j}`
            inputLetter.setAttribute('maxlength' ,1)
            tryDiv.appendChild(inputLetter)
        }

        inputs.appendChild(tryDiv)
    } 

    inputs.children[0].children[1].focus()

    const disabledInputs = document.querySelectorAll('.disabled-input input')
    disabledInputs.forEach((e) => {
        e.disabled = true ;
    })

    const allInputs = document.querySelectorAll('input')
    allInputs.forEach((input,index) => {
        input.addEventListener('input',function(){
            const nextInput = allInputs[index + 1]
            if (nextInput)nextInput.focus()
        })
    })
}

const checkButton = document.querySelector('.check')
checkButton.addEventListener('click' , checkGuesses)

function checkGuesses() {
    let successGuess = true
    for (let i = 1 ; i <= numberOfLetters ;i++) {
        const currentLetter = document.querySelector(`#guess-${currentTry}-letter-${i}`)
        const currentLetterLC = currentLetter.value.toLowerCase()
        const actualLetter = word[i - 1]

        if (actualLetter === currentLetterLC) {
            document.querySelector(`#guess-${currentTry}-letter-${i}`).classList.add('in-place')
        }else if (word.includes(currentLetterLC) && (currentLetterLC !== "")) {
            document.querySelector(`#guess-${currentTry}-letter-${i}`).classList.add('not-in-place')
            successGuess = false
        }else {
            document.querySelector(`#guess-${currentTry}-letter-${i}`).classList.add('no') 
            successGuess = false
        }
    }


    if (successGuess) {

        const disabledAll = document.querySelectorAll('.inputs > div')
        disabledAll.forEach((e) => {
            e.classList.add('disabled-input')
        })
        checkButton.disabled = true
        document.querySelector('.hint').disabled = true
        document.querySelector('.message').innerHTML = 'CONGRATULATIONS, YOU <span>WIN!</span>'
        playAgain()

    } else if(currentTry < 6) {
        document.querySelector(`.try-${currentTry}`).classList.add('disabled-input')
        document.querySelector(`.try-${currentTry + 1}`).classList.remove('disabled-input') 
        document.querySelectorAll(`.try-${currentTry + 1} input`).forEach((e) => {
            e.disabled = false
        }) 
        document.querySelector(`.try-${currentTry + 1}`).children[1].focus()
        currentTry += 1
        successGuess = false
    }
    else {
        document.querySelector(`.try-${currentTry}`).classList.add('disabled-input')
        checkButton.disabled = true
        document.querySelector('.hint').disabled = true
        successGuess = false
        document.querySelector('.message').innerHTML = `YOU LOSE THE WORD IS <span>${word.toLocaleUpperCase()}</span>`
        playAgain()
    }
    
}

let hintNumber = 2

const hintButton = document.querySelector('.hint')
hintButton.addEventListener('click' , hintFunction)
document.querySelector('.hint span').innerHTML = hintNumber



function hintFunction() {
    emptyInput = Array.from(document.querySelectorAll(`.try-${currentTry} input`)).filter((empty) => empty.value == '')
    if (hintNumber > 0 && (emptyInput.length != 0)) {
        hintNumber--
        document.querySelector('.hint span').innerHTML = hintNumber
        const randomInput = Math.floor(Math.random() * emptyInput.length);
        const indexToFill = Array.from(document.querySelectorAll(`.try-${currentTry} input`)).indexOf(emptyInput[randomInput])
        emptyInput[randomInput].value = `${word[indexToFill]}`
    }
    if (hintNumber == 0){
        document.querySelector('.hint').disabled = true
    }
}

function playAgain() {
    const againButton = document.createElement('button')
    againButton.innerHTML = 'PLAY AGAIN'
    document.querySelector('.play-again').appendChild(againButton)
    againButton.addEventListener('click',() => {
        location.reload()
    })
}

function deleteWord(press) {
    if (press.key === 'Backspace') {
        const allInputs = Array.from(document.querySelectorAll('input:not([disabled])'))
        const currentPosition = allInputs.indexOf(document.activeElement)
        if (currentPosition > 0) {
            if (allInputs[currentPosition ].value === ''){
                allInputs[currentPosition - 1].value = ''
                allInputs[currentPosition - 1].focus()    
            }
            else {
                allInputs[currentPosition ].value = ''
            }
        }
    }
}

document.addEventListener('keydown',deleteWord)

window.onload = function () {
    generateInput()
}