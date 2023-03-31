import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imgEl = this._popup.querySelector('.element-zoom__img');
        this._titleEl = this._popup.querySelector('.element-zoom__title');
        
    }

    open(imgUrl, title) {
        this._imgEl.src = imgUrl;
        this._imgEl.alt = title;
        this._titleEl.textContent = title;

        super.open()
    }
}
