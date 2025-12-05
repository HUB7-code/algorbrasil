import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TODO: Substitua pelos dados do seu projeto Firebase
// Você pode encontrar esses dados no Console do Firebase > Configurações do Projeto
const firebaseConfig = {
    apiKey: "API_KEY_AQUI",
    authDomain: "algor-brasil.firebaseapp.com",
    projectId: "algor-brasil",
    storageBucket: "algor-brasil.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
