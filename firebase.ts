import { initializeApp } from "firebase/app"
import { FirebaseOptions, FirebaseApp } from "@firebase/app-types"

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyC8rOZhIM_YOpvCOPDPjLKWQNs2R_sMDTE",
    authDomain: "cs50-final-project-1abf9.firebaseapp.com",
    projectId: "cs50-final-project-1abf9",
    storageBucket: "cs50-final-project-1abf9.appspot.com",
    messagingSenderId: "157507248240",
    appId: "1:157507248240:web:d6468142d17bba74b714b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig) as FirebaseApp