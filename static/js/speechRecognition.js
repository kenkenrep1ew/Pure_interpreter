
document.getElementById('my-language-register').onclick = () => {
    speech.lang = myLanguage.value;
};

window.addEventListener("load", (e) => {
    speech.start();
});

speech.onresult = function(e){
  speech.stop();
  mySpeaking.innerHTML = e.results[0][0].transcript;
  // Here !!!
  q = "q="+e.results[0][0].transcript;
  sourceData = q + "&target=en&key=" + key;
  
  //Use Translation API bu ajax.
  $.ajax({
		url:"https://translation.googleapis.com/language/translate/v2",
		type:"POST",
		data:sourceData,
		dataType:"json",
		timespan:1000 
  }).done(function(data,textStatus){
    console.log(textStatus);
    // console.log(data.data.translations[0].translatedText);
    responseText = data.data.translations[0].translatedText;
    myTranslated.innerHTML = responseText;
  }).fail(function(textStatus){
    console.log(textStatus);
  }).always(function(){
    console.log("Done Ajax");
  });
  console.log(responseText);

  //Push to firebase
  newPostRef.ref(myId).push({
          username: username.value,
          text: e.results[0][0].transcript,
          lang: speech.lang,
      });
      // a_text.value = "";
  // document.querySelector("#speech_out").innerHTML += "<p>You speak: " + e.results[0][0].transcript + "</p>";

};
// newPostRef.ref(theirId).push({username: "ken-sp",text: "いけてんのか",lang: "ja-JP",});
speech.onend = () => {
  console.log("Speech Recognition is end.");
  speech.start();
}
// speechSynthesis
// var synth = window.speechSynthesis;
// var btn = document.querySelector("#synthesis");
// var text = document.querySelector("#synth_test1").textContent;

// btn.onclick = function(e) {
//   var utter = new SpeechSynthesisUtterance(text);
//   utter.lang = 'en-US';
//   utter.voice = synth.getVoices()[1];
//   synth.speak(utter);
// }