export default interface IWindowOptions{
    movable:boolean;
    resizable:boolean,
    minX:number,
    minY:number,
    defaultWidth:number,
    defaultHeight:number
}
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