
//import { cargarData } from './fetchJson.js';
import { insert, get, delet } from './firestore.js';

import { progress, validarURL, add_error, remove_error } from './functions.js';

/** Llamado de id home */
let url_input = document.getElementById('url_input');
let btn_guardar = document.getElementById('btn_guardar');
let btn_add = document.getElementById('btn_add');
let dialog_url = document.getElementById('dialog_url');
let msn = document.getElementById('msn');
let btn_close = document.getElementById('btn_close');
let contenido_url = document.getElementById('contenido_url');

//Delet sucursal
const alert_dialog = document.getElementById('alert_dialog');
const form_alert_eliminar = document.getElementById('form_alert_eliminar');
const id_delete = document.getElementById('id_delete');

const list = document.getElementById('list');
const template_list = document.getElementById('template').content;
const fragment = document.createDocumentFragment();

//botones paginacion
let antes = document.getElementById('antes');
let despues = document.getElementById('despues');
let pag = 1;
let offset = 0;
let limit = 8;

var info = await get();
var array = info.slice(offset, limit);
var array2 = [];

// function load() {

//     setTimeout(async () => {
//         info = await get();
//         array = info.slice(offset, limit);
//     }, 100);
// }

let currenUser;

//data user
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currenUser = user;
        init();
    } else {
        console.log("No user is signed in.");
    }
});

btn_login.addEventListener("click", async (e) => {
    try {
        currenUser = await login();
    } catch (error) {
        console.error("Login failed:", error);
    }
});

btn_logout.addEventListener("click", async (e) => {
    toogle_btn();
    logout();
});

// async function loading_data() {
//     try {
//         const response = await get();
//         const info = await response;
//         List(info);
//     } catch (e) {
//         throw new Error("Error loading: " + e.message);
//     }
// }

//carga datos de la DB
const loading_data = () => {
    list.replaceChildren();
    progress(list);
    setTimeout(() => {
        list.replaceChildren(); // Limpiar el contenido previo de la lista
        array.forEach(element => {
            template_list.querySelector('a').setAttribute('href', element[1].url);
            template_list.querySelector('a').textContent = element[1].url;
            // template_list.querySelector('img').setAttribute('src', element.image);
            template_list.querySelector('.btn_delete').dataset.id = element[0];

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
    }, 800); // Simular un retraso para mostrar el progreso
}

/** Boton antes */
antes.addEventListener('click', () => {
    if (pag > 1) {
        offset -= 8;
        pag--;
        array = info.slice(offset, limit * pag);
        console.log(array);
        loading_data();
    }
});
/** Boton despues */
despues.addEventListener('click', () => {
    offset += 8;
    pag++
    array = info.slice(offset, limit * pag);
    console.log(array);
    loading_data();
});

/** Abrir el modal */
btn_add.addEventListener('click', () => {
    dialog_url.show();
});

document.getElementById('form-id').addEventListener('submit', (e) => {
    e.preventDefault();
    info.forEach(item => { array2.push(item[1]); });
    if (url_input.value === '') {
        add_error(url_input, 'Debe ingresar una Url');
        return;
    }
    if (validarURL(array2, url_input.value) === false) {
        remove_error(url_input);
        // const data = new Object.fromEntries(new FormData(e.target));
        add_newUrl(url_input.value);
        url_input.value = '';
        dialog_url.close();
        //msn.innerHTML = 'agregando... ';

    }
    if (validarURL(array2, url_input.value) === true) {
        add_error(url_input, 'Ya existe en la Lista');
        return;
    }
    e.stopPropagation();

});

async function add_newUrl(url) {
    try {
        const items = { url: url }
        const response = await insert(items);
        window.location.reload()
        loading_data();
    } catch (e) {
        console.log("Error insert: " + e);
    }

}

document.getElementById('icon-bottom').addEventListener('click', () => {
    url_input.value = '';
});


/**----------------------------------------------------------- */
/** Funcion y event para eliminar una sucursal */
//agregar evento a btn_delete
list.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.classList.contains('btn_delete')) {
        id_delete.textContent = data_to_confirm(e.target.parentElement);
        console.log(id_delete);
        alert_dialog.show();
        form_alert_eliminar.addEventListener('click', () => {
            delete_url(e.target.dataset.id)
        });
    }
});

const data_to_confirm = data_info => {
    const data_items = data_info.querySelector('a').textContent;
    return data_items;
}

//funcion para eliminar sucursal
async function delete_url(id) {
    try {
        const response = await delet(id);
        console.log("Deleted successfully");
        window.location.reload()
        loading_data();
    } catch (error) {
        console.error("Error deleting:", error);
    }
}


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
const toogle_btn = () => {
    btn_login.classList.toggle("hidden");
    btn_logout.classList.toggle("hidden");
    btn_add.classList.toggle("hidden");
    contenido_url.classList.toggle("hidden");
    id_user.classList.toggle("hidden");
}

//cargar de info login
function init() {

    toogle_btn();

    id_user.innerHTML = `
    <div> ${currenUser.displayName} </div>
    `;
    // <img src="${currenUser.photoURL}" alt="User Avatar">

    loading_data();
}

