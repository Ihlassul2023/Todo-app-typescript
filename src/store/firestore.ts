// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFE5VpeKtVt2tso_R7Fes9uAg546JYXoM",
  authDomain: "todo-list-3a1ae.firebaseapp.com",
  projectId: "todo-list-3a1ae",
  storageBucket: "todo-list-3a1ae.appspot.com",
  messagingSenderId: "776854160010",
  appId: "1:776854160010:web:067a1a6ba54f87de46e373",
  measurementId: "G-9DVRE34C2P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const store = getFirestore(app);
const auth = getAuth(app);

export { store, analytics, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
