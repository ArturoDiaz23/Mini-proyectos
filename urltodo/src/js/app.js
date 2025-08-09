
//import { cargarData } from './fetchJson.js';
import { getAll, get, getNext, getBefore, insert, delet } from './firestore.js';

import { progress, validarURL, add_error, remove_error } from './functions.js';

/** Llamado de id home */
let url_input = document.getElementById('url_input');
let name_input = document.getElementById('name_input');

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
const btn_antes = document.getElementById('antes');
const btn_despues = document.getElementById('despues');


let array2 = [];

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

/* Carga de datos */
//Funcion DB all data
async function allData() {
    try {
        const response = await getAll();
        const info = await response;
        array2 = [];
        info.forEach(item => { array2.push(item); });
        console.log(array2);
    } catch (e) {
        throw new Error("Error loading: " + e.message);
    }
}

// función asincrona para llamas datos a la DB
async function loading_data() {
    try {
        const response = await get();
        const info = await response;
        render_data(info);
    } catch (e) {
        throw new Error("Error loading: " + e.message);
    }
}

async function loading_netx() {
    try {
        const response = await getNext();
        const info = await response;
        render_data(info);
    } catch (e) {
        throw new Error("Error loading: " + e.message);
    }
}

async function loading_prev() {
    try {
        const response = await getBefore();
        const info = await response;
        render_data(info);
    } catch (e) {
        throw new Error("Error loading: " + e.message);
    }
}

//carga datos de la DB
const render_data = (array) => {
    list.replaceChildren();
    progress(list);
    setTimeout(() => {
        list.replaceChildren(); // Limpiar el contenido previo de la lista
        array.forEach(element => {
            template_list.querySelector('a').setAttribute('href', element.url);
            template_list.querySelector('a').textContent = element.nombre;
            // template_list.querySelector('img').setAttribute('src', element.image);
            template_list.querySelector('.btn_delete').dataset.id = element.id;

            const clone = template_list.cloneNode(true);
            fragment.appendChild(clone);
        });
        list.appendChild(fragment);
    }, 300); // Simular un retraso para mostrar el progreso
}

/** Boton antes */
btn_antes.addEventListener('click', () => {
    loading_prev();
});
/** Boton despues */
btn_despues.addEventListener('click', () => {
    loading_netx();
});

/** Abrir el modal */
btn_add.addEventListener('click', () => {
    dialog_url.show();
});

document.getElementById('form-id').addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    //info.forEach(item => { array2.push(item[1]); });
    if (url_input.value === '') {
        add_error(url_input, 'Debe ingresar una Url');
        return;
    }
    if (validarURL(array2, url_input.value) === false) {
        remove_error(url_input);
        // const data = new Object.fromEntries(new FormData(e.target));
        add_newUrl(url_input.value, name_input.value);
        url_input.value = '';
        dialog_url.close();
        //msn.innerHTML = 'agregando... ';
        allData();

    }
    if (validarURL(array2, url_input.value) === true) {
        add_error(url_input, 'Ya existe en la Lista');
        return;
    }
});

async function add_newUrl(url, nombre) {
    try {
        const items = { url: url, nombre: nombre }
        const response = await insert(items);
        loading_data();
    } catch (e) {
        console.log("Error insert: " + e);
    }

}

url_input.addEventListener('input', () => {
    const p = new URLPattern(url_input.value);
    name_input.value = p.pathname.slice(1);
});

document.getElementById('icon-bottom').addEventListener('click', () => {
    url_input.value = ''; name_input.value = '';
});


/**----------------------------------------------------------- */
/** Funcion y event para eliminar una sucursal */
//agregar evento a btn_delete
list.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.classList.contains('btn_delete')) {
        id_delete.textContent = data_to_confirm(e.target.parentElement);
        console.log(id_delete);
        alert_dialog.show();
        form_alert_eliminar.addEventListener('click', () => {
            delete_url(e.target.dataset.id)
            allData();
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
        loading_data();
    } catch (error) {
        console.error("Error deleting:", error);
    }
}

/** Cerrar el modal */
const limpiar = () => {
    remove_error(url_input);
    msn.innerHTML = '';
    url_input.value = '';
}
btn_close.addEventListener('click', () => {
    limpiar();
    dialog_url.close();
});

dialog_url.addEventListener('cancel', () => {
    limpiar();
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
    allData();
    loading_data();
}

