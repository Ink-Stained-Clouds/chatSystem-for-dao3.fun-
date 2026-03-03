const func = [];
let tick = 0;
function requestFrame(){
    for(const e of func){
        e(tick);
    }
    tick++;
    setTimeout(requestFrame,16);
}
function onTick(handler){
    func.push(handler);
    handler.cancel = ()=>{
        if(func.includes(handler)){
            func.splice(func.indexOf(handler),1);
        }
    }
}
requestFrame();
export{
    onTick
}