import { App } from "vue";

export default {
    Mount: function mountTo(app:App<Element>, target:Node){
        const frag = document.createElement("div");
        const mounted = app.mount(frag);
        console.log(app);
        console.log(mounted);
        target.appendChild(mounted.$el);
        return mounted;
    }
}