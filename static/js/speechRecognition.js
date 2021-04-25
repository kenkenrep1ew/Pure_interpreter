// SpeechRecognition
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

var speech = new SpeechRecognition();
speech.lang = "ja-JP";

responseText = "";
const mySpeaking = document.getElementById("my-speaking");
const myTranslated = document.getElementById("my-translated");
var myRoom = myId;


window.addEventListener("load", (e) => {
    speech.start();
});

speech.onresult = function(e){
  speech.stop();
  mySpeaking.innerHTML = e.results[0][0].transcript;
  // Here !!!
  q = "q="+e.results[0][0].transcript;
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
    responseText = data.data.translations[0].translatedText;
    myTranslated.innerHTML += ' Translated:' + responseText;
  }).fail(function(textStatus){
    console.log(textStatus);
  }).always(function(){
    console.log("Done Ajax");
  });
  console.log(responseText);

  //Here
  newPostRef.ref(myRoom).push({
          username: username.value,
          a_text: e.results[0][0].transcript,
          lang: speech.lang,
      });
      // a_text.value = "";
  // document.querySelector("#speech_out").innerHTML += "<p>You speak: " + e.results[0][0].transcript + "</p>";

};

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