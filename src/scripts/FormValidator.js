export class FormValidator {
    constructor(config, form) {
        this._config = config
        this._form = form
    }

    _setDisabledToSubmitButton(button, inputs) {
        button.disabled = inputs.some(function (input) {
            return !input.checkValidity();
        });
    }

    _showError(input, errorElement, errorClass) {
        errorElement.textContent = input.validationMessage;
        input.classList.add(errorClass);
    }

    _hideError(input, errorElement, errorClass) {
        input.classList.remove(errorClass);
        errorElement.textContent = '';
    }

    enableValidation() {
        const inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        const submitButton = this._form.querySelector(this._config.submitButtonSelector);

        this._setDisabledToSubmitButton(submitButton, inputs);

        inputs.forEach( (input) => {
            input.addEventListener('input', () => {
                const errorElement = this._form.querySelector('#' + input.id + '-error');

                if (input.checkValidity()) {
                    this._hideError(input, errorElement, this._config.inputErrorClass);
                } else {
                    this._showError(input, errorElement, this._config.inputErrorClass);
                }

                this._setDisabledToSubmitButton(submitButton, inputs);
            })
        })
    }
}