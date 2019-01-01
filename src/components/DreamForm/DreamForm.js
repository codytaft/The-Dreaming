import React, { Component } from 'react';
import { postDreams } from '../../utilities/apicalls';
import './DreamForm.css';
const Houndify = require('houndify');
const recorder = new Houndify.AudioRecorder();

class DreamForm extends Component {
  constructor() {
    super();
    this.conversationState = null;
    this.voiceRequest = null;
    this.clientID = 'hiEsVW0ez3-afuRuemSwdw==';
    const me = this;

    recorder.on('start', function() {
      //Initialize VoiceRequest
      this.voiceRequest = me.initVoiceRequest(recorder.sampleRate);
      me.refs.Microphone.className = 'selected radio icon big red';
    });

    recorder.on('data', function(data) {
      this.voiceRequest.write(data);
    });

    recorder.on('end', function() {
      this.voiceRequest.end();
      me.refs.Status.innerText = 'Stopped recording. Waiting for response...';
      me.refs.Microphone.className = 'unmute big icon';
      me.refs.SearchButton.disabled = false;
      me.refs.Dream.readOnly = false;
    });

    recorder.on('error', function(error) {
      this.voiceRequest.abort();
      me.refs.Status.innerText = 'Error: ' + error;
      me.refs.Microphone.className = 'unmute big icon';
      me.refs.SearchButton.disabled = false;
      me.refs.Dream.readOnly = false;
    });

    this.state = {
      date: this.todaysDate(),
      dream: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await postDreams(this.state.date, this.state.dream);
    this.setState({
      date: this.todaysDate(),
      dream: ''
    });
  };

  todaysDate = () => {
    let curr = new Date();
    curr.setDate(curr.getDate());
    let date = curr.toISOString().substr(0, 10);
    return date;
  };

  initVoiceRequest = sampleRate => {
    this.refs.ResponseJSON.parentNode.hidden = true;
    this.refs.InfoJSON.parentNode.hidden = true;

    var voiceRequest = new Houndify.VoiceRequest({
      //Your Houndify Client ID
      clientId: this.clientID,

      //For testing environment you might want to authenticate on frontend without Node.js server.
      //In that case you may pass in your Houndify Client Key instead of "authURL".
      //clientKey: "YOUR_CLIENT_KEY",

      //Otherwise you need to create an endpoint on your server
      //for handling the authentication.
      //See SDK's server-side method HoundifyExpress.createAuthenticationHandler().
      authURL: '/houndifyAuth',

      //REQUEST INFO JSON
      //See https://houndify.com/reference/RequestInfo
      requestInfo: {
        UserID: 'test_user',
        Latitude: 37.388309,
        Longitude: -121.973968
      },

      //Pass the current ConversationState stored from previous queries
      //See https://www.houndify.com/docs#conversation-state
      conversationState: this.conversationState,

      //Sample rate of input audio
      sampleRate: sampleRate,

      //Enable Voice Activity Detection
      //Default: true
      enableVAD: true,

      //Partial transcript, response and error handlers
      onTranscriptionUpdate: this.onTranscriptionUpdate,

      onResponse: function(response, info) {
        recorder.stop();
        this.onResponse(response, info);
      },

      onError: function(err, info) {
        recorder.stop();
        this.onError(err, info);
      }
    });
    return voiceRequest;
  };

  onMicrophoneClick = () => {
    if (recorder && recorder.isRecording()) {
      recorder.stop();
      return;
    }

    recorder.start();

    this.refs.Status.innerText = 'Streaming voice request...';
    this.refs.Microphone.className = 'loading circle notched icon big';
    this.refs.SearchButton.disabled = true;
    this.refs.Dream.readOnly = true;
  };

  onFileUpload = () => {
    var reader = new FileReader();
    reader.onload = function() {
      //In browsers only you can also upload and decode
      //audio file using decodeArrayBuffer() method
      //Stream 8/16 kHz mono 16-bit little-endian PCM samples
      //in Int16Array() chunks to backend
      var arrayBuffer = reader.result;
      Houndify.decodeAudioData(arrayBuffer, function(err, result) {
        this.refs.Status.innerText = 'Streaming audio from file...';
        let voiceRequest = this.initVoiceRequest(result.sampleRate);
        voiceRequest.write(result.audioData);
        voiceRequest.end();
      });

      this.refs.Status.innerText = 'Decoding audio from file...';
    };

    var file = document.getElementById('file').files[0];
    reader.readAsArrayBuffer(file);
  };

  //Fires after server responds with Response JSON
  //Info object contains useful information about the completed request
  //See https://houndify.com/reference/HoundServer
  onResponse = (response, info) => {
    if (response.AllResults && response.AllResults.length) {
      //Pick and store appropriate ConversationState from the results.
      //This example takes the default one from the first result.
      this.conversationState = response.AllResults[0].ConversationState;
    }

    this.refs.Status.innerText = 'Received response.';
    this.refs.ResponseJSON.parentNode.hidden = false;
    this.refs.ResponseJSON.value = response.stringify(undefined, 2);
    this.refs.InfoJSON.parentNode.hidden = false;
    this.refs.InfoJSON.value = JSON.stringify(info, undefined, 2);
  };

  //Fires if error occurs during the request
  onError = (err, info) => {
    this.refs.Status.innerText = 'Error: ' + JSON.stringify(err);
    this.refs.ResponseJSON.parentNode.hidden = true;
    this.refs.InfoJSON.parentNode.hidden = false;
    this.refs.InfoJSON.value = JSON.stringify(info, undefined, 2);
  };

  //Fires every time backend sends a speech-to-text
  //transcript of a voice query
  //See https://houndify.com/reference/HoundPartialTranscript
  onTranscriptionUpdate = transcript => {
    this.refs.Dream.value = transcript.PartialTranscript;
  };

  render() {
    return (
      <main className="app-home">
        <form className="dream-form" onSubmit={this.handleSubmit}>
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
            className="date-input"
          />
          <textarea
            ref="Dream"
            type="text"
            value={this.state.dream}
            onChange={this.handleChange}
            name="dream"
            className="dream-input"
            placeholder="Click on microphone icon or type in dream"
          />
          <div
            className="ui icon basic label button"
            onClick={this.onMicrophoneClick}
          >
            <i id="voiceIcon" ref="Microphone" className="unmute big icon" />
          </div>
          <button className="save-dream-btn" ref="SearchButton">
            Save Dream
          </button>
        </form>
        <div id="status" ref="Status" className="ui info message">
          Click on microphone icon or type in the text query.
        </div>
        <div className="ui field" hidden>
          <label>Response object</label>
          <textarea id="responseJSON" ref="ResponseJSON" />
        </div>
        <div className="ui field" hidden>
          <label>Search info object</label>
          <textarea id="infoJSON" ref="InfoJSON" />
        </div>
      </main>
    );
  }
}

export default DreamForm;
