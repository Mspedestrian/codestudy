window.onload = function(){

    // const pixel = 180*180
    let selectBtn = document.querySelector('.select-btn');
    let uploadBtn = document.querySelector('.upload-btn');
    let input = document.querySelector('#imgFile');
    let sourceCanvas = document.querySelector('#sourceCanvas');
    let sourceCtx = sourceCanvas.getContext('2d');
    let endCanvas = document.querySelector('#endCanvas');
    let endCtx = endCanvas.getContext('2d');

    const SW = sourceCanvas.width;
    const SH = sourceCanvas.height;
    const EW = endCanvas.width
    const EH = endCanvas.height;
    let pixcel;
    let sourceImgData;
    selectBtn.addEventListener('click',function(e){
        input.click(function(){
           
        });
        // console.log(input.files)
    })
    input.addEventListener('change',function(){
        
        let filereader = new FileReader();
        let sourceImg = new Image();
        filereader.readAsDataURL(input.files[0]);
        filereader.onload = (e)=>{
            console.log(e)
            
            sourceImg.src = e.target.result;
        }
        sourceImg.onload = ()=>{
            // sourceCanvas.width = sourceImg.width;
            // sourceCanvas.height = sourceImg.height;
            pixcel = Math.round(SW / sourceImg.width*100)/100;
            console.log(pixcel)
            sourceImgData = sourceImg;
            sourceCtx.drawImage(sourceImg, 0, 0, sourceImg.width * pixcel, sourceImg.height * pixcel)
            let imgData = sourceCtx.getImageData(0, 0, sourceImg.width * pixcel, sourceImg.height * pixcel);
        }
    },false)
    let startX,startY,drug=false;
    sourceCanvas.addEventListener('mousedown',function(e){
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
            
            sourceCtx.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
            
            sourceCtx.drawImage(sourceImgData, 0, 0, sourceImgData.width * pixcel, sourceImgData.height * pixcel)
            sourceCtx.fillStyle = "rgba(0,0,0,0.6)"
            // sourceCtx.fillStyle = "blue"
            sourceCtx.fillRect(0, 0, startX, sourceCanvas.height);
            // sourceCtx.fillStyle = "yellow"
            sourceCtx.fillRect(startX, 0, sourceCanvas.width, startY);
            // sourceCtx.fillStyle = "red"
            sourceCtx.fillRect(startX, e.layerY, sourceCanvas.width - startX, sourceCanvas.height - e.layerY);
            sourceCtx.fillRect(e.layerX, startY, sourceCanvas.width - e.layerX, e.layerY - startY);
            

            // ctx.font = "20px Georgia #fff";
            // ctx.fillText("举行1", e.layerX / 2, sourceCanvas.height/2);
            // ctx.fillText("举行2", (sourceCanvas.width-e.layerX / 2), sourceCanvas.height / 2);
            // ctx.fillText("举行3", e.layerX / 2, sourceCanvas.height / 2);
            // ctx.fillText("举行4", e.layerX / 2, sourceCanvas.height / 2);


            sourceCtx.strokeRect(startX, startY, width, height);
        }
    })
    document.addEventListener('mouseup', function (e) {
        drug = false;
        // let endpix = MAT((e.layerX - startX)/EW*100)
        endCtx.clearRect(0, 0, endCanvas.width, endCanvas.height);
        let endData = sourceCtx.getImageData(startX, startY, e.layerX - startX, e.layerY - startY);
        endCtx.putImageData(endData,0,0)
    })

    uploadBtn.addEventListener('click',function(){
        // loading show
        // loading.show();
        // endCtx.getImageData(0,0,EW,EH)
        let baseData = endCanvas.toDataURL()
    })
}