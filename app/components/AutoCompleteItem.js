export function AutoCompleteItem (header, desc, url) {
  const el = document.createElement('div')
  el.setAttribute('class', 'autocomplete-item')
  el.setAttribute('data-word', header)

  const html = `
    <div class="autocomplete-item__container">
      <h2 class="autocomplete-item__header">${header}</h2>
      <p class="autocomplete-item__desc">${desc}</p>
    </div>
    <a class="autocomplete-item__shortcut" href="${url}">Go to the Wikipage»</a>`

  el.innerHTML = html
  return el
}
