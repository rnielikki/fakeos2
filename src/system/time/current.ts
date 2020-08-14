const startDate = new Date();
export default {
    //returns date when the program is started (which can be before than fully loaded time)
    get startDate() {
        return startDate;
    },
    //returns system date (which can be changed in future)
    get currentDate() {
        return new Date();
    },
    get upTime() {
        return Math.floor((Date.now() - startDate.getTime())/1000)
    }
}