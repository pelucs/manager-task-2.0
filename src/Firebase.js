import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: "SUA CHAVE",
  authDomain: "SUA CHAVE",
  projectId: "SUA CHAVE",
  storageBucket: "SUA CHAVE",
  messagingSenderId: "SUA CHAVE",
  appId: "SUA CHAVE"
});

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, firebase };
