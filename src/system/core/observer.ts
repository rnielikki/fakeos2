//use this on outside and export only register/unregister part, to invoke only inside
export default class Observable<T> {
    private subscribers:Array<(value:T)=>void> = new Array<(value:T)=>void>();
    register(subscriber:(value:T)=>void){
        this.subscribers.push(subscriber)
    }
    unregister(unsubscriber:(value:T)=>void):boolean{
        const index = this.subscribers.indexOf(unsubscriber);
        if(index === -1){
            return false;
        }
        else{
            //remove all same, also for duplication
            this.subscribers = this.subscribers.filter(func=>func!==unsubscriber);
            return true;
        }
    }
    invoke(value:T){
        this.subscribers.forEach(ob=>ob(value));
    }
}