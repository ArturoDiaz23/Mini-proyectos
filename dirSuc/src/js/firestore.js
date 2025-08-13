const db = firebase.firestore();

var ultimoDoc = null;
var primerDoc = null;

const limite = 5;

export async function insert(items) {
    try {
        const response = await db.collection("sucursales").add(items);
        return response;
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function getSucursales() {
    try {
        const items = [];

        const querySuc = await db.collection("sucursales")
            .orderBy('estado', 'asc')
            .limit(limite)
            .get();

        const querySnapshot = querySuc;
        querySnapshot.forEach(doc => {
            primerDoc = querySnapshot.docs[0] || null;
            ultimoDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
            //items.push([doc.id, doc.data()]);
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

export async function getNext() {
    try {
        const items = [];

        const querySuc = await db.collection("sucursales")
            .orderBy('estado', 'asc')
            .limit(limite)
            .startAfter(ultimoDoc)
            .get()

        const querySnapshot = querySuc;


        querySnapshot.forEach(doc => {
            primerDoc = querySnapshot.docs[0] || null;
            ultimoDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
            //items.push([doc.id, doc.data()]);
            items.push({
                id: doc.id,
                ...doc.data()
            });
        });
        //console.log(`primero: ${primerDoc.id} -- Ultimo: ${ultimoDoc.id}`);
        return items;
    } catch (e) {
        throw new Error("Error fetching sucursales: " + e.message);
    }
}

export async function getBefore() {
    try {
        const items = [];

        const querySuc = await db.collection("sucursales")
            .orderBy('estado', 'asc')
            .limit(limite)
            .endBefore(primerDoc)
            .get()

        const querySnapshot = querySuc;


        querySnapshot.forEach(doc => {
            primerDoc = querySnapshot.docs[0] || null;
            ultimoDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
            //doc.data();
            //items.push([doc.id, doc.data()]);
            items.push({
                id: doc.id,
                ...doc.data()
            });

        });
        //console.log(`primero: ${primerDoc.id} -- Ultimo: ${ultimoDoc.id}`);
        return items;
    } catch (e) {
        throw new Error("Error fetching sucursales: " + e.message);
    }
}

export async function deleteSucursal(id) {
    try {
        const response = await db.collection("sucursales").doc(id).delete();
        return response;
    } catch (e) {
        throw new Error("Error deleting sucursal: " + e.message);
    }
}

export async function updateSucursal(id, datos) {
    try {
        console.log(id, datos);
        const response = await db.collection("sucursales").doc(id).update(datos);
        return response;
    } catch (e) {
        throw new Error('Error update sucursal' + e.message)
    }
}