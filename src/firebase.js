import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyBR34v2ZA4ue759V-6hOPOkpvaZifiUcbk",
    authDomain: "facebook-messenger-clone-50a23.firebaseapp.com",
    projectId: "facebook-messenger-clone-50a23",
    storageBucket: "facebook-messenger-clone-50a23.appspot.com",
    messagingSenderId: "177489602337",
    appId: "1:177489602337:web:106a8fd58096c81d4cc060"

});

const db = getFirestore();

export default db; // export the db variable to use in other files 