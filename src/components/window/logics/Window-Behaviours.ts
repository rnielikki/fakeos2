import Movable from './movable';
import Resizer from './resizer.vue'

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
        handle = vnode.children.find((child:any)=>child.componentOptions.tag==handleName)?.elm;
        if(handle == null) {
          throw(`Error: Component name ${handleName} cannot found.`);
        }
      }
      new Movable(el as HTMLElement, handle);
    }
  },
  resizable:{
    bind: function(el:HTMLElement, binding:any, vnode:any) {
      if(!binding?.value?.active) return;
      var minX:number = (!binding?.value?.minX)?600:binding.value.minX;
      var minY:number = (!binding?.value?.minY)?400:binding.value.minY;
      var resizer = new Resizer({
        propsData:{
          target: el,
          minX: minX,
          minY: minY
        }
      });
      //console.log(vnode);
      resizer.$mount();
      el.appendChild(resizer.$el);
      //resizer.$mount(el as Element);
      //vnode.context._self.$forceUpdate();
      //console.log(resizer);
    }
  }
}