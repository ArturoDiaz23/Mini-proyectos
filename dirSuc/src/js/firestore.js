const db = firebase.firestore();

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

        const querySuc = await db.collection("sucursales").get()

        const querySnapshot = querySuc;
        querySnapshot.forEach(doc => {
            //doc.data();
            items.push([doc.id, doc.data()]);
        });
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