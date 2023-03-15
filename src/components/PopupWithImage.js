import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector){ 
    super(popupSelector);
    this._image = this._popup.querySelector('.card-popup__image');
    this._title = this._popup.querySelector('.card-popup__title');
}

open({data}) {
   const dataValues = Object.values(data);
   this._image.alt = dataValues[0];
   this._title.textContent = dataValues[0];
   this._image.src = dataValues[1];
   super.open();
  } 
}