import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyC7cAaZNdz8U8hVvFYzpFadvloXnq3taoc",
  authDomain: "task-manager-c8b28.firebaseapp.com",
  projectId: "task-manager-c8b28",
  storageBucket: "task-manager-c8b28.appspot.com",
  messagingSenderId: "599424071101",
  appId: "1:599424071101:web:e209e0a9e0beaaafc10ed4"
});

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, firebase };