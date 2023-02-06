function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
        const inputContainers = Array.from(form.querySelectorAll(config.inputSelector));
        const buttonSave = form.querySelector(config.submitButtonSelector);

        const inputs = inputContainers.map(function (inputContainer) {
            return inputContainer.querySelector('input');
        })

        buttonSave.disabled = inputs.some(function (input) {
            return !input.checkValidity();
        });

        inputContainers.forEach(function (inputContainer) {
            const input = inputContainer.querySelector('input');
            input.addEventListener('input', function () {
                const errorElement = inputContainer.querySelector(config.errorSelector);

                if (input.checkValidity()) {
                    input.classList.remove(config.inputErrorClass);
                    errorElement.textContent = '';
                } else {
                    errorElement.textContent = input.validationMessage;
                    input.classList.add(config.inputErrorClass);
                }

                buttonSave.disabled = inputs.some(function (input) {
                    return !input.checkValidity();
                });
            })
        })
    })
}