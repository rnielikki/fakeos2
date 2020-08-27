export default {
    getType:function(name:string, data?:object | null){
        let type = name.substring(name.lastIndexOf("."));
        if(Object.prototype.hasOwnProperty.call(this.list, type)) {
            return Object(this.list)[type];
        }
        else if(type === ".vue" && data) {
            return (data as { "app":string })?.app;
        }
        else {
            return null;
        }
    },
    list:{
        ".mp3":"core/player",
        ".wav":"core/player"
    }
}