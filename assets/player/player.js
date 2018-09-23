class MsPlayer{
    constructor(opt){
        this.dom = opt.container;
        this.audioInfo = JSON.parse(JSON.stringify(opt.audioObj));
        this.audio = this.dom.querySelector('audio');
        this.imghover = this.dom.querySelector('img');
        this.addEvent();
        
        this.initPlay();
    }
    addEvent(){
        let _self = this;
        this.audio.addEventListener('pause', function (e) {
            _self.pause();
        }, false)
        this.audio.addEventListener('play', function (e) {
            _self.play();
        }, false)
        this.imghover.addEventListener('click', function (e) {
            // _self.play();
            if (_self.audio.className == 'hideAudioAni') {
                _self.audio.className = 'showAudioAni'
            }
            else {
                _self.audio.className = 'hideAudioAni'
            }
        }, false)
    }
    initPlay(){
        this.imghover.setAttribute('src', this.audioInfo.cover);
        this.imghover.className = 'imghoverAni';
        this.audio.setAttribute('src', this.audioInfo.url);
        this.audio.play();
    }
    update(audioInfo){
        this.audioInfo = JSON.parse(JSON.stringify(opt.audioObj));
        this.imghover.className = '';
        this.pause();
        this.audio.setAttribute('src', audioInfo.url);
        this.audio.play();
        this.imghover.className = 'imghoverAni';
    }
    pause(){
        this.audio.pause();
        this.imghover.className = '';
    }
    play(){
        this.audio.play();
        this.imghover.className = 'imghoverAni';
    }
}