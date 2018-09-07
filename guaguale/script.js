window.onload = function(){
    let canvas = document.querySelector('#myConvas');
    let context = canvas.getContext('2d');
    let W = canvas.width;
    let H = canvas.height;
    let startX,startY,drag = false;
    context.fillStyle="#ff7800";
    context.fillRect(0, 0, W, H);
    context.fillStyle='#fff';
    context.font='14px sans-serif';
    context.fillText('ahhaha', 30, H/2);

    let backData = canvas.toDataURL();
    console.log(backData)
    canvas.style.background = 'url(' + backData+')';
    context.clearRect(0, 0, W, H);
    

    context.fillStyle = '#aaa'
    context.fillRect(0, 0, W, H);
    canvas.addEventListener('mousedown',function(e){
        startX = e.layerX;
        startY = e.layerY;
        drag = true;
        console.log(e)
    })
    canvas.addEventListener('mousemove', function (e) {
        if(!drag){
            return;
        }
        let endX = e.layerX;
        let endY = e.layerY;
        // console.log(startX, startY)
        context.globalCompositeOperation='destination-out';
        
        
        // context.fillRect(startX, startY, endX - startX, endY - startY)
        // context.arc((endX+startX)/2, (endY+startY)/2, 10, 0, 2 * Math.PI);
        // context.arc((-endX - startX) / 2, (-endY - startY) / 2, 5, 0, 0.5 * Math.PI);
        // console.log((endX + startX) / 2, (endY + startY) / 2)
        context.fillStyle = 'rgba(0,0,0,0)';
        context.lineWidth='10';
        
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.stroke();
        context.fill()
        startX = e.layerX;
        startY = e.layerY; 
    })
    canvas.addEventListener('mouseup', function (e) {
        drag = false;
        // context.globalCompositeOperation = 'lighter';
        // console.log(imgData);
        let imgData = context.getImageData(0, 0, W, H)
        let len = imgData.width * imgData.height;
        let num = 0;
        for(let i=0;i<len;i++){
            if (imgData.data[i*4+3] == 0){
                num++
            }
        }
        // console.log(num/len)
        // if(num/len>0.3) {
        //     console.log('全部消失')
        //     disapplear();
        // }
        // console.log('全部消失')
        disapplear();


    })
    async function disapplear(){
        let imgData = context.getImageData(0, 0, W, H)
        let len = imgData.width * imgData.height;
        for (let i = 0; i < len; i++) {
            
            if (imgData.data[i * 4 + 3] != 0) {
                imgData.data[i * 4 + 3] = 0;
                await context.putImageData(imgData, 0, 0);
                // console.log(i * 4 + 3)
            }
            
            // if (i * 4 + 3>len){
            //     break;
            // }
        }
        
        
        
    }
    
}