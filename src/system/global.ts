const _desktop = document.querySelector(".desktop");
const _background = document.querySelector(".background");
export default {
    get desktop(){
        return _desktop;
    },
    get background(){
        return _background;
    }
}