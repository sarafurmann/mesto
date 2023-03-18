export class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
    }

    _setDisabledToSubmitButton() {
        this._submitButton.disabled = this._inputs.some(function (input) {
            return !input.checkValidity();
        });
    }

    _showError(input, errorElement) {
        errorElement.textContent = input.validationMessage;
        input.classList.add(this._config.inputErrorClass);
    }

    _hideError(input, errorElement) {
        input.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
    }

    enableValidation() {
        this._setDisabledToSubmitButton();

        this._inputs.forEach((input) => {
            input.addEventListener('input', () => {
                const errorElement = this._form.querySelector('#' + input.id + '-error');

                if (input.checkValidity()) {
                    this._hideError(input, errorElement);
                } else {
                    this._showError(input, errorElement);
                }

                this._setDisabledToSubmitButton();
            })
        })
    }
}