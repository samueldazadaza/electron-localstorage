//DOM Elements
const linksSection = document.querySelector('.links');
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

//para guardar datos en local storage
const storeLink = (title, url) => {
    localStorage.setItem(url, JSON.stringify({title, url})) //para convertir a string y guardar item
};

//recorrer array JSON desde local storage y obtener datos
const getLinks = () => {
    return Object.keys(localStorage)
        .map(key => JSON.parse(localStorage.getItem(key)));
};

//agregar html a link
const createLinkElement = link => {
    return `
        <div class="m-2 px-4 bg-red-200 rounded shadow-l">
            <h3>${link.title}</h3>
            <p>
                <a class="text-blue-600" href="${link.url}">${link.url}</a>
            </p>
        </div>
    `;
};

//pintar links en pantalla
const renderLinks = () => {
    const linksElements = getLinks().map(createLinkElement).join('');
    linksSection.innerHTML = linksElements;
};

//limpiar formulario
const clearForm = () => {
    newLinkURL.value = null; //para borar txt de input
};

//imprimir error peticion http
const handleError = (error, url) => {
    errorMessage.innerHTML = `
        There was an issue adding "${url}" : ${error.message}
    `.trim();
    setTimeout( () => {
        errorMessage.innerHTML = null;
    }, 5000);
}

//Events
renderLinks(); //para renderizar cuando inicie app

newLinkURL.addEventListener('keyup', () => {
    newLinkButton.disabled = !newLinkURL.validity.valid; //para validar si input es una url simple
});

newLinkForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = newLinkURL.value;
    //para manejo de errores
    try {
        const response = await fetch(url); //api fetch navegar por web
        const text = await response.text(); //obtener html en txt
        const html = parserResponse(text);
        const title = findTitle(html); // bustar solo titulo dentro del html de la respuesta
        storeLink(title, url);
        clearForm();
        renderLinks();
    } catch (e) {
        handleError(e, url);
    }
});

clearStorageButton.addEventListener('click', () => {
    localStorage.clear();
    linksSection.innerHTML = '';
});