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
    let endData;
    let pixcel;
    


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
        sourceImg.onload = () => {
            if(SW<SH){
                pixcel = Math.round(SW / sourceImg.width * 100) / 100;
            }
            else {
                pixcel = Math.round(SH / sourceImg.height * 100) / 100;
            }
            drawImageToSourceCtx();
            drawImageToEndCtx()
        }

    }, false)
    let startX, startY, startEX =0,startEY = 0,drug = false;
    let currentScale = 1;
    sourceCanvas.addEventListener('mousedown', function (e) {
        // console.log(e)
        startX = e.layerX;
        startY = e.layerY;
        drug = true;
        // drawImageToSourceCtx(-startEX, -startEY)
        drawImageToSourceCtx(-startEX, -startEY, SW / currentScale, SH / currentScale, 0, 0, sourceImg.width * currentScale, sourceImg.height * currentScale)
        // sourceCtx.fillStyle = "rgba(0,0,0,0.6)"
        // sourceCtx.strokeRect(0, 0, sourceCanvas.width, sourceCanvas.height);
    })
    sourceCanvas.addEventListener('mousemove', function (e) {
        let width = e.layerX - startX + startEX;
        let height = e.layerY - startY + startEY;

        if (drug) {
            // 移动图片的位置
            drawImageToSourceCtx(-width, -height, SW / currentScale, SH / currentScale, 0, 0, sourceImg.width * currentScale, sourceImg.height * currentScale)
            drawImageToEndCtx()
         
        }
    })
    sourceCanvas.addEventListener('mouseup', function (e) {
        drug = false;
        // let endpix = MAT((e.layerX - startX)/EW*100)
        startEX += e.layerX - startX;
        startEY += e.layerY - startY;
   
        drawImageToEndCtx()
        
    })
    
    bigOpt.addEventListener('click',function(e){
        currentScale = currentScale+0.4
        sourceCtx.clearRect(0, 0, SW * currentScale, SH * currentScale);
        // sourceCtx.scale(currentScale, currentScale);
        // sx, sy, swidth, sheight, x, y, swidth, sheight
        drawImageToSourceCtx(-startEX, -startEY, SW / currentScale, SH / currentScale, 0, 0, sourceImg.width * currentScale, sourceImg.height * currentScale)
    })
    smallOpt.addEventListener('click',function(e){
        currentScale = currentScale - 0.4
        sourceCtx.clearRect(0, 0, SW * currentScale, SH * currentScale);
        // sourceCtx.scale(currentScale, currentScale);
        // sx, sy, swidth, sheight, x, y, swidth, sheight
        drawImageToSourceCtx(-startEX, -startEY, SW / currentScale, SH / currentScale, 0, 0, sourceImg.width * currentScale, sourceImg.height * currentScale)
    })
    uploadBtn.addEventListener('click', function () {
        // loading show
        // loading.show();
        // endCtx.getImageData(0,0,EW,EH)
        let baseData = endCanvas.toDataURL()
    })



    function drawImageToSourceCtx(sx = 0, sy = 0, swidth = SW, sheight = SH, x = 0, y = 0, width = sourceImg.width, height = sourceImg.height){
        sourceCtx.clearRect(0, 0, SW, SH);
        // sourceCtx.drawImage(sourceImg, 0, 0, sourceImg.width * pixcel, sourceImg.height * pixcel)
        // let imgData = sourceCtx.getImageData(0, 0, sourceImg.width * pixcel, sourceImg.height * pixcel);
        sourceCtx.drawImage(sourceImg, sx, sy, swidth, sheight, x, y, width, height);
        sourceCtx.fillStyle = "rgba(0,0,0,0.6)"
        // sourceCtx.fillStyle = "blue"
        sourceCtx.fillRect(0, 0, (SW - setWidth) / 2, SH);
        // sourceCtx.fillStyle = "yellow"
        sourceCtx.fillRect((SW - setWidth) / 2, 0, setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2);
        // sourceCtx.fillStyle = "red"
        sourceCtx.fillRect((SW - setWidth) / 2, setHeight + (SH - setHeight) / 2, setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2);
        // sourceCtx.fillStyle = "ORANGE"
        sourceCtx.fillRect(setWidth + (SW - setWidth) / 2, (SH - setHeight) / 2, (SW - setWidth) / 2, setHeight);
    

    }
    function drawImageToEndCtx(x = (SW - setWidth) / 2, y = (SH - setHeight) / 2, width = setWidth, height = setHeight) {
        endCtx.clearRect(0, 0, EW, EH);
        endData = sourceCtx.getImageData(x, y, width, height);
        endCtx.putImageData(endData, 0, 0)
    }
}
