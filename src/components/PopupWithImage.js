import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.card-popup__image');
    this._title = this._popup.querySelector('.card-popup__title');
  }

  open({ data }) {
    this._image.alt = data.name;
    this._title.textContent = data.name;
    this._image.src = data.link;
    super.open();
  }
}

