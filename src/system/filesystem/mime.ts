import IconLoader from '@/components/ui-components/icon/icon-loader'
import { FileInfo } from './fileinfo';

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
        },
        ".jpg":{
            typeName:"image/jpeg",
            app: "core/image-viewer",
            icon: require("@/softwares/core/image-viewer/image-file.png")
        },
        ".jpeg":{
            typeName:"image/jpeg",
            app: "core/image-viewer",
            icon: require("@/softwares/core/image-viewer/image-file.png")
        },
        ".png":{
            typeName:"image/png",
            app: "core/image-viewer",
            icon: require("@/softwares/core/image-viewer/image-file.png")
        },
        ".gif":{
            typeName:"image/gif",
            app: "core/image-viewer",
            icon: require("@/softwares/core/image-viewer/image-file.png")
        },
        ".svg":{
            typeName:"image/svg",
            app: "core/image-viewer",
            icon: require("@/softwares/core/image-viewer/image-file.png")
        },
        ".txt":{
            typeName:"text/plain",
            app:"core/text-editor",
            icon: require("@/softwares/core/text-editor/text-file.png")
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

function parseType(mimeName:string){
    return mimeName.substring(0, mimeName.indexOf("/"));
}
export let checkType = {
    ifImage:function(file:FileInfo){
        return parseType(file.appType.typeName) === "image";
    },
    ifSound:function(file:FileInfo){
        return parseType(file.appType.typeName) === "audio";
    },
    ifText:function(file:FileInfo){
        return parseType(file.appType.typeName) === "text";
    }
}