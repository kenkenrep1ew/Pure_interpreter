//firebase.js
const send = document.getElementById("send");
const username = document.getElementById("username");
const text = document.getElementById("msg_text");
const thierSpeaking = document.getElementById("their-speaking");
const thierTranslated = document.getElementById("their-translated");
const thierName = document.getElementById("thier-name");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCrBDPXwTKsgiHbLbUsjxq3oSWrCkWvmtw",
    authDomain: "chatapp-1cc84.firebaseapp.com",
    databaseURL: "https://chatapp-1cc84-default-rtdb.firebaseio.com/",
    projectId: "chatapp-1cc84",
    storageBucket: "chatapp-1cc84.appspot.com",
    messagingSenderId: "302666486109",
    appId: "1:302666486109:web:58cbc9d7f6c942a440d8b4",
    measurementId: "G-NRLG6VXKYJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();