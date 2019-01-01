// const Houndify = require('houndify');
// var responseElt = document.getElementById('responseJSON');
// var infoElt = document.getElementById('infoJSON');
// var statusElt = document.getElementById('status');
// var transcriptElt = document.getElementById('dream');

// var clientID = 'RiMx52JTjy6L9At1dnmk3A==';
// var conversationState = null;
// var voiceRequest = null;

// var recorder = new Houndify.AudioRecorder();
// recorder.on('start', function() {
//   //Initialize VoiceRequest
//   voiceRequest = initVoiceRequest(recorder.sampleRate);
//   document.getElementById('voiceIcon').className =
//     'selected radio icon big red';
// });

// recorder.on('data', function(data) {
//   voiceRequest.write(data);
// });

// recorder.on('end', function() {
//   voiceRequest.end();
//   statusElt.innerText = 'Stopped recording. Waiting for response...';
//   document.getElementById('voiceIcon').className = 'unmute big icon';
//   document.getElementById('textSearchButton').disabled = false;
//   document.getElementById('query').readOnly = false;
// });

// recorder.on('error', function(error) {
//   voiceRequest.abort();
//   statusElt.innerText = 'Error: ' + error;
//   document.getElementById('voiceIcon').className = 'unmute big icon';
//   document.getElementById('textSearchButton').disabled = false;
//   document.getElementById('query').readOnly = false;
// });

// const initVoiceRequest = sampleRate => {
//   // responseElt.parentNode.hidden = true;
//   // infoElt.parentNode.hidden = true;

//   var voiceRequest = new Houndify.VoiceRequest({
//     //Your Houndify Client ID
//     clientId: clientID,

//     //For testing environment you might want to authenticate on frontend without Node.js server.
//     //In that case you may pass in your Houndify Client Key instead of "authURL".
//     //clientKey: "YOUR_CLIENT_KEY",

//     //Otherwise you need to create an endpoint on your server
//     //for handling the authentication.
//     //See SDK's server-side method HoundifyExpress.createAuthenticationHandler().
//     authURL: '/houndifyAuth',

//     //REQUEST INFO JSON
//     //See https://houndify.com/reference/RequestInfo
//     requestInfo: {
//       UserID: 'test_user',
//       Latitude: 37.388309,
//       Longitude: -121.973968
//     },

//     //Pass the current ConversationState stored from previous queries
//     //See https://www.houndify.com/docs#conversation-state
//     conversationState: conversationState,

//     //Sample rate of input audio
//     sampleRate: sampleRate,

//     //Enable Voice Activity Detection
//     //Default: true
//     enableVAD: true,

//     //Partial transcript, response and error handlers
//     onTranscriptionUpdate: onTranscriptionUpdate,
//     onResponse: function(response, info) {
//       recorder.stop();
//       onResponse(response, info);
//     },
//     onError: function(err, info) {
//       recorder.stop();
//       onError(err, info);
//     }
//   });

//   return voiceRequest;
// };

// export const onMicrophoneClick = () => {
//   if (recorder && recorder.isRecording()) {
//     recorder.stop();
//     return;
//   }

//   recorder.start();

//   statusElt.innerText = 'Streaming voice request...';
//   document.getElementById('voiceIcon').className =
//     'loading circle notched icon big';
//   document.getElementById('textSearchButton').disabled = true;
//   document.getElementById('query').readOnly = true;
// };

// export const onFileUpload = () => {
//   var reader = new FileReader();
//   reader.onload = function() {
//     //In browsers only you can also upload and decode
//     //audio file using decodeArrayBuffer() method
//     //Stream 8/16 kHz mono 16-bit little-endian PCM samples
//     //in Int16Array() chunks to backend
//     var arrayBuffer = reader.result;
//     Houndify.decodeAudioData(arrayBuffer, function(err, result) {
//       statusElt.innerText = 'Streaming audio from file...';
//       let voiceRequest = initVoiceRequest(result.sampleRate);
//       voiceRequest.write(result.audioData);
//       voiceRequest.end();
//     });

//     statusElt.innerText = 'Decoding audio from file...';
//   };

//   var file = document.getElementById('file').files[0];
//   reader.readAsArrayBuffer(file);
// };

// //Fires after server responds with Response JSON
// //Info object contains useful information about the completed request
// //See https://houndify.com/reference/HoundServer
// const onResponse = (response, info) => {
//   if (response.AllResults && response.AllResults.length) {
//     //Pick and store appropriate ConversationState from the results.
//     //This example takes the default one from the first result.
//     conversationState = response.AllResults[0].ConversationState;
//   }

//   statusElt.innerText = 'Received response.';
//   responseElt.parentNode.hidden = false;
//   responseElt.value = response.stringify(undefined, 2);
//   infoElt.parentNode.hidden = false;
//   infoElt.value = JSON.stringify(info, undefined, 2);
// };

// //Fires if error occurs during the request
// const onError = (err, info) => {
//   statusElt.innerText = 'Error: ' + JSON.stringify(err);
//   responseElt.parentNode.hidden = true;
//   infoElt.parentNode.hidden = false;
//   infoElt.value = JSON.stringify(info, undefined, 2);
// };

// //Fires every time backend sends a speech-to-text
// //transcript of a voice query
// //See https://houndify.com/reference/HoundPartialTranscript
// const onTranscriptionUpdate = transcript => {
//   transcriptElt.value = transcript.PartialTranscript;
// };
