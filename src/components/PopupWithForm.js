import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(callbakSubmit, popupSelector) {
        super(popupSelector);
        this._callbakSubmit = callbakSubmit;
        this._selector = document.querySelector(popupSelector);
        this._form = this._selector.querySelector('.form')
        this._button = this._form.querySelector('.form__button')
        this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
        this._buttonText = this._button.textContent;
    }

    /*установка данных в инпуты поля*/
    setValueInputs({ data }) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    /*получение данных из формы*/
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    /*установка событий на попап*/
    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbakSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._button.textContent = loadingText;
        } else {
            this._button.textContent = this._buttonText;
        }
    }

    /*закрытие попап*/
    close() {
        this._form.reset();
        super.close();
    }
}

