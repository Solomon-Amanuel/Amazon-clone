// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"
// auth
import { getAuth } from "firebase/auth";

import "firebase/compat/firestore"
import "firebase/compat/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0QDa-ITagQV0aPPIGGY2jMTTvjL6FBcM",
  authDomain: "clone-a1649.firebaseapp.com",
  projectId: "clone-a1649",
  storageBucket: "clone-a1649.firebasestorage.app",
  messagingSenderId: "540960948017",
  appId: "1:540960948017:web:dad19c879b215dd46b3a10",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()
