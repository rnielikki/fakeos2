import IconLoader from '@/components/ui-components/icon/icon-loader'

export interface MimeType {
    typeName:string;
    app:string;
    icon:string;
}

const defaultMime = {
    typeName:"???",
    app:"???",
    icon:require("@/system/resources/window-icon.png")
};

export default {
    getType:function(name:string, data?:object | null):MimeType{
        let type = name.substring(name.lastIndexOf("."));
        if(Object.prototype.hasOwnProperty.call(this.list, type)) {
            return Object(this.list)[type];
        }
        else if(type === ".vue" && data) {
            return resolveExecutable(data);
        }
        else {
            return defaultMime;
        }
    },
    list:{
        ".mp3":{
            typeName: "audio/mpeg",
            app: "core/player",
            icon: require("@/softwares/core/player/music-file.png")
        },
        ".wav":{
            typeName:"audio/wav",
            app: "core/player",
            icon: require("@/softwares/core/player/music-file.png")
        }
    }
}
function resolveExecutable(data:object){
    let appName = (data as { "app":string })?.app;
    if(!appName){
        return defaultMime;
    }
    return {
        typeName:"application/vue",
        app:appName,
        icon:IconLoader.getIcon(appName)
    }
}