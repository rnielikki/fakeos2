export  interface IMenuComponent {
    label:string;
}

export interface IMenuItem extends IMenuComponent {
    action:()=>void;
}

export interface IParentMenuItem extends IMenuComponent {
    submenu:IMenuItem;
}