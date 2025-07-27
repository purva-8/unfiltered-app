import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQM_VW0MJHGkABejbTkdS2wxD0sc26OPw",
  authDomain: "messy-me.firebaseapp.com",
  projectId: "messy-me",
  storageBucket: "messy-me.firebasestorage.app",
  messagingSenderId: "632692730929",
  appId: "1:632692730929:web:c3a8c219aca841f3d03910",
  measurementId: "G-4DE2V6R0QT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
