import { login, logout } from "./auth.js";

const btn_login = document.getElementById("btn_login");
const btn_logout = document.getElementById("btn_logout");

let currenUser;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currenUser = user;
        console.log("User is signed in:", user);
    } else {
        console.log("No user is signed in.");
    }
});

btn_login.addEventListener("click", async (e) => {
    try {
        currenUser = await login();
        conso
    } catch (error) {
        console.error("Login failed:", error);
    }
});

btn_logout.addEventListener("click", async (e) => {
    logout();
});