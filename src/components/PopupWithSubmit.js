import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
    constructor(callbakSubmit, popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__button');
        this._callbakSubmit = callbakSubmit;
        this._buttonText = this._button.textContent;
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
        });
        super.setEventListeners();
    }

    renderLoading(isLoading, loadingText = 'Удаление...') {
        if (isLoading) {
            this._button.textContent = loadingText;
        } else {
            this._button.textContent = this._buttonText;
        }
    }
}

