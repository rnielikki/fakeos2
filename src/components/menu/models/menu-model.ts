export  interface IMenuComponent {
    label:string;
}

export class MenuItem implements IMenuComponent {
    label:string;
    action:()=>void;
    constructor (label:string, action:()=>void){
        this.label = label;
        this.action = action;
    };
}

export class ParentMenuItem implements IMenuComponent {
    label:string;
    submenu:IMenuComponent;
    constructor (label:string, submenu:IMenuComponent){
        this.label = label;
        this.submenu = submenu;
    };
}