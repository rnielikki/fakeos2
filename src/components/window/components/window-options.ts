//Provides default interface for Windows.
//WindowOptions or ModalOptions are recommended for custom implementation, which can override default options.
export default interface IWindowOptions{
    movable:boolean;
    resizable:boolean,
    minX:number,
    minY:number,
    defaultWidth:number,
    defaultHeight:number
}
//If you want to use or edit default main window options, use this
export class WindowOptions implements IWindowOptions{
    movable:boolean = true;
    resizable:boolean = true;
    minX:number = 640;
    minY:number = 480;
    defaultWidth:number = 800;
    defaultHeight:number = 600;
    constructor(init?:Partial<WindowOptions>){
        Object.assign(this, init);
    }
}
//If you want to use or edit default modal options, use this
export class ModalOptions implements IWindowOptions{
    movable:boolean = true;
    resizable:boolean = false;
    minX:number = 400;
    minY:number = 300;
    defaultWidth:number = 400;
    defaultHeight:number = 300;
    constructor(init?:Partial<WindowOptions>){
        Object.assign(this, init);
    }
}