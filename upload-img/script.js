window.onload = function(){
    let selectBtn = document.querySelector('.select-btn');
    let uploadBtn = document.querySelector('.upload-btn');
    let input = document.querySelector('#imgFile');
    selectBtn.addEventListener('click',function(e){
        input.click(function(){
           
        });
        // console.log(input.files)
    })
    input.addEventListener('change',function(){
        console.log(input.files)
    })
}