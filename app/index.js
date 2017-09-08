import './main.css'

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

function getCompleteItems (query) {
  fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${query}&limit=20`)
    .then(resp => resp.json())
    .then(data => data[1].forEach((x, i) => {
      let el = document.createElement('div')
      el.setAttribute('class', 'autocomplete-item')
      el.setAttribute('data-word', x)
      const html = `
        <div class="autocomplete-item__container">
          <h2 class="autocomplete-item__header">${x}</h2>
          <p class="autocomplete-item__desc">${data[2][i]}</p>
        </div>
        <a class="autocomplete-item__shortcut" href="${data[3][i]}">Go to the Wikipage»</a>`

      el.innerHTML = html
      document.getElementById('autocomplete').append(el)
      el.firstElementChild.onclick = e => {
        e.preventDefault()
        var textInput = document.getElementById('input_form')
        headerElm.scrollTop = 0
        textInput.value = x
        textInput.focus()
        textInput.setSelectionRange(textInput.value.length, textInput.value.length)

        clearAutoCompleteItems()
        getCompleteItems(x)
      }
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
