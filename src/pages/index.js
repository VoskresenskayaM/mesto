
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js'
import {
    validateSet, cardSet, openEditPopupButton,
    nameProfile, jobProfile, imageProfile, formElementsEdit, addCardButton,
    formElementsAddCard
} from '../utils/Constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit';
import UserInfo from '../components/UserInfo.js';
import './index.css';
let currentUserId

/*создание отдельной карточки*/
function createCard({data}) {
    const card = new Card({
        cardData: data,
       /* handleDeleteIconClick: (()=>{
            popupDeleteCard.open()
        }),*/
        handleCardClick: ({cardData: data}) => {
            popupWithImage.open({data: data});
        }
    },'#gallery__card', currentUserId, cardSet)
    const cardElement = card.createCard();
    return cardElement;
}

/*попап картинки карточки*/
const popupWithImage = new PopupWithImage('.popup_type_image');

/*установка событий на попап*/
popupWithImage.setEventListeners();



/*класс для отображения карточек*/
const defaultCardList = new Section({
   /* items: inCards,*/
    renderer: (item) => {
        defaultCardList.addItem(createCard({data: item}))
    }
}, '.gallery__cards')

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61',
'895e832b-1163-4e0c-87e7-99d6139284c1');

Promise.all([api.getCards(), api.getUserInfo()])
.then(([cards, user])=>{
    currentUserId=user._id
    defaultCardList.renderItems(cards);
    
})
/*api.getCards().then((items)=>{
    defaultCardList.renderItems(items);
})*/
.catch((err)=>{
    console.log(err)
})
//здесь запрос возвращает карточки
/*рендеринг страницы*/
/*defaultCardList.renderItems(inCards);*/
 /*информация о пользователе*/
const userInfo = new UserInfo();
api.getUserInfo().then((item)=>{
    userInfo.setUserInfo({data:item})
    userInfo.setUserInfoInProfile(nameProfile, jobProfile, imageProfile)
})
.catch((err)=>{
    console.log(err)
})


/*валидация формы редактирования профиля*/
const formEditValidator = new FormValidator(validateSet, formElementsEdit);
formEditValidator.enableValidation();

/*попап редактирования профиля*/
const popupEditProfile = new PopupWithForm((userData) => {
    /*userInfo.editUserInfo(userData)*/
    api.editUserInfo({item: userData}).then((newItem)=>{
    nameProfile.textContent = newItem.name;
    jobProfile.textContent = newItem.about;
    })
    .catch((err)=>{
        console.log(err)
    })
  
}, '.popup_type_edit');

/*установка событий на попап редактирования профиля*/
popupEditProfile.setEventListeners();

/*валидация формы добавления карточки*/
const formAddCardValidator = new FormValidator(validateSet, formElementsAddCard);
formAddCardValidator.enableValidation();

/*попап добавления карточек*/
const popupAddCard = new PopupWithForm((cardData) => {
    api.addNewCard({item: cardData})
    .then((newCard)=>{
    defaultCardList.addItemStart(createCard({data: newCard}));
    popupAddCard.close();
    })
    .catch((err)=>{
        console.log(err)
    })
  
}, '.popup_type_new-card');

/*установка событий на попап добавления карточки*/
popupAddCard.setEventListeners();

/*const popupDeleteCard = new PopupWithSubmit(()=>{
   
}, '.popup_type_delete-card'
) 
popupDeleteCard.setEventListeners();*/



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












