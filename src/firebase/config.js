import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBWZKWDixBLhfs2ePhg6Sd4KjkhSe3vqpc",
    authDomain: "lekrev-f7505.firebaseapp.com",
    projectId: "lekrev-f7505",
    storageBucket: "lekrev-f7505.appspot.com",
    messagingSenderId: "939399627375",
    appId: "1:939399627375:web:8b6d51e0475d10628e439a"
};


const app = initializeApp(firebaseConfig);

const db=getFirestore(app);
const auth=getAuth(app);

export {
    db,auth
}