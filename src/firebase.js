import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { collection, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjeXmy9PleQwjp95y-rIS7sQgWvO_BivU",
  authDomain: "disney-clone-5297d.firebaseapp.com",
  projectId: "disney-clone-5297d",
  storageBucket: "disney-clone-5297d.appspot.com",
  messagingSenderId: "224544900392",
  appId: "1:224544900392:web:7483888367c1425670bc1d",
  measurementId: "G-EQ235T9R8M",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, doc };
