import Popup from './Popup.js' 


export default class PopupWithSubmit extends Popup{
    constructor(callbakSubmit, popupSelector){
        super(popupSelector);
        this._callbakSubmit = callbakSubmit;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbakSubmit();
            this.close();
        });
        super.setEventListeners();
        }
}

