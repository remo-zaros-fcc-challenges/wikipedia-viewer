import './main.css'
import {AutoCompleteItem} from './components/AutoCompleteItem'

const inputForm = document.getElementById('input_form')
const letsGoArrow = document.getElementById('lets-go')
const inputContainer = document.querySelector('.input-form__container')
const headerElm = document.querySelector('header')

function clearAutoCompleteItems () {
  const elements = document.querySelectorAll('.autocomplete-item')
  for (let i = 0; i < elements.length; i++) {
    elements[i].remove()
  }
}

function goToWikipedia (e) {
  if (e.key === 'Enter' && e.currentTarget.value !== '') {
    window.open('https://en.wikipedia.org/wiki/' + e.currentTarget.value, '_self')
  }
}

function autoCompleteOnClickHandler (e) {
  e.preventDefault()
  const itemHeader = e.target.parentElement.parentElement.dataset.word
  const textInput = document.getElementById('input_form')
  headerElm.scrollTop = 0
  textInput.value = itemHeader
  textInput.focus()
  textInput.setSelectionRange(textInput.value.length, textInput.value.length)

  clearAutoCompleteItems()
  getCompleteItems(itemHeader)
}

function getCompleteItems (query) {
  fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${query}&limit=20`)
    .then(resp => resp.json())
    .then(data => data[1].forEach((x, i) => {
      const el = AutoCompleteItem(data[1][i], data[2][i], data[3][i])
      document.getElementById('autocomplete').append(el)
      el.firstElementChild.onclick = autoCompleteOnClickHandler
    })
  )
}

function fetchResults (e) {
  const query = e.currentTarget.value
  clearAutoCompleteItems()
  if (query !== '') {
    getCompleteItems(query)
  }
  if (query === '' || query === 'search Wikipedia…') {
    letsGoArrow.style.visibility = 'hidden'
  } else {
    letsGoArrow.style.visibility = 'visible'
  }
}
letsGoArrow.onclick = e => {
  window.open('https://en.wikipedia.org/wiki/' + inputForm.value, '_self')
}

inputForm.oninput = fetchResults
inputForm.onkeydown = goToWikipedia
inputForm.onfocus = () => {
  inputContainer.classList.add('isFocused')
  if (inputForm.value === 'search Wikipedia…') {
    inputForm.value = ''
  }
}

inputForm.onblur = e => inputContainer.classList.remove('isFocused')
inputForm.value = 'search Wikipedia…'
letsGoArrow.style.visibility = 'hidden'
