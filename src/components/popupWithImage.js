import Popup from './popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector){ 
    super(popupSelector);
}

setValues({data}){
this._title = data.name;
    this._image = data.link;
}

open() {
   super.open();
   const imgage = this._popup.querySelector('.card-popup__image');
   imgage.src = this._image;
   imgage.alt = this._title;
   this._popup.querySelector('.card-popup__title').textContent = this._title;
  } 
}