
import { cargarData } from './fetchJson.js';
import { progress, validarURL, add_error, remove_error } from './functions.js';


const info = await cargarData();

/** Llamado de id home */
let url_input = document.getElementById('url_input');
let btn_guardar = document.getElementById('btn_guardar');
let btn_add = document.getElementById('btn_add');
let dialog_url = document.getElementById('dialog_url');
let msn = document.getElementById('msn');
let btn_close = document.getElementById('btn_close');

const list = document.getElementById('list');
const template_list = document.getElementById('template').content;
const fragment = document.createDocumentFragment();

//botones paginacion
let antes = document.getElementById('antes');
let despues = document.getElementById('despues');
let pag = 1;
let offset = 0;
let limit = 8;

let array = info.slice(offset, limit);
let array2 = info;
//console.log(array);
const DB = [];

const List = () => {
    list.replaceChildren();
    progress(list);
    setTimeout(() => {
        list.replaceChildren(); // Limpiar el contenido previo de la lista
        array.forEach(element => {
            template_list.querySelector('div').textContent = element.id;
            template_list.querySelector('a').setAttribute('href', element.url);
            template_list.querySelector('a').textContent = element.url;
            template_list.querySelector('img').setAttribute('src', element.image);

            const clone = template_list.cloneNode(true);
            fragment.appendChild(clone);
            // const listItem = document.createElement('md-list-item');
            // const separador = document.createElement('md-divider');
            // listItem.innerHTML = `
            //         <a href="${element.url}" target="_blank">${element.url} </a>
            //         <img slot="start" style="width: 56px" src="${element.image}">
            //     `;
            // list.appendChild(listItem);
            // list.appendChild(separador);
        });
        list.appendChild(fragment);
    }, 400); // Simular un retraso para mostrar el progreso


}

/** Boton antes */
antes.addEventListener('click', () => {
    if (pag > 1) {
        offset -= 8;
        pag--;
        array = info.slice(offset, limit * pag);
        console.log(array);
        List();
    }
});
/** Boton despues */
despues.addEventListener('click', () => {
    offset += 8;
    pag++
    array = info.slice(offset, limit * pag);
    console.log(array);
    List();
});

/** Abrir el modal */
btn_add.addEventListener('click', () => {
    dialog_url.show();
});


/** Agregar eveto btn para insertar Url */
// const validar_content = (id_element) => {
//     let valido = false;
//     if (id_element.value === '') {
//         add_error(url_input, 'Debe ingresar una Url');
//         return valido = false;
//     }
//     if (validarURL(array2, id_element.value) === false) {
//         remove_error(url_input);
//         return valido = false;
//     }
//     if (validarURL(array2, id_element.value) === true) {
//         add_error(url_input, 'Ya existe en la Lista');
//         return valido = true;
//     }
//     return valido;
// };

document.getElementById('form-id').addEventListener('submit', (e) => {
    e.preventDefault();
    if (url_input.value === '') {
        add_error(url_input, 'Debe ingresar una Url');
        return;
    }
    if (validarURL(array2, url_input.value) === false) {
        remove_error(url_input);
        const data = new Object.fromEntries(new FormData(e.target));
        guardar(data);
        msn.innerHTML = 'agregando... ';
    }
    if (validarURL(array2, url_input.value) === true) {
        add_error(url_input, 'Ya existe en la Lista');
        return;
    }

});

// async function enviar(document_url, new_url) {
//     try {
//         const response = await fetch(document_url, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(new_url)
//         });
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }

document.getElementById('icon-bottom').addEventListener('click', () => {
    url_input.value = '';
});

/** Cerrar el modal */
btn_close.addEventListener('click', () => {
    dialog_url.close();
    msn.innerHTML = '';
    url_input.value = '';
    remove_error(url_input);
});

dialog_url.addEventListener('cancel', () => {
    msn.innerHTML = '';
    url_input.value = '';
    remove_error(url_input);
});




// Cargar la lista al inicio
List();

