import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
    constructor(callbakSubmit, popupSelector) {
        super(popupSelector);
        this._selector = document.querySelector(popupSelector);
        this._button = this._selector.querySelector('.popup__button')
        this._callbakSubmit = callbakSubmit;
        this._buttonMeaning = this._button.textContent;
    }

    setParams(card) {
        this._card = card;
    }

    getParams() {
        return this._card;
    }

    setEventListeners() {
        this._button.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._callbakSubmit();
            this.close();
        });
        super.setEventListeners();
    }

    setButtonSave() {
        this._button.textContent = 'Сохранение...'
    }

    setBattonMeaning() {
        this._button.textContent = this._buttonMeaning
    }
}

