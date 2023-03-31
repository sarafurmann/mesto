import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmit) {
        super(popupSelector);
        this._onSubmit = onSubmit;
        this._form = this._popup.querySelector('form');
        this._inputs = Array.from(this._form.elements);
    }

    _getInputValues() {
        this._formValues = {};
        this._inputs.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._onSubmit(this._getInputValues())
        })
    }
}