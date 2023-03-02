
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
    inCards, validateSet, cardSet, openEditPopupButton,
    nameProfile, jobProfile, formElementsEdit, addCardButton,
    formElementsAddCard
} from '../utils/Constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

/*создание отдельной карточки*/
function createCard({data}) {
    const card = new Card({
        cardData: data,
        templateSelector: '#gallery__card',
        handleCardClick: ({cardData: data}) => {
            popupWithImage.open({data: data});
        }
    },cardSet)
    const cardElement = card.createCard();
    return cardElement;
}

/*попап картинки карточки*/
const popupWithImage = new PopupWithImage('.popup_type_image');

/*установка событий на попап*/
popupWithImage.setEventListeners();

/*класс для отображения карточек*/
const defaultCardList = new Section({
    items: inCards,
    renderer: (item) => {
        defaultCardList.addItem(createCard({data: item}))
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
const popupEditProfile = new PopupWithForm((userData) => {
    userInfo.setUserInfo({data: userData});
    nameProfile.textContent = userData.name;
    jobProfile.textContent = userData.profession;
}, '.popup_type_edit');

/*установка событий на попап редактирования профиля*/
popupEditProfile.setEventListeners();

/*валидация формы добавления карточки*/
const formAddCardValidator = new FormValidator(validateSet, formElementsAddCard);
formAddCardValidator.enableValidation();

/*попап добавления карточек*/
const popupAddCard = new PopupWithForm((cardData) => {
    defaultCardList.addItemStart(createCard({data: cardData}));
    popupAddCard.close();
}, '.popup_type_new-card');

/*установка событий на попап добавления карточки*/
popupAddCard.setEventListeners();

/*событие на открытие формы редактирования профиля*/
openEditPopupButton.addEventListener('click', () => {
    popupEditProfile.open();
    popupEditProfile.setValueInputs({data: userInfo.getUserInfo()});
    formEditValidator.resetErrors();
    formEditValidator.disableSubmiButton();
});

/*событие на открытие формы добавления карточки*/
addCardButton.addEventListener('click', () => {
    popupAddCard.open();
    formAddCardValidator.resetErrors();
    formAddCardValidator.disableSubmiButton();
});










