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

// firebase
var newPostRef = firebase.database();
let room = "room1"

const send = document.getElementById("send");
const username = document.getElementById("username");
const a_text = document.getElementById("msg_text");
const output = document.getElementById("output");

//Read new data when peer says something.
newPostRef.ref(room).on("child_added", function(data){
    const v = data.val();
    const k = data.key;
    let str = "";

    // str += 'Name:' + v.username + '  Says:' + v.a_text + ' Translated:' + v.translation;
    str += 'Name:' + v.username + '  Says:' + v.a_text;
    // if (v.username === username){
      output.innerHTML = str;
    // }
    
});