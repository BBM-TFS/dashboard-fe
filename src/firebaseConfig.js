// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAF-XZygL_7F6ET_2uevHevK7vvKuRbCNI",
//   authDomain: "YOUR_AUTH_DOMAIN",
  projectId:  "animals-b50d7",
//   storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "336150923190",
  appId: "1:336150923190:android:daefcec25e3afcfa4be317",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export default firebaseApp;
