// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-e74a5.firebaseapp.com",
    projectId: "mern-auth-e74a5",
    storageBucket: "mern-auth-e74a5.appspot.com",
    messagingSenderId: "617504732963",
    appId: "1:617504732963:web:5e627acf852d13c7fdbe96"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);