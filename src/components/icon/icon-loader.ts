export default{
    getIcon:function(appName:string):string{
        try {
            return require("@/softwares/"+appName+"/icon.png");   
        }
        catch {
            return require("@/system/resources/window-icon.png");
        }
    }
}