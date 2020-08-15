export default class PopupInfo {
    x:string = "0px";
    y:string = "0px";
    direction:PopupDirection = popupDirection.topRight;
    public constructor(init?:Partial<PopupInfo>) {
        Object.assign(this, init);
    }
}
export interface PopupDirection {
    left?:number;
    top?:number;
    right?:number;
    bottom?:number;
}
export const popupDirection = {
    topLeft: { right: 0, bottom: 0 },
    topRight: { left: 0, bottom: 0 },
    bottomLeft: { right: 0, top: 0 },
    bottomRight: { left: 0, top: 0 }
}