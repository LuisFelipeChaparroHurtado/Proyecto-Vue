// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref as databaseRef, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOJEEDNrj3BSzhwfJDad3_dWURSWtnvUo",
  authDomain: "bd-formularios.firebaseapp.com",
  databaseURL: "https://bd-formularios-default-rtdb.firebaseio.com",
  projectId: "bd-formularios",
  storageBucket: "bd-formularios.firebasestorage.app",
  messagingSenderId: "329607253082",
  appId: "1:329607253082:web:88182f53c2f25a5bdddc63",
  measurementId: "G-DHPZ3F7E69"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);


export { database, databaseRef, push, storage, storageRef, uploadBytes, getDownloadURL, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword  };