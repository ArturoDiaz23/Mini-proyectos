const db = firebase.firestore();

export async function insert(items) {
    try {
        const response = await db.collection("urls").add(items);
        return response;
    } catch (e) {
        throw new Error("Error insert: " + e.message);
    }
}

export async function get() {
    try {
        const items = [];

        const querySuc = await db.collection("urls").get()

        const querySnapshot = querySuc;
        querySnapshot.forEach(doc => {
            //doc.data();
            items.push([doc.id, doc.data()]);
        });
        return items;
    } catch (e) {
        throw new Error("Error fetching: " + e.message);
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