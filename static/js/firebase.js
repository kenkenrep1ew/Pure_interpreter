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
let thierRoom = thierId;

const send = document.getElementById("send");
const username = document.getElementById("username");
const text = document.getElementById("msg_text");
const thierSpeaking = document.getElementById("their-speaking");
const thierTranslated = document.getElementById("their-translated");

//Register User
document.getElementById('firebase-register').onclick = () => {
    newPostRef.ref("CC/" + username.value + "/").set({peerId: myId});
};

//Read new data when peer says something.
newPostRef.ref(thierId).on("child_added", function(data){
    const v = data.val();
    const k = data.key;

    thierSpeaking.innerHTML = v.lang + ": " + v.text;

    q = "q=" + v.text;
    sourceData = q + "&target=en&key=AIzaSyCvYIoj74wELbE6TaMYRsDRrA4SLpre6ko";
    $.ajax({
    url:"https://translation.googleapis.com/language/translate/v2",
    type:"POST",
    data:sourceData,
    dataType:"json",
    timespan:1000 
    }).done(function(data,textStatus){
        console.log(textStatus);
        // console.log(data.data.translations[0].translatedText);
        thierTranslated.innerHTML = ' Translated:' + data.data.translations[0].translatedText;
    }).fail(function(textStatus){
        console.log(textStatus);
    }).always(function(){
        console.log("Done Ajax Thier-Translating");
    }); 
});