// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref as databaseRef, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmocJKWZ7XxcR-My5osvgYl3ZTXbnr9Tk",
  authDomain: "registration-c5bcd.firebaseapp.com",
  databaseURL: "https://registration-c5bcd-default-rtdb.firebaseio.com",
  projectId: "registration-c5bcd",
  storageBucket: "registration-c5bcd.appspot.com",
  messagingSenderId: "922888884501",
  appId: "1:922888884501:web:6c7bf4ed770b6e361c191c",
  measurementId: "G-7R7KE1DC2N"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);


export { database, databaseRef, push, storage, storageRef, uploadBytes, getDownloadURL, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile  };