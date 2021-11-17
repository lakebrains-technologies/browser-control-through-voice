//if speech recongnize or speech synthesis in not available in user's browser
if (!window.webkitSpeechRecognition || !window.speechSynthesis) {
    console.log('Sorry this will work only in Chrome for now...');
}
//initialize speech recognize api
 class SpeechAPI {
    constructor(json) {
        let j = json || {};

        let vocal = window.SpeechRecognition || window.webkitSpeechRecognition || SpeechRecognition;
        this.speech = new vocal();
        this.speech.vocal = vocal || false;
        this.speech.lang = j.language || navigator.language;
        this.speech.continuous = j.continuous || false;
        this.speech.interimResults = j.interimResults || false;

        this.status = vocal ? true : false;
        this.started = false;
        this.permanent = null;
    }
}
//on start of speech recognize api
SpeechAPI.prototype.start = function (callback) {
    var objectSpeech = this;
    this.speech.onresult = function (event) {
        // let r = event.results[event.results.length-1][0].transcript;
        var final = "";
        var interim = "";
        for (var i = 0; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                final = event.results[i][0].transcript;
            } else {
                interim += event.results[i][0].transcript;
            }
        }
        objectSpeech.permanent = final;
        callback(objectSpeech.permanent);
    }
    try {
        this.speech.start();
        this.started = true;
    }
    catch (e) {
        console.error(e)
        this.speech = new this.vocal();
        this.started = false;
    }
}
//stop speech recognize api
SpeechAPI.prototype.stop = function () {
    this.started = false;
    this.speech.stop();
}
// reset speech recognize api
SpeechAPI.prototype.reset = function () {
    this.result = null;
    this.permanent = null;
    this.started = false
    try {
        this.stop();
    }
    catch (e) { }
}
