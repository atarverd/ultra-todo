import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz6Nu20vGhhJleXA4eN1SFdHhYjU0NfDE",
  authDomain: "todo-f677f.firebaseapp.com",
  projectId: "todo-f677f",
  storageBucket: "todo-f677f.appspot.com",
  messagingSenderId: "603427529868",
  appId: "1:603427529868:web:24082deda57073e3cc47a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
