import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmit) {
        super(popupSelector);
        this._onSubmit = onSubmit;
        this._form = this._popup.querySelector('form');
    }

    _getInputValues() {
        return Array.from(this._form.elements).map((el) => el.value)
    }

    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => this._onSubmit(e))
    }
}