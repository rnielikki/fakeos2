const computerName = "system32";
const userName = "RooT";
const ua = navigator.userAgent;
const info = parseUA(ua);

export default {
    computer:computerName,
    user:userName,
    get computerInfo(){ return info }
}

function parseUA(ua:string) {
    function getInfo(regex:RegExp){
        const result = ua.match(regex);
        return (result)?result[0]:null;
    }
    return {
        arc:getInfo(/x[0-9]+/),
        cpu:navigator.platform+"/"+ua.substring(ua.lastIndexOf(" ")+1),
        memory:((navigator as any).deviceMemory ?? 12) + "GB"
    }
}