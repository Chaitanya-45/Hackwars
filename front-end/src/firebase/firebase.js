import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAUnIFb5kBNmneXIxfGsy4eSpOSJwSzlW0",
    authDomain: "svasthmaitri.firebaseapp.com",
    databaseURL: "https://svasthmaitri-default-rtdb.firebaseio.com",
    projectId: "svasthmaitri",
    storageBucket: "svasthmaitri.appspot.com",
    messagingSenderId: "740156489180",
    appId: "1:740156489180:web:90584ca68310c539b2e319"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const database = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, database, googleProvider };
