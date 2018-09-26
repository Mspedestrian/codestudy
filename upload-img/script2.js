window.onload = function () {

    // const pixel = 180*180
    let selectBtn = document.querySelector('.select-btn');
    let uploadBtn = document.querySelector('.upload-btn');
    let input = document.querySelector('#imgFile');
    let bigOpt = document.querySelector('.big-opt');
    let smallOpt = document.querySelector('.small-opt');
    let sourceCanvas = document.querySelector('#sourceCanvas');
    let sourceCtx = sourceCanvas.getContext('2d');
    let endCanvas = document.querySelector('#endCanvas');
    let endCtx = endCanvas.getContext('2d');

    const SW = sourceCanvas.width;
    const SH = sourceCanvas.height;
    const EW = endCanvas.width
    const EH = endCanvas.height;
    let setpixcel = 1;
    let setHeight = 200, setWidth = 200;
    let sourceImg;

    


    if (setpixcel > 1) {
        //宽大
        setWidth = 200;
        setHeight = 200 / setpixcel;
    }
    else if (setpixcel < 1) {
        //高大
        setHeight = 200;
        setWidth = 200 * setpixcel;
    }
    let pixcel;
    let sourceImgData;
    selectBtn.addEventListener('click', function (e) {
        input.click(function () {

        });
        // console.log(input.files)
    })
    input.addEventListener('change', function () {

        let filereader = new FileReader();
        sourceImg = new Image();
        filereader.readAsDataURL(input.files[0]);
        filereader.onload = (e) => {
            console.log(e)

            sourceImg.src = e.target.result;
        }
        sourceImg.onload = (e) => {
            // sourceCanvas.width = sourceImg.width;
            // sourceCanvas.height = sourceImg.height;
            if(SW<SH){
                pixcel = Math.round(SW / sourceImg.width * 100) / 100;
            }
            else {
                pixcel = Math.round(SH / sourceImg.height * 100) / 100;
            }
            
            sourceImgData = sourceImg;
            sourceCtx.drawImage(sourceImg, 0, 0, sourceImg.width * pixcel, sourceImg.height * pixcel)
            let imgData = sourceCtx.getImageData(0, 0, sourceImg.width * pixcel, sourceImg.height * pixcel);
            
            sourceCtx.fillStyle = "rgba(0,0,0,0.6)"
            // sourceCtx.fillStyle = "blue"
            sourceCtx.fillRect(0, 0, (SW-setWidth)/2, SH);
            // sourceCtx.fillStyle = "yellow"
            sourceCtx.fillRect((SW - setWidth) / 2, 0, setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2);
            // sourceCtx.fillStyle = "red"
            sourceCtx.fillRect((SW - setWidth) / 2, setHeight + (SH - setHeight) / 2, setWidth + (SW - setWidth) / 2, (SH-setHeight)/2);
            // sourceCtx.fillStyle = "ORANGE"
            sourceCtx.fillRect(setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2, (SW - setWidth) / 2, setHeight);
            console.log(sourceCanvas.height)
        }

    }, false)
    let startX, startY, drug = false;
    sourceCanvas.addEventListener('mousedown', function (e) {
        // console.log(e)
        startX = e.layerX;
        startY = e.layerY;
        drug = true;
        // sourceCtx.fillStyle = "rgba(0,0,0,0.6)"
        // sourceCtx.strokeRect(0, 0, sourceCanvas.width, sourceCanvas.height);
    })
    sourceCanvas.addEventListener('mousemove', function (e) {
        let width = e.layerX - startX;
        let height = e.layerY - startY;

        if (drug) {
            // 移动图片的位置
            sourceImgData = sourceImg;
            sourceCtx.drawImage(sourceImg, 50, 50, sourceImg.width, sourceImg.height, 0, 0, sourceImg.width * pixcel, sourceImg.height * pixcel)
            let imgData = sourceCtx.getImageData(0, 0, sourceImg.width * pixcel, sourceImg.height * pixcel);

            sourceCtx.fillStyle = "rgba(0,0,0,0.6)"
            // sourceCtx.fillStyle = "blue"
            sourceCtx.fillRect(0, 0, (SW - setWidth) / 2, SH);
            // sourceCtx.fillStyle = "yellow"
            sourceCtx.fillRect((SW - setWidth) / 2, 0, setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2);
            // sourceCtx.fillStyle = "red"
            sourceCtx.fillRect((SW - setWidth) / 2, setHeight + (SH - setHeight) / 2, setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2);
            // sourceCtx.fillStyle = "ORANGE"
            sourceCtx.fillRect(setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2, (SW - setWidth) / 2, setHeight);
            console.log(sourceCanvas.height)
        }
    })
    sourceCanvas.addEventListener('mouseup', function (e) {
        drug = false;
        // let endpix = MAT((e.layerX - startX)/EW*100)
        endCtx.clearRect(0, 0, endCanvas.width, endCanvas.height);
        let endData = sourceCtx.getImageData(startX, startY, e.layerX - startX, e.layerY - startY);
        endCtx.putImageData(endData, 0, 0)
    })

    uploadBtn.addEventListener('click', function () {
        // loading show
        // loading.show();
        // endCtx.getImageData(0,0,EW,EH)
        let baseData = endCanvas.toDataURL()
    })


    bigOpt.addEventListener('click',function(){
        // sourceCtx.scale(2, 2);


        // pixcel = Math.round(SW / sourceImg.width * 100) / 100 *2;
        pixcel++;
        // if (pixcel > Math.round(SW / sourceImg.width * 100) / 100*5) {
        //     return;
        // }
        sourceImgData = sourceImg;
        sourceCtx.drawImage(sourceImg, 0, 0, sourceImg.width * pixcel, sourceImg.height * pixcel)
        let imgData = sourceCtx.getImageData(0, 0, sourceImg.width * pixcel, sourceImg.height * pixcel);

        sourceCtx.fillStyle = "rgba(0,0,0,0.6)"
        // sourceCtx.fillStyle = "blue"
        sourceCtx.fillRect(0, 0, (SW - setWidth) / 2, SH);
        // sourceCtx.fillStyle = "yellow"
        sourceCtx.fillRect((SW - setWidth) / 2, 0, setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2);
        // sourceCtx.fillStyle = "red"
        sourceCtx.fillRect((SW - setWidth) / 2, setHeight + (SH - setHeight) / 2, setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2);
        // sourceCtx.fillStyle = "ORANGE"
        sourceCtx.fillRect(setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2, (SW - setWidth) / 2, setHeight);
        console.log(sourceCanvas.height)
    })
    smallOpt.addEventListener('click', function () {
        // if (pixcel < Math.round(SW / sourceImg.width * 100) / 100) {
        //     return;
        // }
        pixcel--;
        
        if(pixcel)
        sourceImgData = sourceImg;
        sourceCtx.drawImage(sourceImg, 0, 0, sourceImg.width * pixcel, sourceImg.height * pixcel)
        let imgData = sourceCtx.getImageData(0, 0, sourceImg.width * pixcel, sourceImg.height * pixcel);

        sourceCtx.fillStyle = "rgba(0,0,0,0.6)"
        // sourceCtx.fillStyle = "blue"
        sourceCtx.fillRect(0, 0, (SW - setWidth) / 2, SH);
        // sourceCtx.fillStyle = "yellow"
        sourceCtx.fillRect((SW - setWidth) / 2, 0, setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2);
        // sourceCtx.fillStyle = "red"
        sourceCtx.fillRect((SW - setWidth) / 2, setHeight + (SH - setHeight) / 2, setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2);
        // sourceCtx.fillStyle = "ORANGE"
        sourceCtx.fillRect(setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2, (SW - setWidth) / 2, setHeight);
        console.log(sourceCanvas.height)
    })
}