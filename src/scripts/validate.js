function isValidHttpUrl(url) {
    return url.startsWith('http://') || url.startsWith('https://')
}

function validateNewCardName(value) {
    if (value === '') {
        return {
            errorMessage: 'Вы пропустили это поле.',
            errorClass: 'popup__input_error',
            valid: false 
        }
    }

    if (!(value.length >= 2 && value.length <= 30)) {
        return {
            errorMessage: 'Длина имени от 2 до 30 символов.',
            errorClass: 'popup__input_error',
            valid: false 
        }
    }

    return {
        errorClass: 'popup__input_error',
        valid: true            
    }
}

function validateNewCardLink(value) {
    if (value === '') {
        return {
            errorMessage: 'Введите адрес сайта.',
            errorClass: 'popup__input_error',
            valid: false 
        }
    }

    if (!isValidHttpUrl(cardLink.value)) {
        return {
            errorMessage: 'Введите URL.',
            errorClass: 'popup__input_error',
            valid: false 
        }
    }

    return {
        errorClass: 'popup__input_error',
        valid: true            
    }
}



function validateNameEdit(value) {
    if (value === '') {
        return {
            errorMessage: 'Заполните это поле.',
            errorClass: 'popup__input_error',
            valid: false 
        }
    }

    if (!(value.length >= 2 && value.length <= 30)) {
        return {
            errorMessage: 'Длина имени от 2 до 30 символов.',
            errorClass: 'popup__input_error',
            valid: false 
        }
    }

    return {
        errorClass: 'popup__input_error',
        valid: true            
    }
}

function validateJob(value) {
    if (value === '') {
        return {
            errorMessage: 'Заполните это поле.',
            errorClass: 'popup__input_error',
            valid: false 
        }
    }

    if (!(value.length >= 2 && value.length <= 300)) {
        return {
            errorMessage: 'Длина имени от 2 до 300 символов.',
            errorClass: 'popup__input_error',
            valid: false 
        }
    }

    return {
        errorClass: 'popup__input_error',
        valid: true            
    }
}
