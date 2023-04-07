import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, onSubmit) {
        super(popupSelector);
        this._onSubmit = onSubmit;
        this._form = this._popup.querySelector('form');
        this._inputs = Array.from(this._form.elements);
        this._submitButton = this._form.querySelector('button[type="submit"]');
        this._initialButtonText = this._submitButton.textContent
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
        if (this._clear && this._removeEventListeners) {
            this._removeEventListeners();
        }
    }

    setEventListeners(clear = false, loadingText = 'Сохраняется...') {
        super.setEventListeners();
        this._clear = clear
        const onSubmit = (e) => {
            e.preventDefault();

            this._submitButton.textContent = loadingText;
            this._onSubmit(this._getInputValues());
        }
        this._form.addEventListener('submit', onSubmit);

        this._removeEventListeners = () => {
            this._form.removeEventListener('submit', onSubmit);
        }
    }

    resetText() {
        this._submitButton.textContent = this._initialButtonText;
    }
}