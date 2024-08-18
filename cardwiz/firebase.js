// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqd42bzzDP1foreVQ0y6LLwCFCoBpK75I",
  authDomain: "cardwiz-16a28.firebaseapp.com",
  projectId: "cardwiz-16a28",
  storageBucket: "cardwiz-16a28.appspot.com",
  messagingSenderId: "424817513953",
  appId: "1:424817513953:web:4308cc0801bda52ca3aea0",
  measurementId: "G-8YNDWHZL4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);