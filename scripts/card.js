export default class Card {
    constructor(cardData, templateSelector, handleOpenPopupCardClick) {
        this._imageLink = cardData.link;
        this._title = cardData.name;
        this._templateSelector = templateSelector;
        this._handleOpenPopupCardClick = handleOpenPopupCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.gallery__card')
            .cloneNode(true);
        return cardElement;
    }

    _handleLikeClick() {
        this._element.querySelector('.gallery__card-heart').classList.toggle('gallery__card-heart_active');
    }

    _setLikeListener() {
        this._element.querySelector('.gallery__card-heart').addEventListener('click', () => {
            this._handleLikeClick();
        })
    }

    _handleRemoveCardClick() {
        this._element.querySelector('.gallery__card-delete').closest('.gallery__card').remove();
    }

    _setRemoveCardListener() {
        this._element.querySelector('.gallery__card-delete').addEventListener('click', () => {
            this._handleRemoveCardClick();
        });
    }

    _setOpenPopupCardListener() {
        this._element.querySelector('.gallery__card-image').addEventListener('click', () => {
            this._handleOpenPopupCardClick(this._imageLink,  this._title);
        });
    }

    createCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.gallery__card-title').textContent = this._title;
        const image = this._element.querySelector('.gallery__card-image');
        image.src = this._imageLink;
        image.alt = this._title;
        this._setLikeListener();
        this._setRemoveCardListener();
        this._setOpenPopupCardListener();
        return this._element;
    }
}

