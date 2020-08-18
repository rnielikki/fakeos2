import PopupInfo, { popupDirection } from '../../popups/popup-info'
export function createDefaultSubmenuInfo(){
    return new PopupInfo({ direction: popupDirection.bottomRight, x:"100%" })
}
export function createDefaultMenuInfo(){
    return new PopupInfo({ direction: popupDirection.bottomRight })
}