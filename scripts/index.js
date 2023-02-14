
import Card from './card.js';
import FormValidator from './validate.js';
import { inCards, validateSet, cardSet } from './constants.js';

/*кнопка редактирования в профайле*/
const profile = document.querySelector('.profile');
const openEditPopupButton = profile.querySelector('.profile__edit');

/*имя и профессия из профайла*/
const nameProfile = profile.querySelector('.profile__title');
const jobProfile = profile.querySelector('.profile__subtitle');

/*форма редактирования профиля*/
const popupEdit = document.querySelector('.popup_type_edit');
const formElementsEdit = popupEdit.querySelector('.form');

/*данные из формы*/
const nameInput = formElementsEdit.querySelector('.form__input_theme_name');
const jobInput = formElementsEdit.querySelector('.form__input_theme_profession');

/*галлерея*/
const cardsList = document.querySelector('.gallery__cards');

/*открытие формы добавления карточки*/
const popupAddCard = document.querySelector('.popup_type_new-card');
const addCardButton = profile.querySelector('.profile__add-plus');
const formElementsAddCard = popupAddCard.querySelector('.form');

/*добавление новой карточки*/
const placeInput = popupAddCard.querySelector('.form__input_theme_place');
const linkInput = popupAddCard.querySelector('.form__input_theme_link');

/*закрытие попап по esc*/
function closeForEsc(evt) {
    if (evt.key === 'Escape') closePopup(document.querySelector('.popup_opened'));
}

/*закрытие попап оверлей*/
function closeForOverley(evt) {
    if (evt.target.classList.contains('popup') ||
        evt.target.classList.contains('popup__close-button')) {
            closePopup(evt.currentTarget);
    }
}

/*оработчик для _setOpenPopupCardListener в классе Card*/
function handleOpenPopupCardClick(imageLink, title) {
    const popup = document.querySelector('.popup_type_image');
    openPopup(popup);
    const popupImg = popup.querySelector('.card-popup__image');
    popupImg.src = imageLink;
    popupImg.alt = title;
    popup.querySelector('.card-popup__title').textContent = title;
}

/*открытие попапа*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeForEsc);
    popup.addEventListener('click', closeForOverley);
};

/*закрытие попапа*/
function closePopup (popup) {
    document.removeEventListener('keydown', closeForEsc);
    popup.removeEventListener('click', closeForOverley);
    popup.classList.remove('popup_opened');
};

/*сохранаение данных формы редактирования профиля*/
function sendEditForm(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newJobe = jobInput.value;
    nameProfile.textContent = newName;
    jobProfile.textContent = newJobe;
    closePopup(popupEdit);
};

/*создание отдельной карточки*/
function createCard(element) {
    const card = new Card(element, '#gallery__card', handleOpenPopupCardClick, cardSet);
    const cardElement = card.createCard();
    return cardElement;
}

/*рендеринг страницы*/
function renderCards(cardList) {
    cardList.forEach(element => {
        cardsList.append(createCard(element));
    });
};

renderCards(inCards);

/*валидация формы редактирования профиля*/
const formEditValidator = new FormValidator(validateSet, formElementsEdit);
formEditValidator.enableValidation();

/*событие на открытие формы редактирования профиля*/
openEditPopupButton.addEventListener('click', () => {
    openPopup(popupEdit);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    formEditValidator.resetErrors();
});

/*событие на сохранение данных формы редактирования профиля*/
formElementsEdit.addEventListener('submit', sendEditForm);

/*событие на добавление карточки в каталог*/
formElementsAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardData = {
        name: placeInput.value,
        link: linkInput.value
    }
    cardsList.prepend(createCard(cardData));
    closePopup(popupAddCard);
});

/*валидация формы добавления карточки*/
const formAddCardValidator = new FormValidator(validateSet, formElementsAddCard);
formAddCardValidator.enableValidation();

/*событие на открытие формы добавления карточки в попап*/
addCardButton.addEventListener('click', () => {
    openPopup(popupAddCard);
    formElementsAddCard.reset();
    formAddCardValidator.resetErrors();
});










