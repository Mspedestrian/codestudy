
const imgNameList = ['xingxing1.png','xingxing2.png']
let imgSourceList = {};
window.onload = function(){
    let canvas = document.querySelector('#menuCanvas')
    // canvas.width = 500;
    // canvas.height = 400;
    let ctx = canvas.getContext('2d');
    
    // define xingxing image pos array
    let dataList = [{
        x:0,
        y:0,
        img:'xingxing1',
        opacity:1,
    }, {
        x: 60,
        y: 60,
        img: 'xingxing2',
        opacity: 1,
    }, {
        x: 90,
        y: 10,
        img: 'xingxing2',
        opacity: 1,
    }, {
        x: 120,
        y: 0,
        img: 'xingxing1',
        opacity: 1,
    }, {
        x: 160,
        y: 30,
        img: 'xingxing2',
        opacity: 1,
    }, {
        x: 300,
        y: 50,
        img: 'xingxing1',
        opacity: 1,
    }, {
        x: 350,
        y: 54,
        img: 'xingxing2',
        opacity: 1,
    }, {
        x: 390,
        y: 20,
        img: 'xingxing2',
        opacity: 1,
    }, {
        x: 420,
        y: 55,
        img: 'xingxing1',
        opacity: 1,
    }, {
        x: 500,
        y: 44,
        img: 'xingxing2',
        opacity: 1,
    }, {
        x: 580,
        y: 5,
        img: 'xingxing2',
        opacity: 1,
    }, {
        x: 690,
        y: 21,
        img: 'xingxing1',
        opacity: 1,
    }];
    let aniId = 0;
    loadResource(imgNameList)
    .then((data)=>{
        imgSourceList = data;
        loop();
    })
    function loop(){
        update();
        render(ctx);
        aniId++;
        if(aniId == 2) {
            aniId = 0;
        }
        window.requestAnimationFrame(loop)
    }
    function update(){
        for(let item of dataList){
            // if(aniId ==1) {
            //     let random = Math.random();
            //     if (random > 0.9) {
            //         item.opacity = 0;
            //     }
            //     else {
            //         item.opacity = 1;
            //     }
            // }
            
            item.y++
            if(item.y>canvas.height){
                item.y = 0;
            }
        }
    }
    function render(ctx){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for(let item of dataList) {
            if(item.opacity == 0){
                continue;
            }
            ctx.drawImage(
                imgSourceList[item.img], 
                item.x, 
                item.y, 
                30,
                30 / imgSourceList[item.img].width * imgSourceList[item.img].height
            );
            
        }
    }
}
// 加载图片资源
function loadResource(list){
    let len = list.length;
    let imgList = {};
    let num = 0;
    return new Promise(function (resolve,reject){
        for (let item of list) {
            let type = item.slice(-3);
            let name = item.slice(0, -4)

            if (type !== 'png' && type !== 'jpg') {
                // num++;
                continue;
            }
            let imgObj = new Image();
            imgObj.src = `/assets/img/${item}`;
            imgObj.onload = function () {
                // imgList
                imgList[name] = imgObj;
                num++;
                if (num == list.length) {
                    // console.log('加载完成')
                    resolve(imgList)
                }
            }
            imgObj.onerror = function(e){
                reject(e)
            }
        }
    })
    
    
}