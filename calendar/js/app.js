import { initCalendario, remove_child } from "./calendario.js";

/** acceder a todos los inputs -> Material Desing*/
const textFields = document.querySelectorAll('.mdc-text-field');
for (const textField of textFields) {
  mdc.textField.MDCTextField.attachTo(textField);
}

const tooltips = document.querySelectorAll('.mdc-tooltip');
for (const tooltip of tooltips) {
  mdc.tooltip.MDCTooltip.attachTo(tooltip);
}


/** Modals bootstrap */
let add_Modal = document.getElementById('add_Modal');
let Modal_add = new bootstrap.Modal(add_Modal);

let myModal_udate = document.getElementById('update_Modal');
let Modal_update = new bootstrap.Modal(myModal_udate);


/** Variables  */
let new_cita = [];

/** Variables de fecha */
let now = new Date();
let day = now.getDate();
let hoy = day + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();


/**------------ DOM dias */
let body = document.querySelector('body');
let number_day = document.getElementById('number_day');
let name_day = document.getElementById('name_day');
let name_mont = document.getElementById('name_mont');
let today_return = document.getElementById('today');

/**------------ carga de info */
const info_cita = document.getElementById('info_dataCita');
const template_list = document.getElementById('template_list').content;
const fragment_list = document.createDocumentFragment();

/** inputs de formulario add */
let nombre = document.getElementById('nombre');
let paterno = document.getElementById('paterno');
let materno = document.getElementById('materno');

/**------------ add */
let btn_addCita = document.getElementById('add_cita');
const form_add = document.getElementById('form_add');
let btn_cancel = document.getElementById('cancel_add');

/**------------ update */
let btn_confirmar = document.getElementById('confirmar');


/**------------ delete*/

/** Mensaje */
let snackbar = document.getElementById('mdc-snackbar');
let snackbar_label = document.querySelector('.mdc-snackbar__label');
let snackbar_icon = document.getElementById('mdc-snackbar_icon');


/** Funcion de abrir mensaje snackbar */
const open_snackbar_msn = (icon, text) => {
  snackbar_label.textContent = text;
  snackbar_icon.classList.add(icon);
  snackbar.classList.add('mdc-snackbar--open');
}

/** Funcion de cerrar mensaje snackbar */
const close_snackbar_msn = (icon) => {
  setTimeout(() => {
    snackbar_label.textContent = '';
    snackbar_icon.classList.remove(icon);
    snackbar.classList.remove('mdc-snackbar--open');
  }, 6000);
}

/** DOM dias */

const day_mes = (dia) => {
  moment.locale('es-mx');
  number_day.textContent = moment().date(dia).format('D');//moment.format('D');
  name_day.textContent = moment().date(dia).format('dddd');
}



/** Cargar json de citas */
const fetch_data = async (hoy) => {
  try {
    const res = await fetch('data/data_list.json');
    const data = await res.json();
    lista_cita(data, hoy);
  } catch (error) {
    console.log(error);
  }
}

days.addEventListener('click', e => {
  //console.log(e.target);
  if (e.target.classList.contains('month_current')) {
    day = e.target.textContent;
    //e.target.classList.add("today");
    //remove_child();
    day_mes(day);
    initCalendario(day);
    //hoy = day + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
    fetch_data(hoy)
  }
});


/** Evento liberar o agendar */
info_cita.addEventListener('click', e => {
  if (e.target.classList.contains('restore')) {
    Modal_update.show();
    setData_liberar(e);
  }
  if (e.target.classList.contains('mode_edit')) {
    Modal_add.show();
    setData_new(e);
  }
});

/** función para agendar cita */
const setData_new = (e) => {
  let objecto = e.target.parentElement;
  console.log(objecto);
  e.stopPropagation();

  const cita = {
    id: objecto.querySelector("button").dataset.id
  }
  addCita(cita);
}

/** función para liberar cita */
const setData_liberar = (e) => {
  let objecto = e.target.parentElement;
  e.stopPropagation();
  const cita = {
    id: objecto.querySelector('button').dataset.id,
    hora: objecto.querySelector('#hora_cita').textContent
  }
  liberar(cita);
}


const lista_cita = (data_info) => {
  info_cita = data_info.some((data_fecha) => { return data_fecha.fecha == hoy });
  // la constante result filtar y almacena las citas con la fecha del dia.
  while (info_cita.hasChildNodes()) {
    info_cita.removeChild(info_cita.firstChild);
  }

  let result = data_info.filter((data_fecha) => { return data_fecha.fecha === hoy });
  result.forEach(cita => {
    template_list.getElementById('nombre_client').textContent = cita.nombre + " " + cita.paterno + " " + cita.materno;
    template_list.getElementById('hora_cita').textContent = cita.hora;
    template_list.querySelector('button').dataset.id = cita.id;
    template_list.querySelector('h5').textContent = statu(cita.disponible);//+" "+cita.nombre+" "+cita.paterno+" "+cita.materno;
    template_list.querySelector('button').setAttribute("class", "btn btn-warning material-icons " + icon(cita.disponible));
    template_list.querySelector('button').setAttribute("id", icon(cita.disponible));
    template_list.querySelector('button').setAttribute("data-title", tooltip_title(cita.disponible));
    const clone = template_list.cloneNode(true);
    fragment_list.appendChild(clone);
  });
  info_cita.appendChild(fragment_list);
}

const statu = (status) => {
  return status < 1 ? "Disponible" : "Ocupada";
  //element.classList.toggle('restore');
}
const icon = (status) => {
  return status < 1 ? "mode_edit" : "restore";
  //element.classList.toggle('restore');
}

const tooltip_title = (status) => {
  return status < 1 ? "Agendar Cita" : "Liberar cita";
}

const msn_error = (input, valido) => {
  const input_control = input.parentElement;
  const partnt = input_control.parentElement;
  const small = partnt.querySelector('small');
  small.className = 'error';
  small.textContent = "Se requiere llenar este campo";
  return valido = false;
}

const msn_success = (input, valido) => {
  const input_control = input.parentElement;
  const partnt = input_control.parentElement;
  const small = partnt.querySelector('small');
  small.classList.remove('error');
  return valido = true;
}

const check_inputs = () => {
  let valido = true;

  const input_name = nombre.value.trim();
  const input_paterno = paterno.value.trim();
  const input_materno = materno.value.trim();

  valido = input_name === '' ? msn_error(nombre, valido) : msn_success(nombre, valido);
  valido = input_paterno === '' ? msn_error(paterno, valido) : msn_success(paterno, valido);
  valido = input_materno === '' ? msn_error(materno, valido) : msn_success(materno, valido);

  return valido;
}

/** evento de agregar cita */
const addCita = (id_n) => {
  form_add.addEventListener('submit', (e) => {
    e.preventDefault();

    if (check_inputs() == true) {
      const data_form_add = Object.fromEntries(new FormData(e.target));
      const data_full = Object.assign(data_form_add, id_n);

      open_snackbar_msn('done', 'Agendado Cita, Espere por favor...')
      new_cita.push(data_full);
      form_add.reset();
      setTimeout(() => {
        Modal_add.hide();
      }, 100);
      close_snackbar_msn('done');
    }
  });
  console.log(new_cita);
}


/** Cancelar insercion de datos */
btn_cancel.addEventListener('click', () => {
  form_add.reset();
  msn_success(nombre);
  msn_success(paterno);
  msn_success(materno);
});

/** Evento Liberar cita */
const liberar = (objeto) => {
  btn_confirmar.addEventListener('click', () => {
    Modal_update.hide();
    open_snackbar_msn('done', `Liberando cita del horario -> ${objeto.hora}`);
    close_snackbar_msn('done');
    console.log(objeto);
  });
}

/** Evento Eliminar cita */


/** Regresar al dia actual */
today_return.addEventListener('click', () => {
  alert('hoy');
})


/** Carga contenido */
document.addEventListener('DOMContentLoaded', () => fetch_data(hoy));
document.addEventListener('DOMContentLoaded', () => initCalendario(day));
document.addEventListener('DOMContentLoaded', () => day_mes(day));