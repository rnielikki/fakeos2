import Movable from './movable';

export default {
  movable:{
    bind: function (el:HTMLElement, binding:any, vnode:any) {
      if(!binding?.value?.active) return;
      var handleName:string = binding?.value?.handle as string;
      var handle:HTMLElement;
      if(handleName == null) {
        handle = el;
      }
      else {
        handle = vnode.children.find((child:any)=>child.componentOptions?.tag==handleName)?.elm;
        if(!handle) {
          throw(`Error: Component name ${handleName} cannot found.`);
        }
      }
      new Movable(el as HTMLElement, handle);
    }
  }
}