import WindowFactory from '@/components/window/window-factory';

enum FileEditResult {
    Success,
    NotFound,
    Immutable,
    DuplicatedName,
    InvalindName
}

export default FileEditResult;

export let showDialogIfError = function(fileName:string, message:FileEditResult) {
    switch(message) {
        case FileEditResult.NotFound:
            WindowFactory.OpenDialog(null, "REMOVED File", `File ${fileName} is 404.\nWe cannot find the file. Where are you?`)
            break;
        case FileEditResult.Immutable:
            WindowFactory.OpenDialog(null, "LOCKED File", `File ${fileName} is not edible.\nI mean, not editable.`)
            break;
        case FileEditResult.DuplicatedName:
            WindowFactory.OpenDialog(null, "DUPLICATED Name", `${fileName} already exists.`)
            break;
        case FileEditResult.InvalindName:
            WindowFactory.OpenDialog(null, "INVALID Name", `${fileName} should not contain slash(/).`)
            break;
    }
}