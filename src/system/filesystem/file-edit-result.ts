import WindowFactory from '@/components/window/window-factory';

enum FileEditResult {
    Success,
    NotFound,
    Immutable,
    DuplicatedName,
    InvalindName,
    Recursive
}

export default FileEditResult;

export let showDialogIfError = function(message:FileEditResult, fileName:string, targetFileName?:string) {
    switch(message) {
        case FileEditResult.NotFound:
            WindowFactory.OpenDialog(null, "REMOVED File", `File ${NameOrName(fileName, targetFileName)} is 404.\nWe cannot find the file. Where are you?`)
            break;
        case FileEditResult.Immutable:
            WindowFactory.OpenDialog(null, "LOCKED File", `File ${NameOrName(fileName, targetFileName)} or its target is not edible.\nI mean, not editable.`)
            break;
        case FileEditResult.DuplicatedName:
            WindowFactory.OpenDialog(null, "DUPLICATED Name", `${fileName} already exists.`)
            break;
        case FileEditResult.InvalindName:
            WindowFactory.OpenDialog(null, "INVALID Name", `${fileName} should not contain slash(/).`)
            break;
        case FileEditResult.Recursive:
            WindowFactory.OpenDialog(null, "RECURSIVE File", `${targetFileName} is itself or parent of ${fileName}.\nNice try, though.`)
            break;
    }
}
function NameOrName(name1?:string, name2?:string){
    let n1 = (name1)?name1:undefined;
    let n2 = (name2)?name2:undefined;
    return [n1, n2].concat(" or ")
}