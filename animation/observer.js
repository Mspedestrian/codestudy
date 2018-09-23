var Observer = (function(slice){
    function bind(event,fn){
        var events = this.events = this.events || {},
            parts = event.split(/\s+/),
            num = parts.length,
            i=0,
            part;
        if(events[event]&&events[event].length){
            console.log('已经绑定过了');
            return false;
        }
        for(;i<num;i++){
            events[(part = parts[i])] = events[part] || [];
            events[part].push(fn);
        }
        return this;
        
    }
    function trigger(event){
        var events = this.events = this.events || {},
            args, flag,i;
        if(!events||!events[event]) {
            return false;
        }
        args = slice.call(arguments,1);
        for(i=events[event].length-1;i>=0;i--){
            flag = events[event][i].apply(this,args);
        }
        return flag

    }
    return function(){
        this.on = this.subscribe = bind;
        this.publish = trigger
    }
})([].slice)