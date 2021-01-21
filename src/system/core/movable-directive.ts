import Movable from '@/system/core/movable';

export default {
    beforeMount: function (el:HTMLElement, binding:any, vnode:any) {
      if(!binding?.value?.active) return;
      const handleName:string = binding?.value?.handle as string;
      let handle:HTMLElement;
      if(handleName == null) {
        handle = el;
      }
      else {
        handle = vnode.children.find((child:any)=>child.type?.name==handleName)?.el;
        if(!handle) {
          throw(`Error: Component name ${handleName} cannot found.`);
        }
      }
      new Movable(el as HTMLElement, handle);
    }
}