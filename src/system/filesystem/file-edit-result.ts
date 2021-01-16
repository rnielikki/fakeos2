import Win64Factory from '@/components/window/window-factory';

enum FileEditResult {
    Success,
    NotFound,
    Immutable,
    DuplicatedName,
    InvalindName,
    Recursive,
    DoubleShortcut
}

export default FileEditResult;

export const showDialogIfError = function(message:FileEditResult, fileName:string, targetFileName?:string) {
    switch(message) {
        case FileEditResult.NotFound:
            Win64Factory.OpenDialog(null, "REMOVED File", `File ${NameOrName(fileName, targetFileName)} is 404.\nWe cannot find the file. Where are you?`)
            break;
        case FileEditResult.Immutable:
            Win64Factory.OpenDialog(null, "LOCKED File", `File ${NameOrName(fileName, targetFileName)} is not edible.\nI mean, not editable.`)
            break;
        case FileEditResult.DuplicatedName:
            Win64Factory.OpenDialog(null, "DUPLICATED Name", `${fileName} already exists.`)
            break;
        case FileEditResult.InvalindName:
            Win64Factory.OpenDialog(null, "INVALID Name", `${fileName} is invalid.\nFile name should not be: empty, contains slash(/).`)
            break;
        case FileEditResult.Recursive:
            Win64Factory.OpenDialog(null, "RECURSIVE File", `${fileName} is itself or parent of ${targetFileName}.\nNice try, though.`)
            break;
        case FileEditResult.DoubleShortcut:
            Win64Factory.OpenDialog(null, "DOUBLE Shortcut", `${fileName} itself is also shortcut.\nSorry, we don't allow shortcut shortcut.`)
            break;
    }
}
function NameOrName(name1?:string, name2?:string){
    const n1 = (name1)?name1:undefined;
    const n2 = (name2)?name2:undefined;
    return [n1, n2].filter(x=>x).join(" or ")
}