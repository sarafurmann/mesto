import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    open(imgUrl, title) {
        const imgEl = this._popup.querySelector('.element-zoom__img');
        const titleEl = this._popup.querySelector('.element-zoom__title');

        imgEl.src = imgUrl;
        imgEl.alt = title;
        titleEl.textContent = title;

        super.open()
    }
}
