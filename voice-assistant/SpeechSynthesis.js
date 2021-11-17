//initialize speech synthesis api
class SpeechSynthesisRecorder {
    constructor(text = '') {
        let utteranceOptions = {
            voice: "",
            lang: "en-US",
            volume: 1,
            pitch: 1,
            rate: 0.8
        }
        if (text === '') throw new Error('no words to synthesize')
        this.text = text
        this.utterance = new SpeechSynthesisUtterance(this.text)
        this.speechSynthesis = window.speechSynthesis
        if (utteranceOptions) {
            if (utteranceOptions.voice) {
                this.speechSynthesis.onvoiceschanged = e => {
                    const voice = this.speechSynthesis.getVoices().find(({
                        name: _name
                    }) => _name === utteranceOptions.voice)
                    this.utterance.voice = voice
                }
                this.speechSynthesis.getVoices()
            }
            let {
                lang, rate, pitch, volume
            } = utteranceOptions;
            Object.assign(this.utterance, {
                lang, rate, pitch, volume
            })
        }
    }
    start(text = '') {
        if (text) this.text = text
        if (this.text === '') throw new Error('no words to synthesize')
        return navigator.mediaDevices.getUserMedia({
            audio: true
        })
            .then(stream => navigator.mediaDevices.enumerateDevices()
                .then(devices => {
                    const audiooutput = devices.find(device => device.kind == "audiooutput");
                    stream.getTracks().forEach(track => track.stop())
                    if (audiooutput) {
                        const constraints = {
                            deviceId: {
                                exact: audiooutput.deviceId
                            }
                        };
                        return navigator.mediaDevices.getUserMedia({
                            audio: constraints
                        });
                    }
                    return navigator.mediaDevices.getUserMedia({
                        audio: true
                    });
                }))
            .then(stream => new Promise(resolve => {
                this.speechSynthesis.speak(this.utterance)
            }))
    }
}
