export default class MenuInfo {
    x:number = 0;
    y:number = 0;
    show:boolean = false;
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