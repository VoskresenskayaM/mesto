
export default class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
    }

    _showInputError = (form, inputElement, errorMessage, inputErrorClass, errorClass) => {
        const errorElement = form.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    }

    _hideInputError = (form, inputElement, inputErrorClass, errorClass) => {
        const errorElement = form.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass)
        errorElement.textContent = "";
    }

    _isValid = (formElement, inputElement, { inputErrorClass, errorClass, ...rest }) => {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
        }
        else {
            this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
        }
    }

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState = (inputList, buttonElement, { inactiveButtonClass, ...rest }) => {

        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        }
        else {
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.removeAttribute('disabled', false);
        }
    }

    _setEventListeners = (form, { inputSelector, submitButtonSelector, ...rest }) => {
        const inputList = Array.from(form.querySelectorAll(inputSelector));
        const buttonElement = form.querySelector(submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement, rest);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(form, inputElement, rest);
                this._toggleButtonState(inputList, buttonElement, rest);
            });
        });
    }

    enableValidation = () => {
        this._setEventListeners(this._form, this._settings);
    };

    /*сброс ошибок в форме*/
    resetErrors({ inputSelector, errorInput, inputErrorClass, errorClass, ...rest }) {
        const formInputs = Array.from(this._form.querySelectorAll(inputSelector));
        const formInputErrors = Array.from(this._form.querySelectorAll(errorInput));
        formInputs.forEach((input) => {
            if (input.classList.contains(inputErrorClass))
                input.classList.remove(inputErrorClass);
        });
        formInputErrors.forEach((inputError) => {
            if (inputError.classList.contains(errorClass))
                inputError.classList.remove(errorClass)
        });
    }

    /*неактивная кнопка*/
    disableSubmiButton({ submitButtonSelector, ...rest }) {
        const closeButton = this._form.querySelector(submitButtonSelector);
        closeButton.setAttribute('disabled', true);
        closeButton.classList.add('form__button_inactive');
    }
}


