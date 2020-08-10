export default class Movable{
    //x:number = 0;
    //y:number = 0;
    mouseX:number = 0;
    mouseY:number = 0;
    element:HTMLElement;
    handle:HTMLElement;
    constructor(element:HTMLElement, handle:HTMLElement) {
        this.element = element;
        this.handle = handle;
        this.element.style.position = 'absolute';
        handle.addEventListener("mousedown", this.register, false);
    }
    private register = (e:MouseEvent) => {
        if(!this.element?.dataset?.movable || !this.handle) return;
        this.mouseX = e.clientX - parseInt(this.element.style.left || "0", 10);
        this.mouseY = e.clientY - parseInt(this.element.style.top || "0", 10);
        document.addEventListener("mousemove", this.move, false);
        document.addEventListener("mouseup", this.unregister, { once:true, capture:false });
    }
    private move = (e:MouseEvent) => {       
        if(!this.element) return;
        if (e.clientX > 0 && e.clientX < document.body.clientWidth) {
            this.element.style.left = (e.clientX - this.mouseX).toString() + "px"
        }
        if (e.clientY > 0 && e.clientY < document.body.clientHeight) {
            this.element.style.top = (e.clientY - this.mouseY).toString() + "px"
        }
    }
    private unregister = (e:MouseEvent) => {
        document.removeEventListener("mousemove", this.move, false);
    }
}