/*
 * @Author: inkclouds inkclouds314419@gmail.com
 * @Date: 2026-03-03 14:25:14
 * @LastEditors: inkclouds inkclouds314419@gmail.com
 * @LastEditTime: 2026-03-04 11:36:50
 * @FilePath: \chatSystem\client\clock.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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