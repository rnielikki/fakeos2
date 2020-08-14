import Observable from '@/system/core/observer'
import CurrentDateTime from './current'

const onSecondChanged = new Observable<Date>()
const onMinuteChanged = new Observable<Date>()

let secondRegistered:number = 0;
let secondIntervalId:number = -1;
//let minuteRegistered:number = 0;


//time observer
export default {
    seconds:{
        subscribe:function(func:(current?:Date)=>void){
            onSecondChanged.register(func)
            if(secondRegistered==0){
                secondIntervalId = setInterval(secondInterval, 1000);
                secondInterval() //invokes directly first
            }
            secondRegistered++;
        },
        unsubscribe:function(func:(current?:Date)=>void){
            onSecondChanged.unregister(func)
            secondRegistered--;
            if(secondRegistered == 0){
                clearInterval(secondIntervalId)
            }
        }
    },
    minutes:{
        subscribe:function(func:(current?:Date)=>void){
            onMinuteChanged.register(func)
        },
        unsubscribe:function(func:(current?:Date)=>void){
            onMinuteChanged.unregister(func)
        }
    }
}

function secondInterval(){
    onSecondChanged.invoke(CurrentDateTime.currentDate);
}