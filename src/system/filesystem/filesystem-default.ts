const DefaultFileSystem = {
    "User":{
        "Images": toFileSystem(require.context("@/assets/images", true, /\.(jpe?g|png|gif|bmp)$/i).keys(), (name)=>"{\"name\":\""+require("@/assets/images/"+name)+"\"}"),
        "Musics": toFileSystem(require.context("@/assets/musics", true, /\.(mp3|ogg|wav)$/i).keys(), (name)=>"{\"name\":\""+require("@/assets/musics/"+name)+"\"}"),
        "Documents": {
            "DefaultText.txt": "{ \"content\": \"ASDF\" }",
            "Anothertext.txt": "{ \"content\": \"--- FAKEOS 2 ---\\nThis is another text text\" }"
        },
        "Desktop": {}
    },
    "Program":toFileSystem(require.context("@/softwares/", true, /^((?!core).)*\.vue$/).keys().filter(value=>isMainExecutable(value)),
        (fullPath)=> "{\"app\":\""+fullPath.substring(0, fullPath.lastIndexOf("/"))+"\"}"),
    "System": toFileSystem(require.context("@/softwares/core", true, /\.vue$/).keys().filter(value=>isMainExecutable(value)),
        (fullPath)=> "{\"app\":\"core/"+fullPath.substring(0, fullPath.lastIndexOf("/"))+"\"}")
}
export const DesktopIcons = {
    "hello-world":"C:/Program/hello-world/hello-world.vue",
    "My folder":"C:/User/Documents"
};

function isMainExecutable(path:string):boolean{
    path = path.substring(2);
    const lastIndex = path.lastIndexOf("/");
    const dir = path.substring(0, lastIndex);
    const file = path.substring(lastIndex+1);
    return dir.replace("/", ".")+".vue" === file;
}
function toFileSystem(input:Array<string>, contentResolver:(path:string)=>string) {
    const root = {};
    for(const path of input){
        Object.assign(root, toFileSystemRecursive(root, path.substring(2).split("/"), path));
    }
    return root;
    function toFileSystemRecursive(root:object, path:string[], fullPath:string):object{
        if(path.length > 1 ){
            const folderName = path.shift();
            if(Object.prototype.hasOwnProperty.call(root, folderName!)) {
                Object.assign(Object(root)[folderName!], toFileSystemRecursive({}, path, fullPath));
            }
            else {
                Object(root)[folderName!] = toFileSystemRecursive({}, path, fullPath);
            }
            return root;
        }
        else{
            const _obj = {}
            Object(_obj)[path[0]] = contentResolver(fullPath.substring(2));
            return _obj;
        }
    }
}

export default DefaultFileSystem;