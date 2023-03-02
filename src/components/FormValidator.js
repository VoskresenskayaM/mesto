
export default class FormValidator {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._inputErrorsList = Array.from(this._form.querySelectorAll(this._settings.errorInput));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    }

     /*показ ошибки*/
    _showInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._settings.errorClass);
    }

  /*скрытие ошибки*/
    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.classList.remove(this._settings.errorClass)
        errorElement.textContent = "";
    }

  /*проверка валидности поля*/
    _toggleInputErrorState = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        }
        else {
            this._hideInputError(inputElement);
        }
    }
    
   /*проверка валидности массива инпутов формы*/
    _hasInvalidInput = () => {
        return this._inputList.some((input) => {
            return !input.validity.valid;
        });
    };

    /*смена состояния кнопки*/
    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this.disableSubmiButton();
        }
        else {
            this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', false);
        }
    }

     /*установка событий дл всех полей формы*/
    _setEventListeners = () => {
        this._toggleButtonState();
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._toggleInputErrorState(input);
                this._toggleButtonState();
            });
        });
    }

    /*внешняя функция для валидации карточки*/
    enableValidation = () => {
          this._setEventListeners();
    };

    /*сброс ошибок в форме*/
    resetErrors() {
        this._inputList.forEach((input) => {
            if (input.classList.contains(this._settings.inputErrorClass))
                input.classList.remove(this._settings.inputErrorClass);
        });
        this._inputErrorsList.forEach((inputError) => {
            if (inputError.classList.contains(this._settings.errorClass))
                inputError.classList.remove(this._settings.errorClass);
        });
    }

    /*установка для кнопки неактивного состояния*/
    disableSubmiButton() {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    }
}


