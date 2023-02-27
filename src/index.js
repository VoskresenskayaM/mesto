
import Card from './components/card.js';
import FormValidator from './components/validate.js';
import {
    inCards, validateSet, cardSet, openEditPopupButton,
    nameProfile, jobProfile, formElementsEdit, addCardButton,
    formElementsAddCard
} from './utils/constants.js';
import Section from './components/section.js';
import PopupWithImage from './components/popupWithImage.js';
import PopupWithForm from './components/popupWithForm.js';
import UserInfo from './components/userInfo.js';
import './pages/index.css';

/*попап картинки карточки*/
const popupWithImage = new PopupWithImage('.popup_type_image');

/*класс для отображения карточек*/
const defaultCardList = new Section({
    items: inCards,
    renderer: (item) => {
        const card = new Card({
            cardData: item,
            templateSelector: '#gallery__card',
            handleCardClick: ({cardData: item}) => {
                popupWithImage.setValues({data: item});
                popupWithImage.open();
                popupWithImage.setEventListeners();
            }
        },
            cardSet);
        const cardElement = card.createCard();
        defaultCardList.addItem(cardElement)
    }
}, '.gallery__cards')

/*рендеринг страницы*/
defaultCardList.renderItems();

/*информация о пользователе*/
const userInfo = new UserInfo({
    name: nameProfile.innerHTML,
    profession: jobProfile.innerHTML
});

/*валидация формы редактирования профиля*/
const formEditValidator = new FormValidator(validateSet, formElementsEdit);
formEditValidator.enableValidation();

/*попап редактирования профиля*/
const editPopup = new PopupWithForm((userData) => {
    userInfo.setUserInfo({data: userData});
    nameProfile.textContent = userData.name;
    jobProfile.textContent = userData.profession;
}, '.popup_type_edit');

/*установка событий на попап редактирования профиля*/
editPopup.setEventListeners();

/*событие на открытие формы редактирования профиля*/
openEditPopupButton.addEventListener('click', () => {
    editPopup.open();
    editPopup.setValueInputs({ data: userInfo.getUserInfo() });
    formEditValidator.resetErrors();
    formEditValidator.disableSubmiButton();
});

/*валидация формы добавления карточки*/
const formAddCardValidator = new FormValidator(validateSet, formElementsAddCard);
formAddCardValidator.enableValidation();

/*попап добавления карточек*/
const addCardPopup = new PopupWithForm((cardData) => {
    const card = new Card({
        cardData: cardData,
        templateSelector: '#gallery__card',
        handleCardClick: ({ cardData: cardData }) => {
            popupWithImage.setValues({ data: cardData });
            popupWithImage.open();
            popupWithImage.setEventListeners();
        }
    },
        cardSet);
    const cardElement = card.createCard();
    defaultCardList.addItemStart(cardElement);
    addCardPopup.close();
}, '.popup_type_new-card');

/*установка событий на попап добавления карточки*/
addCardPopup.setEventListeners();

/*событие на открытие формы добавления карточки*/
addCardButton.addEventListener('click', () => {
    addCardPopup.open();
    formAddCardValidator.resetErrors();
    formAddCardValidator.disableSubmiButton();
});










