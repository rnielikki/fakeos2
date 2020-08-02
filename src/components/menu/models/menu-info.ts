export default class MenuInfo {
    x:string = "0px";
    y:string = "0px";
    direction:MenuDirection = MenuDirection.bottomRight;
    public constructor(init?:Partial<MenuInfo>) {
        Object.assign(this, init);
    }
}
export enum MenuDirection {
    topLeft,
    topRight,
    bottomLeft,
    bottomRight
}