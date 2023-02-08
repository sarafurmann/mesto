function setDisabledToSubmitButton(button, inputs) {
    button.disabled = inputs.some(function (input) {
        return !input.checkValidity();
    });
}

function showError(input, errorElement, errorClass) {
    errorElement.textContent = input.validationMessage;
    input.classList.add(errorClass);
}

function hideError(input, errorElement, errorClass) {
    input.classList.remove(errorClass);
    errorElement.textContent = '';
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
        const inputs = Array.from(form.querySelectorAll(config.inputSelector));
        const submitButton = form.querySelector(config.submitButtonSelector);

        setDisabledToSubmitButton(submitButton, inputs);

        inputs.forEach(function (input) {
            input.addEventListener('input', function () {
                const errorElement = form.querySelector('#' + input.id + '-error');

                if (input.checkValidity()) {
                    hideError(input, errorElement, config.inputErrorClass);
                } else {
                    showError(input, errorElement, config.inputErrorClass);
                }

                setDisabledToSubmitButton(submitButton, inputs);
            })
        })
    })
}