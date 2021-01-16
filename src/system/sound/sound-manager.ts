import Observable from '@/system/core/observer'

//mastersound range is 0-1.
let master:number = 1;
const observableMasterSound = new Observable<number>();

export default {
    get masterSound(){
        return master;
    },
    set masterSound(value:number){
        if(value < 0 || value > 1){
            console.warn("Warning: the master volume range is not correct (should be 0-1). The input volume: "+value)
            return;
        }
        master = value;
        observableMasterSound.invoke(value);
    },
    MasterChangeListener:{
        Add(func:(n:number)=>void){
            observableMasterSound.register(func)
        },
        Remove(func:(n:number)=>void){
            observableMasterSound.unregister(func)
        }
    }
}