function changePage(element,effect,callback){
    element.addClass(effect)
    .one('animationend',function(){
        callback&&callback();
    })
}

var Christmas = function(){
    //层级
    var index = 10;
    var page = document.querySelector("#page");
    var observer = new Observer();
    // new PageA(function(){
        
    //     console.log('111')
    //     observer.publish('complateA')
    // });
    new PageA($('.pagea'))
    observer.subscribe('complateA',function(){
        changePage($('.pagea'), 'effect-out', function () {
            new PageB(function(){
                console.log('111')
                observer.publish('complateB')
            });
        })
        
    })
    observer.subscribe('complateB', function () {
        changePage($('.pagec'), 'effect-in', function () {
            new PageC();
        })
    })
    //切换切换
    page.addEventListener("change", function (e) {
        if (e.target.value == 'pageb') {
            changePage($('.pagea'),'effect-out',function(){
                new PageB();
            })
        }
        else if (e.target.value == 'pagec') {
            changePage($('.pagec'), 'effect-in', function () {
                new PageC();
            })
            
        }
        
        // pageElement.style.zIndex = ++index;
    }, false)
}
$(function(){
    Christmas()
})
