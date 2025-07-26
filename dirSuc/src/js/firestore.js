const db = firebase.firestore();

export async function insert(items) {
    try {
        const response = await db.collection("sucursales").add(items);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getSucursales() {
    try {
        let items = [];
        // const querySucursales = await db.collection("sucursales").where("id_user", "==", userId).get();

        // querySucursales.forEach(element => {
        //     items.push(element.data());
        // });
        const querySucursales = await db
            .collection("sucursales")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    items.push(doc.data());
                });
            });
        return items;
    } catch (error) {
        throw new Error("Error fetching sucursales: " + error.message);
    }
}