import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAU5M4RzJKwvODwNmzHjjkoTr5L5kOZ-g",
  authDomain: "radio-frequency-app.firebaseapp.com",
  projectId: "radio-frequency-app",
  storageBucket: "radio-frequency-app.firebasestorage.app",
  messagingSenderId: "548095500165",
  appId: "1:548095500165:web:99bc10200044c83782eeec",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);
// export const googleProvider = new auth.

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebase;
