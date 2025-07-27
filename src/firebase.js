// client/src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQM_VW0MJHGkABejbTkdS2wxD0sc26OPw",
  authDomain: "messy-me.firebaseapp.com",
  projectId: "messy-me",
  storageBucket: "messy-me.firebasestorage.app",
  messagingSenderId: "632692730929",
  appId: "1:632692730929:web:c3a8c219aca841f3d03910",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
