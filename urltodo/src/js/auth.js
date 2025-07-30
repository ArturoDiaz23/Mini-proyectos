
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

auth.languageCode = 'es';

export async function login() {
    try {
        const reponse = await auth.signInWithPopup(provider);
        return reponse.user;
    } catch (error) {
        throw new Error(`Error during login: ${error.message}`);
    }
}

export async function logout() {
    try {
        auth.signOut();
        console.log("User signed out");
    } catch (error) {
        throw new Error(`Error during logout: ${error.message}`);
    }
}