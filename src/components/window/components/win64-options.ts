//Provides default interface for Win64s.
//Win64Options or ModalOptions are recommended for custom implementation, which can override default options.
export default interface IWin64Options{
    movable:boolean;
    resizable:boolean,
    minWidth:number,
    minHeight:number,
    defaultWidth:number,
    defaultHeight:number,
    maximizeOnStart:boolean
}
//If you want to use or edit default main window options, use this
export class Win64Options implements IWin64Options{
    movable:boolean = true;
    resizable:boolean = true;
    minWidth:number = 640;
    minHeight:number = 480;
    defaultWidth:number = 800;
    defaultHeight:number = 600;
    maximizeOnStart:boolean = false;
    constructor(init?:Partial<Win64Options>){
        Object.assign(this, init);
    }
}
//If you want to use or edit default modal options, use this
export class ModalOptions implements IWin64Options{
    movable:boolean = true;
    resizable:boolean = false;
    minWidth:number = 400;
    minHeight:number = 300;
    defaultWidth:number = 400;
    defaultHeight:number = 300;
    get maximizeOnStart(){ return false; }
    constructor(init?:Partial<Win64Options>){
        Object.assign(this, init);
    }
}