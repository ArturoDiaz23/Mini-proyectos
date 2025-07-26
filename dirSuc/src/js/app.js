
import { login, logout } from "./auth.js";
import { insert, getSucursales } from "./firestore.js";
import { getUUID, progress } from "./utils.js";



// Elementos del DOM
const btn_login = document.getElementById("btn_login");
const btn_logout = document.getElementById("btn_logout");
const btn_add = document.getElementById("btn_add");
const contanier_Suc = document.getElementById("contanier");

// Elementos del form
const form = document.getElementById("form_sucursal");
const btn_close = document.getElementById("btn_close");
const dialog_sucursal = document.getElementById("dialog_sucursal");

// Elementos del template
const container_suc = document.getElementById('list');
const template_suc = document.getElementById('template').content;
const fragment = document.createDocumentFragment();



let currenUser;
let suc = [];


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currenUser = user;
        console.log("User is signed in:", currenUser.displayName);
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
    logout();
});


/** Abrir el modal */
btn_add.addEventListener('click', () => {
    dialog_sucursal.show();
});

// Enviar el formulario
form.addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log("Form submitted");
    //const data = cr.value;
    const cr = form['cr'];
    const sucursal = form['sucursal'];
    const direccion = form['direccion'];
    const municipio = form['municipio'];
    const estado = form['estado'];
    if (!cr.value || !sucursal.value || !direccion.value || !municipio.value || !estado.value) {
        console.log("All fields are required" + cr.value + sucursal.value + direccion.value + municipio.value + estado.value);
        console.error("All fields are required");
        return;
    } else {
        newSucursal(cr.value, sucursal.value, direccion.value, municipio.value, estado.value);
        form.reset();
        dialog_sucursal.close();
        loadSucusales();
    }
});

/** Función para agregar una nueva sucursal */
async function newSucursal(cr, sucursal, direccion, municipio, estado) {
    try {
        const item = {
            id: getUUID(),
            cr: cr,
            sucursal: sucursal,
            direccion: direccion,
            municipio: municipio,
            estado: estado,
            id_user: currenUser.uid,
        };
        const response = await insert(item);
        loadSucusales
    }
    catch (error) {
        console.error("Error adding new Sucursal:", error);
    }
}

async function loadSucusales() {
    suc = [];
    try {
        const response = await getSucursales();
        suc = [...response];
        renderSuc();
    } catch (error) {
        throw new Error("Error loading sucursales: " + error.message);
    }
}

const renderSuc = () => {
    console.log(suc);
    list.replaceChildren();
    progress(list);

    suc.forEach((item) => {
        list.replaceChildren(); // Limpiar el contenido previo de la lista

        template_suc.querySelector('#cr').textContent = item.cr;
        template_suc.querySelector('#sucursal').textContent = item.sucursal;
        template_suc.querySelector('#direccion').textContent = item.direccion;
        template_suc.querySelector('#municipio').textContent = item.municipio;
        template_suc.querySelector('#estado').textContent = item.estado;

        const clone = template_suc.cloneNode(true);
        fragment.appendChild(clone);
        // const sucElement = document.createElement("div");
        // sucElement.classList.add("sucursal");
        // sucElement.innerHTML = `
        //     <span>${item.sucursal}</span>
        //     <span>CR: ${item.cr}</span>
        //     <span>Dirección: ${item.direccion}</span>
        //     <span>Municipio: ${item.municipio}</span>
        //     <span>Estado: ${item.estado}</span>
        // `;
        // contanier_Suc.appendChild(sucElement);
    });
    container_suc.appendChild(fragment);
}

btn_close.addEventListener('click', () => {
    form.reset();
    dialog_sucursal.close();
    // msn.innerHTML = '';
    // url_input.value = '';
    // remove_error(url_input);
});

dialog_sucursal.addEventListener('cancel', () => {
    form.reset();
    // msn.innerHTML = '';
    // url_input.value = '';
    // remove_error(url_input);
});

//cargar de info login
function init() {
    btn_login.classList.add("hidden");
    btn_logout.classList.remove("hidden");
    btn_add.classList.remove("hidden");

    id_user.innerHTML = `
    <img src="${currenUser.photoURL}" alt="User Avatar" width="40"><br>
    <span> ${currenUser.displayName} </span>
    `;

    loadSucusales();
}