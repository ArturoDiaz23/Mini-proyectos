export { initCalendario, remove_child };

let navigate_before = document.getElementById("navigate_before");
let navigate_next = document.getElementById("navigate_next");
const days = document.getElementById("days");
//let day_span = document.querySelectorAll(".week_days_item");
//const day_span = document.getElementById("dia_m");
let year_a = document.getElementById("year");
let name_mont = document.getElementById('name_mont');


let monthName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
    "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let now = new Date();
var day = now.getDate();
let month = now.getMonth();
let currentMonth = month;
let year = now.getFullYear();

//document.addEventListener('DOMContentLoaded', () => initCalendario(day));

const initCalendario = (day) => {
    name_mont.textContent = monthName[month];
    year_a.textContent = year;

    remove_child();

    for (let i = startDay(); i > 0; i--) {
        const newDiv = document.createElement("span");
        newDiv.innerText = totalDay(month - 1) - (i - 1);
        days.appendChild(newDiv);
        newDiv.setAttribute('class', 'week_days_item prev_day');
    }

    for (let i = 1; i <= totalDay(month); i++) {
        const newDiv = document.createElement("span");
        newDiv.innerText = i;
        days.appendChild(newDiv);
        if (i == day && month == currentMonth && year == now.getFullYear()) {
            newDiv.setAttribute('class', 'month_current week_days_item today');
        } else {
            newDiv.setAttribute('class', 'month_current week_days_item');
        }
    }

}

const remove_child = () => {
    /* let child_day = Array.prototype.slice.call(document.getElementsByClassName("week_days_item"), 0);
     for (div of child_day) {
         div.remove();
     }*/
    while (days.hasChildNodes()) {
        days.removeChild(days.firstChild);
    }
}


/** obtener el mes siguiente */
const nextMonth = () => {
    if (month !== 11) {
        month++;
    } else {
        year++;
        month = 0;
    }
    //remove_child();
    initCalendario(day);
}

/** obtener el mes anterior */
const beforeMonth = () => {
    if (month !== 0) {
        month--;
    } else {
        year--;
        month = 11;
    }
    //remove_child();
    initCalendario(day);
}

/** Dia donde empieza el mes */
const startDay = () => {
    let start = new Date(year, month, 1);
    return ((start.getDate() - 1) === -1) ? 6 : start.getDay();
}

/** año biciesto*/
const leapMonth = () => {
    return ((year % 400 === 0) || (year % 4 === 0) && (year % 100 !== 0));
}

/**
    0 enero 31
    ----------------1 febrero 28 : 29
    2 marzo 31
    ----------------3 abril 30
    4 mayo 31
    ----------------5 junio 30
    6 julio 31
    7 agosto 31
    ----------------8 septiembre 30
    9 octubre 31
    ----------------10 noviembre 30
    11 diciembre 31

 */
const totalDay = () => {
    if (month === -1) month = 11;
    if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;
    } else if (month == 0 || month == 2 || month == 4 || month == 6
        || month == 7 || month == 9 || month == 11) {
        return 31;
    } else {
        return leapMonth() ? 29 : 28;
    }
}

navigate_next.addEventListener('click', () => {
    nextMonth();
});

navigate_before.addEventListener('click', () => {
    beforeMonth();
});


/** Dia selecionado */

