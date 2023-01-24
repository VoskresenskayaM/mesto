
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass)
    errorElement.textContent = "";
}

    const isValid = (formElement, inputElement, {inputErrorClass, errorClass,  ...rest} ) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    }
    else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass, ...rest}) => {
    
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    }
    else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled', false);
    }
}

const setEventListeners = (formElement, {inputSelector, submitButtonSelector,  ...rest}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, rest);
    console.log(inputList);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, rest);
            toggleButtonState(inputList, buttonElement, rest);
        });
    });
}

const enableValidation = (form, { ...rest}) => {
   /* const formList = Array.from(document.querySelectorAll(form));
    console.log(formList);
    formList.forEach((formElement) => {*/
        setEventListeners(form, rest);
   /* })*/
};

/*enableValidation(settings);*/

/*сброс ошибок и очистка формы*/ 
function resetErrors(form) {
    const formInputs = Array.from(form.querySelectorAll('.form__input'));
    const formInputErrors = Array.from(form.querySelectorAll('.form__input-error'));
    formInputs.forEach((input) => {
        if (input.classList.contains('form__input_type_error'))
            input.classList.remove('form__input_type_error');
    });
    formInputErrors.forEach((inputError) => {
        if (inputError.classList.contains('form__input-error_active'))
            inputError.classList.remove('form__input-error_active')
    });
}

