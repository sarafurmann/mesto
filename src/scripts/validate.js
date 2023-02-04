function enableValidation(config) {
    const form = document.querySelector(config.formSelector);
    const inputContainers = Array.from(document.querySelectorAll(config.inputSelector));

    const inputs = inputContainers.map(function (inputContainer) {
        return inputContainer.querySelector('input');
    })

    form.addEventListener('submit', function handleSubmit(evt) {
        evt.preventDefault();
        const isInvalid = inputs.some(function (input) {
            return !input.checkValidity();
        });

        if (isInvalid) {
            return;
        }

        config.onSubmit(inputs.map(function (input) {
            return input.value;
        }));
    })

    inputContainers.forEach(function (inputContainer) {
        const input = inputContainer.querySelector('input');
        input.addEventListener('input', function () {
            const errorElement = inputContainer.querySelector(config.errorSelector);
            const buttonSave = document.querySelector(config.submitButtonSelector);

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


}