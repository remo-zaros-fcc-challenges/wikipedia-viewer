import './main.css'

function clearAutoCompleteItems () {
  const elements = document.querySelectorAll('.autocomplete-item')
  for(let i = 0; i < elements.length; i++) {
    elements[i].remove()
  }
}

function getCompleteItems (query) {
  fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${query}&limit=20&titles=File:Test.jpg&prop=imageinfo`)
    .then(resp => resp.json())
    .then(data => data[1].forEach( (x, i) => {
      console.log(data)
      let el = document.createElement('div')
      el.setAttribute('class', 'autocomplete-item')
      const html = `
        <a class="autocomplete-item__link" href="${data[3][i]}">
          <h2 class="autocomplete-item__header">${x}</h2>
          <p class="autocomplete-item__desc">${data[2][i]}</p>
        </a>`

      el.innerHTML = html
      document.getElementById('autocomplete').append(el);
      el.onclick = (e) => {
        document.getElementById('input_form').value = x
        clearAutoCompleteItems()
      }
    })
  )
}

function autocomplete (e) {
  const query = e.currentTarget.value;
  clearAutoCompleteItems()
  if ( e.key !== "Enter" ) {
    if ( query !== '') {
      getCompleteItems(query)
    }
  } else {
    if ( query !== "" || query !== " ") {
      window.open(`https://en.wikipedia.org/wiki/${query}`)
    }
  }
}

document.getElementById('input_form').addEventListener("keyup", autocomplete);
document.getElementById('input_form').onfocus = () => {
  if (document.getElementById('input_form').value === 'search Wikipedia…') {
    document.getElementById('input_form').value = ''
  }
}
document.getElementById('input_form').value = 'search Wikipedia…'

