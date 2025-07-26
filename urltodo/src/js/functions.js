

// Function Create a circular progress element
export const progress = (parent) => {
    let progress = document.createElement('md-circular-progress');
    progress.setAttribute('indeterminate', '');
    progress.setAttribute('style', 'margin: 100px auto;');
    parent.appendChild(progress);
}

// Function para validar si URL existe en el array
export const validarURL = (arrayUrls, newUrl) => {
    return arrayUrls.some(function (element) {
        return element.url === newUrl;
    });
}

export const add_error = (parent, msn) => {
    parent.setAttribute('error', '');
    parent.setAttribute('error-text', msn);
}

export const remove_error = (parent) => {
    parent.removeAttribute('error');
    parent.removeAttribute('error-text');
}
