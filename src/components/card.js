export default class Card {
    constructor({cardData, /*handleDeleteIconClick, */ handleCardClick}, templateSelector, currentUserId, cardSettings) {
        this._cardData=cardData,
        /*this._handleDeleteIconClick=handleDeleteIconClick;*/
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._cardSettings = cardSettings;
        this._isOwner = this._cardData.owner._id===currentUserId
    }

    /*получение элемента template*/
    _getTemplate(card) {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(card)
            .cloneNode(true);
        return cardElement;
    }

    _handleLikeClick() {
        this._heartDomElement.classList.toggle(this._cardSettings.cardActiv);
    }

    _handleRemoveCardClick() {
        this._element.remove();
    }

    /*установка событий на карточку*/
    _setEventListeners() {
        /*событие на открытие попап карточки*/
        this._imageDomElement = this._element.querySelector(this._cardSettings.cardImage);
        this._likeCountDomElement = this._element.querySelector(this._cardSettings.cardLikeCount);
        this._imageDomElement.addEventListener('click', () => {
            this._handleCardClick({cardData: this._cardData});
        })
        /*событие на удаление  карточки*/
        this._cardDeleteDomElement = this._element.querySelector(this._cardSettings.cardDelete)
        this._cardDeleteDomElement.addEventListener('click', () => {
           /* this._handleDeleteIconClick()*/
            this._handleRemoveCardClick();
        });
        /*событие на лайк*/
        this._heartDomElement = this._element.querySelector(this._cardSettings.cardLike);
        this._heartDomElement.addEventListener('click', () => {
            this._handleLikeClick();
        })
    }
    /*внешняя функция для создания карточки*/
    createCard() {
        this._element = this._getTemplate(this._cardSettings.card);
        /*установка событий на карточку*/
        this._setEventListeners();
        /*присвоение переменным значений конкретной карточки*/
        this._titleDomElement = this._element.querySelector(this._cardSettings.cardTitle);
        this._titleDomElement.textContent = this._cardData.name;
        this._imageDomElement.src = this._cardData.link;
        this._imageDomElement.alt = this._cardData.name;
        this._likeCountDomElement.textContent =this._cardData.likes.length;
       if(!this._isOwner){
        //сделать кнопки скрытые и неактивные классами
            this._cardDeleteDomElement.remove()
        }
        return this._element;
    }
}
