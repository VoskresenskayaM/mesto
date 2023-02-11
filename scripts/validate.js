
export default class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._inputErrorsList = Array.from(this._form.querySelectorAll(this._settings.errorInput));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
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

    _toggleInputErrorState = (formElement, inputElement, {inputErrorClass, errorClass, ...rest }) => {
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

    _toggleButtonState = (inputList, buttonElement, {inactiveButtonClass, ...rest }) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        }
        else {
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.removeAttribute('disabled', false);
        }
    }

    _setEventListeners = ({inputSelector, submitButtonSelector, ...rest }) => {
        this._toggleButtonState(this._inputList, this._buttonElement, rest);
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._toggleInputErrorState(this._form, input, rest);
                this._toggleButtonState(this._inputList, this._buttonElement, rest);
            });
        });
    }

    enableValidation = () => {
        this._setEventListeners(this._settings);
    };

    /*сброс ошибок в форме*/
    resetErrors() {
        this._inputList.forEach((input) => {
            if (input.classList.contains(this._settings.inputErrorClass))
                input.classList.remove(this._settings.inputErrorClass);
        });
        this._inputErrorsList.forEach((inputError) => {
            if (inputError.classList.contains(this._settings.errorClass))
                inputError.classList.remove(this._settings.errorClass)
        });
    }

    /*неактивная кнопка*/
    disableSubmiButton() {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add('form__button_inactive');
    }
}
