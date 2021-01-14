// I prefer to name these like quoteEl, getNewQuoteEl, etc...
// so it's clear were dealing with DOM elements
const quote = document.querySelector('.quote')
const getNewQuote = document.querySelector('.repeat')
const darkMode = document.querySelector('.dark-mode')

const RANDOM_QOUTE_API_URL = 'http://api.quotable.io/random'

let darkModeOn = false

// don't need function body, just don't invoke it since it's going to execute immediately
// this seems broken though something with your API? not sure :)
getNewQuote.addEventListener('click', renderNewQuote)

// use falsy and truthy, no need to do comparison like darkModeOn ===  false
// https://developer.mozilla.org/en-US/docs/Glossary/Truthy
// https://developer.mozilla.org/en-US/docs/Glossary/Falsy
/*
if(darkModeOn === false){
    darkMode.addEventListener('click', () => {
        switchDarkMode()
    })
}

if(darkModeOn === true){
    darkMode.addEventListener('click', () => {
        switchLightMode()
    })
}
*/

// handle theme change
function handleThemeChange() {
	// we want to click the button and each time set the opposite value
  // darkModeOn = true 
  // would be
  // darkModeOn = false
  // and so on
  darkModeOn = !darkModeOn
  
  // there can only be two states, so no need to do more checks
  // if we did return we don't even need the else clause but up to you :)
  if(darkModeOn) {
    switchDarkMode()
    return // just yeet out of the execution
  }
  
  // it can only return one thing if false
  switchLightMode()
}

darkMode.addEventListener('click', handleThemeChange)


function getRandomQuote(){
    return fetch(RANDOM_QOUTE_API_URL)
      .then(response => response.json())
      .then(data => data.content)
}  

async function renderNewQuote(){
    const newQuote = await getRandomQuote()
    quote.textContent = '"' + newQuote + '"'
}

function switchDarkMode(){
		// don't need this here as we want to know the value beforehand, and just change it
    // darkModeOn = true
    document.body.style.background = 'black'       
    document.body.style.color = 'white'
    getNewQuote.style.color = 'white'
    darkMode.style.color = 'white'
    darkMode.textContent = 'Light Mode'
    localStorage.setItem('theme', 'dark')
}

function switchLightMode(){
		// same here
    // darkModeOn = false
    document.body.style.background = 'burlywood'       
    document.body.style.color = 'black'
    getNewQuote.style.color = 'black'
    darkMode.style.color = 'black'
    darkMode.textContent = 'Dark Mode'
    localStorage.setItem('theme', 'light')
}

renderNewQuote()