export default class Card {
    constructor({ cardData, handleDeleteIconClick, handleCardClick, handleLikeClickApi }, templateSelector, currentUserId, cardSettings) {
        this._cardData = cardData;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClickApi = handleLikeClickApi;
        this._cardSettings = cardSettings;
        this._isOwner = this._cardData.owner._id === currentUserId;
        this._id = this._cardData._id;
        this._like = cardData.likes.some(el => el._id === currentUserId);
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

    handleRemoveCardClick() {
        this._element.remove();
    }

    getCardId() {
        return this._id
    }

    getLikeState() {
        return this._like
    }

    /*установка событий на карточку*/
    _setEventListeners() {
        /*событие на открытие попап карточки*/
        this._imageDomElement = this._element.querySelector(this._cardSettings.cardImage);
        this._likeCountDomElement = this._element.querySelector(this._cardSettings.cardLikeCount);
        this._imageDomElement.addEventListener('click', () => {
            this._handleCardClick({ name: this._cardData.name, link: this._cardData.link })
        })
        /*событие на удаление  карточки*/
        this._cardDeleteDomElement = this._element.querySelector(this._cardSettings.cardDelete)
        this._cardDeleteDomElement.addEventListener('click', () => {
            this._handleDeleteIconClick()
        });
        /*событие на лайк*/
        this._heartDomElement = this._element.querySelector(this._cardSettings.cardLike);
        this._heartDomElement.addEventListener('click', () => {
            this._handleLikeClickApi(this)
        })
    }

    editLike() {
        this._handleLikeClick();
        this._like = !this._like;
    }

    setLikeCount(count) {
        this._likeCountDomElement.textContent = count;
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
        this.setLikeCount(this._cardData.likes.length);
        if (this._like) this._heartDomElement.classList.add(this._cardSettings.cardActiv);
        if (!this._isOwner) {
            this._cardDeleteDomElement.classList.add(this._cardSettings.cardDeleteInactiv)
        }
        return this._element;
    }
}
