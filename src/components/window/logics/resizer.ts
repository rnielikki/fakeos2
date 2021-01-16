import Position from "./position";

export default class ResizerCollection {
    constructor(resizer:any, target:HTMLElement, minWidth:number, minHeight:number) {
        /* freeze until find type
        if(!(resizer instanceof ComponentPublicInstance))
        {
            throw "The argument 'resizer' is not an instance of Vue component.";
        }*/
        target.style.position = "absolute";
        for(resizer of resizer._vnode.children){
            new Resizer(resizer.elm as HTMLElement, target, resizer.data.class.toString(), minWidth, minHeight);
        }
    }
}
class Resizer {
    private _self: HTMLElement;
    private target: HTMLElement;
    private resizeType: Function;
    mouseX: number = 0;
    mouseY: number = 0;
    minWidth: number;
    minHeight: number;
    private pos: Position | null = null;
    constructor(self: HTMLElement, target: HTMLElement, type: string, minWidth:number, minHeight: number){
        this._self = self;
        this.target = target;
        this.minWidth = minWidth;
        this.minHeight = minHeight;
        switch (type) {
            case "resizer-right":
                this.resizeType = this.resizeE;
                break;
            case "resizer-left":
                this.resizeType = this.resizeW;
                break;
            case "resizer-bottom":
                this.resizeType = this.resizeS;
                break;
            case "resizer-top":
                this.resizeType = this.resizeN;
                break;
            case "resizer-topright":
                this.resizeType = function (e: MouseEvent) { this.resizeN(e); this.resizeE(e); };
                break;
            case "resizer-topleft":
                this.resizeType = function (e: MouseEvent) { this.resizeN(e); this.resizeW(e); };
                break;
            case "resizer-bottomright":
                this.resizeType = function (e: MouseEvent) { this.resizeS(e); this.resizeE(e); };
                break;
            case "resizer-bottomleft":
                this.resizeType = function (e: MouseEvent) { this.resizeS(e); this.resizeW(e); };
                break;
            default: //should be assigned... weird.
                this.resizeType = ()=>void(0);
                break;
        }
        this.Init();
    }
    Init() {
        this._self.addEventListener("mousedown", this.resizeRegister, false);
    }
    private resizeRegister = (e: MouseEvent) => {
        this.pos = new Position(this.target.clientWidth, this.target.clientHeight, this.target.offsetTop, this.target.offsetLeft);
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        document.addEventListener("mousemove", this.resize, false);
        document.addEventListener("mouseup", this.unresize, { "once": true, "capture": false });
    }
    private resize = (e: MouseEvent) => {
        if (this.pos === null) return;
        e.preventDefault();
        this.resizeType(e);
        e.stopPropagation();
    }
    private resizeN = (e: MouseEvent) => {
        const size: number = (this.pos!.height + (this.mouseY - e.clientY));
        if (size >= this.minHeight && e.clientY >= 0) {
            this.target.style.height = size + "px";
            this.target.style.top = e.clientY + "px";
        }
    };
    private resizeW = (e: MouseEvent) => {
        const size: number = (this.pos!.width + (this.mouseX - e.clientX));
        if (size >= this.minWidth) {
            this.target.style.width = size + "px";
            this.target.style.left = e.clientX + "px";
        }
    };
    private resizeE = (e: MouseEvent) => {
        if (e.clientX >= 0) {
            this.target.style.width = (this.pos!.width + (e.clientX - this.mouseX)) + "px";
        }
    };
    private resizeS = (e: MouseEvent) => {
        this.target.style.height = (this.pos!.height + (e.clientY - this.mouseY)) + "px";
    };
    private unresize = () => {
        document.removeEventListener("mousemove", this.resize, false);
        this.pos = null;
    }
    public get self(){ return this._self; }
}