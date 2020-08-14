export default {
    getDayFormat: function(date:number | Date){
        let _date:Date = asDate(date);
        return _date.getFullYear()+"/"+leadZero(_date.getMonth()+1)+"/"+leadZero(_date.getDate());
    },
    getTimeFormat: function(date:number | Date){
        let _date:Date = asDate(date);
        return leadZero(_date.getHours())+":"+leadZero(_date.getMinutes())+":"+leadZero(_date.getSeconds());
    }
}
function asDate(date:number | Date){
    return (date instanceof Date)?date:new Date(date);
}
function leadZero(n:number){
    return n.toString().padStart(2,'0')
}