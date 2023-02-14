export default class Card {
    constructor(cardData, templateSelector, handleOpenPopupCardClick, cardSettings) {
        this._imageLink = cardData.link;
        this._title = cardData.name;
        this._templateSelector = templateSelector;
        this._handleOpenPopupCardClick = handleOpenPopupCardClick;
        this._cardSettings = cardSettings;
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

    /*установка событий на карточку*/
    _setEventListeners() {
        /*событие на открытие попап карточки*/
        this._imageDomElement = this._element.querySelector(this._cardSettings.cardImage);
        this._imageDomElement.addEventListener('click', () => {
            this._handleOpenPopupCardClick(this._imageLink, this._title)
        })
        /*событие на удаление  карточки*/
        this._cardDeleteDomElement = this._element.querySelector(this._cardSettings.cardDelete)
        this._cardDeleteDomElement.addEventListener('click', () => {
            this._element.remove();
        });
        /*событие на лайк*/
        this._heartDomElement = this._element.querySelector(this._cardSettings.cardLike);
        this._heartDomElement.addEventListener('click', () => {
            this._heartDomElement.classList.toggle(this._cardSettings.cardActiv)
        })
    }
    /*внешняя функция для создания карточки*/
    createCard() {
        this._element = this._getTemplate(this._cardSettings.card);
        /*установка событий на карточку*/
        this._setEventListeners();
        /*присвоение переменным значений конкретной карточки*/
        this._titleDomElement = this._element.querySelector(this._cardSettings.cardTitle);
        this._titleDomElement.textContent = this._title;
        this._imageDomElement.src = this._imageLink;
        this._imageDomElement.alt = this._title;
        return this._element;
    }
}
