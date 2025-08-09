const db = firebase.firestore();

import { mostrar } from "./functions.js";

let ultimoDoc = null;
let primerDoc = null;
const limite = 8;

const query = db.collection("urls")

export async function getAll() {
    try {
        const items = [];
        const querySuc = await db.collection("urls")
            .orderBy('nombre', 'asc').get();
        //query.onSnapshot(mostrar);
        //query.get().then(mostrar);
        const querySnapshot = querySuc;
        querySnapshot.forEach(doc => {
            items.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return items;
    } catch (e) {
        throw new Error("Error fetching: " + e.message);
    }
}

export async function get() {
    try {
        const items = [];

        const querySuc = await db.collection("urls")
            .orderBy('nombre', 'asc')
            .limit(limite)
            .get();

        primerDoc = querySuc.docs[0] || null;
        ultimoDoc = querySuc.docs[querySuc.docs.length - 1] || null;

        const querySnapshot = querySuc;
        querySnapshot.forEach(doc => {
            items.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return items;
    } catch (e) {
        throw new Error("Error fetching: " + e.message);
    }
}

export async function getNext() {
    try {
        const items = [];

        const queryNext = await db.collection("urls")
            .orderBy('nombre', 'asc')
            .startAfter(ultimoDoc)
            .limit(limite).get();

        primerDoc = queryNext.docs[0] || null;
        ultimoDoc = queryNext.docs[queryNext.docs.length - 1] || null;

        const querySnapshot = queryNext;
        querySnapshot.forEach(doc => {
            items.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return items;
        // queryNext.limit(limite).get().then(snap => {
        //     primerDoc = snap.docs[0] || null;
        //     ultimoDoc = snap.docs[snap.docs.length - 1] || null;
        //     mostrar(snap)
        //})
    } catch (e) {
        throw new Error("Error fetching sucursales: " + e.message);
    }
}

export async function getBefore() {
    try {
        const items = [];
        const queryPrev = await db.collection("urls")
            .orderBy('nombre', 'asc')
            .endBefore(primerDoc)
            .limit(limite).get()

        primerDoc = queryPrev.docs[0] || null;
        ultimoDoc = queryPrev.docs[queryPrev.docs.length - 1] || null;

        const querySnapshot = queryPrev;
        querySnapshot.forEach(doc => {
            items.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return items;


    } catch (e) {
        throw new Error("Error fetching sucursales: " + e.message);
    }
}

export async function insert(items) {
    try {
        const response = await db.collection("urls").add(items);
        return response;
    } catch (e) {
        throw new Error("Error insert: " + e.message);
    }
}

export async function delet(id) {
    try {
        const response = await db.collection("urls").doc(id).delete();
        return response;
    } catch (e) {
        throw new Error("Error deleting: " + e.message);
    }
}

export async function update(id, datos) {
    try {
        console.log(id, datos);
        const response = await db.collection("urls").doc(id).update(datos);
        return response;
    } catch (e) {
        throw new Error('Error update: ' + e.message)
    }
}

//where
//mostrar vistos
//query.wherw('visto','==', true).get().then(mostrar);
//mostrar no vistos
//query.wherw('visto','==', false).get().then(mostrar);