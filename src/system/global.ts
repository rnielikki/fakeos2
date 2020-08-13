let _desktop:Element | null;
let _background:Element | null;
let _globals:{
    desktop:Element,
    background:Element,
    getDesktop:()=>Promise<Element>,
    getBackground:()=>Promise<Element>
} = {
    get desktop(){
        return (_desktop==null)?(_desktop=getElement("#f_desktop")):_desktop;
    },
    get background(){
        return (_background==null)?(_desktop=getElement("#f_desktop")):_background;
    },
    getDesktop:function(){
        return new Promise((resolve, reject)=>{
            if(_desktop==null){
                window.onload = ()=>{
                    _desktop = document.querySelector("#f_desktop");
                    if( _desktop==null){
                        reject("Error : Looks like explorer.exe has been stopped! Make sure if the #f_desktop exists!");
                    }
                    else{
                        resolve(_desktop);
                    }
                }
            }
            else{
                resolve(_desktop);
            }
        });
    },
    getBackground:function(){
        return new Promise((resolve, reject)=>{
            if(_background==null){
                window.onload = ()=>{
                    _background = document.querySelector("#f_background");
                    if( _background==null){
                        reject("Error : Looks like explorer.exe has been stopped! Make sure if the #f_background exists!");
                    }
                    else{
                        resolve(_background);
                    }
                }
            }
            else{
                resolve(_background);
            }
        });
    }
}
export default _globals;
function getElement(query:string){
    let elem = document.querySelector(query);
    if(elem == null){
        //throw "Error : Cannot open the "+ query+", Looks like explorer.exe has been stopped!"
        throw " Error: Cannot found "+query+". If "+query+" is used before the elements are fully loaded (e.g. global outside function), please use getDesktop() or getBackground() (Promises) instead";
    }
    return elem;
}