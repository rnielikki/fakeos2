export default {
    "C:":{
        "Users":{
        },
        "Program":require.context("@/softwares/", true, /^((?!core).)*\.vue$/).keys().filter(value=>isMainExecutable(value)),
        "System": require.context("@/softwares/core", true, /\.vue$/).keys().filter(value=>isMainExecutable(value))
    }
}

function isMainExecutable(path:string):boolean{
    path = path.substring(2);
    let lastIndex = path.lastIndexOf("/");
    let dir = path.substring(0, lastIndex);
    let file = path.substring(lastIndex+1);
    return dir.replace("/", ".")+".vue" === file;
}