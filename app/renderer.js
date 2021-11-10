//DOM Elements
const linkSection = document.querySelector('.links');
const errorMessage = document.querySelector('.error-message');
const newLinkForm = document.querySelector('.new-link-form');
const newLinkURL = document.querySelector('.new-link-url');
const newLinkButton = document.querySelector('.new-link-button');
const clearStorageButton = document.querySelector('.clear-storage');


//DOM APIs
const parser = new DOMParser();
const parserResponse = text => {
    return parser.parseFromString(text, 'text/html'); //para convertir txt a html
}

const findTitle = (nodes) => {
    return  nodes.querySelector('title').innerText;
}

//Events
newLinkURL.addEventListener('keyup', () => {
    newLinkButton.disabled = !newLinkURL.validity.valid; //para validar si input es una url simple
});

newLinkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = newLinkURL.value;
    const response = await fetch(url); //api fetch navegar por web
    const text = await response.text(); //obtener html en txt
    const html = parserResponse(text);
    const title = findTitle(html)
    console.log(title)
});