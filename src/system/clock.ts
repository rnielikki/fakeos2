const date = new Date();
export default {
    currentFullDate: date,
    currentDay: getCurrentDay(),
    currentTime: getCurrentTime()
}
function getCurrentDay(){
    return date.getFullYear()+"/"+leadZero(date.getMonth()+1)+"/"+leadZero(date.getDate());
}
function getCurrentTime(){
    return leadZero(date.getHours())+":"+leadZero(date.getMinutes())+":"+leadZero(date.getSeconds());
}
function leadZero(n:number){
    return n.toString().padStart(2,'0')
}