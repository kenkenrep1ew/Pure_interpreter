// Firebase RealtimeDB 
var newPostRef = firebase.database();

//Register User
document.getElementById('firebase-register').onclick = () => {
    newPostRef.ref("CC/" + username.value + "/").set({peerId: myId});
};

//Get the Peer id from firebase
document.getElementById('firebase-get-peer-id').onclick = () => {
    newPostRef.ref("CC/").on('value', (snapshot) => {
        var name = thierName.value;
        d = snapshot.val();
        document.getElementById('thier-id').textContent = d[name].peerId;
        theirId = d[name].peerId;
    });
    //Read new data when peer says something.
    newPostRef.ref(theirId).on("child_added", function(data){
        console.log("theirId is " + theirId);
        const v = data.val();
        console.log(v.text);
        const k = data.key;

        thierSpeaking.innerHTML = v.lang + ": " + v.text;

        q = "q=" + v.text;
        sourceData = q + "&target=en&key=" + key;
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
};

