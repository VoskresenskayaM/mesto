import { popupCloseButton } from "../utils/Constants.js"

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeForOverley = this._closeForOverley.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this._popup.addEventListener('click', this._closeForOverley);
        document.addEventListener('keydown', this._handleEscClose);

    }

    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('click', this._closeForOverley);
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') this.close();
    }

    _closeForOverley(evt) {
        if (evt.target.classList.contains('popup') ||
            evt.target.classList.contains('popup__close-button'))
            this.close();
    }

    setEventListeners() {
        popupCloseButton.addEventListener('click', () => {
            this.close()
        });
    }
}