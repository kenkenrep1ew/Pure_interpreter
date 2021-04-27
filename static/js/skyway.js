// Skyway
let localStream;
var myId;
var thierId = "NotSetting";

// カメラ映像取得
navigator.mediaDevices.getUserMedia({video: true, audio: true})
    .then( stream => {
    // 成功時にvideo要素にカメラ映像をセットし、再生
    const videoElm = document.getElementById('my-video');
    videoElm.srcObject = stream;
    videoElm.play();
    // 着信時に相手にカメラ映像を返せるように、グローバル変数に保存しておく
    localStream = stream;
    }).catch( error => {
        // 失敗時にはエラーログを出力
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
    });

//Peer作成
const peer = new Peer({
    // APIkey for Localtest
    // key: 'fc167318-fb92-4eee-a264-2182291225b0',
    // APIkey for Deploy-Server
    key: 'e4c3e686-7c25-4d7d-87dc-5473c39edf53',
    debug: 3
});

//PeerID取得
peer.on('open', () => {
    myId = peer.id;
    document.getElementById('my-id').textContent = myId;
});

// 発信処理
document.getElementById('make-call').onclick = () => {
    theirID = document.getElementById('their-id').value;
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
    const mediaConnection = peer.call(theirID, localStream);
    setEventListener(mediaConnection);
  };
  
// イベントリスナを設置する関数
const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
        // video要素にカメラ映像をセットして再生
        const videoElm = document.getElementById('their-video')
        videoElm.srcObject = stream;
        videoElm.play();
    });
}

//着信処理
peer.on('call', mediaConnection => {
    mediaConnection.answer(localStream);
    thierId = mediaConnection.remoteId;
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
    setEventListener(mediaConnection);
  });
