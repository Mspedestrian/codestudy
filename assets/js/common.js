
let timer = null;
class Back{
    constructor(opt){
        this.imgList = opt.imgList;
        this.container = document.querySelector('body');
        this.init();
    }
    init(){
        let _self = this;
        timer = setInterval(function(){
            let i = Math.round(Math.random() * (_self.imgList.length-1))
            console.log(i)
            _self.container.style.backgroundImage = 'url(' + _self.imgList[i]+')'
        },3000)
    }
    pause(){
        clearInterval(timer)
        timer = null;
    }
    play(){
        this.init();
    }
}