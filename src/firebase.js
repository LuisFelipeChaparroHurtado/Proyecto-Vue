import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmocJKWZ7XxcR-My5osvgYl3ZTXbnr9Tk",
  authDomain: "registration-c5bcd.firebaseapp.com",
  projectId: "registration-c5bcd",
  storageBucket: "registration-c5bcd.appspot.com",
  messagingSenderId: "922888884501",
  appId: "1:922888884501:web:6c7bf4ed770b6e361c191c",
  measurementId: "G-7R7KE1DC2N"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);

export { database, storage, ref, uploadBytes, getDownloadURL, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile };
