// Import the functions you need from the SDKs you need

import firebase from 'firebase';

import 'firebase/analytics';
import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANVQl0zXLxG0MQ6ZcJigLsoLlYsYrG2vc",
    authDomain: "bookstore-293d8.firebaseapp.com",
    projectId: "bookstore-293d8",
    storageBucket: "bookstore-293d8.appspot.com",
    messagingSenderId: "843380048518",
    appId: "1:843380048518:web:95a2a40869a9c9c521c707",
    measurementId: "G-GR2KZ1PXSR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const auth = firebase.auth();

export { auth }
export default firebase;
