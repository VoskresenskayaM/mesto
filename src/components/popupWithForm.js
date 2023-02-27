import Popup from './popup.js'
import { nameInput, jobInput } from "../utils/constants.js"

export default class PopupWithForm extends Popup {
    constructor(callbakSubmit, popupSelector) {
        super(popupSelector);
        this._callbakSubmit = callbakSubmit;
        this._selector = document.querySelector(popupSelector);
        this._form = this._selector.querySelector('.form')
        this._popup = document.querySelector(popupSelector);
    }

    /*установка данных пользователя в инпуты поля*/
    setValueInputs({data}) {
        nameInput.value = data.name;
        jobInput.value = data.profession;
    }

    /*получение данных из формы*/
    _getInputValues() {
        this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
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
            this.close();
        });
        super.setEventListeners();
        }
    
    /*закрытие попап*/
    close() {
        this._form.reset();
        super.close();
    }

}
