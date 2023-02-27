import {popupCloseButton} from "../utils/constants.js"

export default class Popup {
constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
}

open() {
    this._popup.classList.add('popup_opened');
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
        this.close()});
    document.addEventListener('keydown', (ev) => {
        this._handleEscClose(ev) });
    this._popup.addEventListener('click', (ev) => {
        this._closeForOverley(ev)});
 }
}