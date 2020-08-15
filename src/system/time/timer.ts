import Observable from '@/system/core/observer'
import CurrentDateTime from './current'

const onSecondChanged = new Observable<Date>()
const onMinuteChanged = new Observable<Date>()

let secondRegistered:number = 0;
let minuteRegistered:number = 0;
let secondIntervalId:number = -1;
let minuteIntervalId:number = -1;

let listenSecondsForMinute = function(date:Date){
    if(date.getSeconds()==0) {
        //minute interval starts
        onMinuteChanged.invoke(CurrentDateTime.currentDate);
        Timer.seconds.unsubscribe(listenSecondsForMinute);
        minuteIntervalId = setInterval(()=>{
            onMinuteChanged.invoke(CurrentDateTime.currentDate)
        }, 60000);
    }
}

function secondInterval(){
    onSecondChanged.invoke(CurrentDateTime.currentDate);
}

const Timer = {
    seconds:{
        subscribe:function(func:(current:Date)=>void){
            onSecondChanged.register(func)
            if(secondRegistered==0){
                secondIntervalId = setInterval(secondInterval, 1000);
                secondInterval() //invokes directly first
            }
            secondRegistered++;
        },
        unsubscribe:function(func:(current:Date)=>void){
            if(onSecondChanged.unregister(func)){
                secondRegistered--;
                if(secondRegistered == 0){
                    clearInterval(secondIntervalId);
                }
            }
        }
    },
    //If you wawnt to 60 seconds, then use your own setInterval
    //Works with *system clock minute* change
    //not very accurate, but it prevents calling every second to check
    minutes:{
        subscribe:function(func:(current:Date)=>void){
            onMinuteChanged.register(func)
            if(minuteRegistered==0){
                //listen seconds first
                Timer.seconds.subscribe(listenSecondsForMinute);
            }
            minuteRegistered++;
        },
        unsubscribe:function(func:(current:Date)=>void){
            if(onMinuteChanged.unregister(func)){
                minuteRegistered--;
                if(minuteRegistered == 0){
                    clearInterval(minuteIntervalId);
                }
            }
        }
    }
}

export default Timer;