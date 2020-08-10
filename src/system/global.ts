let _desktop:HTMLElement | null;
let _background:HTMLElement | null;
export default {
    get desktop(){
        if(!_desktop) {
            _desktop = document.querySelector("#f_desktop");
            if(_desktop == null){
                throw "Looks like explorer.exe has been stopped: Desktop not found"
            }
        }
        return _desktop;
    },
    get background(){
        if(!_background) {
            _background = document.querySelector("#f_background");
            if(_desktop == null){
                throw "Background service has been stopped."
            }
        }
        return _background;
    }
}