// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCG3lDUNHwbjB3znqL7zPO_1_Ck4wm2huI",
  authDomain: "flashcard-ce445.firebaseapp.com",
  projectId: "flashcard-ce445",
  storageBucket: "flashcard-ce445.appspot.com",
  messagingSenderId: "306041916655",
  appId: "1:306041916655:web:88fb7a06f6c541907f9f1a"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);