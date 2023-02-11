export default class Card {
    constructor(cardData, templateSelector, handleOpenPopupCardClick, cardSettings) {
        this._imageLink = cardData.link;
        this._title = cardData.name;
        this._templateSelector = templateSelector;
        this._handleOpenPopupCardClick = handleOpenPopupCardClick;
        this._cardSettings = cardSettings;
    }

    _getTemplate(card) {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(card)
            .cloneNode(true);
        return cardElement;
    }

    _handleLikeClick(cardActiv) {
        this._heartDomElement.classList.toggle(cardActiv);
    }

    _setLikeListener() {
        this._heartDomElement.addEventListener('click', () => {
            this._handleLikeClick(cardActiv);
        })
    }

    _handleRemoveCardClick(card) {
        this._cardDeleteDomElement.closest(card).remove();
    }

    _setRemoveCardListener(card) {
        this._cardDeleteDomElement.addEventListener('click', () => {
            this._handleRemoveCardClick(card);
        });
    }

    _setOpenPopupCardListener() {
        this._element.querySelector('.gallery__card-image').addEventListener('click', () => {
            this._handleOpenPopupCardClick(this._imageLink,  this._title);
        });
    }

    createCard() {
        this._element = this._getTemplate(this._cardSettings.card);
        /*переменные карточки*/
         this._heartDomElement = this._element.querySelector(this._cardSettings.cardLike);
         this._titleDomElement = this._element.querySelector(this._cardSettings.cardTitle);
         this._imageDomElement = this._element.querySelector(this._cardSettings.cardImage);
         this._cardDeleteDomElement =this._element.querySelector(this._cardSettings.cardDelete);
         /*присвоение переменным значений конкретной карточки*/ 
         this._titleDomElement.textContent = this._title;
         this._imageDomElement.src = this._imageLink;
         this._imageDomElement.alt = this._title;
         /*установка событий на карточку*/
         this._setLikeListener(this._cardSettings.cardActiv);
         this._setRemoveCardListener(this._cardSettings.card);
         this._setOpenPopupCardListener();
        return this._element;
    }
}

