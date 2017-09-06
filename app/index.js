import './main.css'

function clearAutoCompleteItems () {
  const elements = document.querySelectorAll('.auto-complete__item')
  for(let i = 0; i < elements.length; i++) {
    elements[i].remove()
  }
}

function test (e) {
  clearAutoCompleteItems()
  fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${e.currentTarget.value}&limit=10`)
    .then(resp => resp.json())
    .then(data => data[1].forEach( x => {
      let el = document.createElement('div')
      el.setAttribute('class', 'auto-complete__item')
      el.innerHTML = x
      document.getElementById('auto-complete').append(el);
    })
  )
}

document.getElementById('input_form').addEventListener("keyup", test);


