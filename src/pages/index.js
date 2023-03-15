
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js'
import {
    validateSet, cardSet, openEditPopupButton,
    nameProfile, jobProfile, imageProfile, formElementsEdit, addCardButton,
    formElementsAddCard, formElementsEditAvatar, imageProfileOverley
} from '../utils/Constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit';
import UserInfo from '../components/UserInfo.js';
import './index.css';
let currentUserId

/*создание отдельной карточки*/
function createCard({ data }) {
    const card = new Card({
        cardData: data,
        handleDeleteIconClick: (() => {
            popupDeleteCard.setParams(card);
            popupDeleteCard.open();
        }),
        handleCardClick: (data) => {
            popupWithImage.open({ data: data });
        },
        handleLikeClickApi: (card) => {
            if (!card.getLikeState()) api.likeCard(card.getCardId())
                .then((res) => {
                    card.setLikeCount(res.likes.length);
                    card.editLike();
                })
                .catch((err) => {
                    console.log(err);
                })
            else api.deleteLike(card.getCardId())
                .then((res) => {
                    card.setLikeCount(res.likes.length);
                    card.editLike();
                })
                .catch((err) => {
                    console.log(err);
                })
        },
    }, '#gallery__card', currentUserId, cardSet)
    const cardElement = card.createCard();
    return cardElement;
}

/*попап картинки карточки*/
const popupWithImage = new PopupWithImage('.popup_type_image');

/*установка событий на попап*/
popupWithImage.setEventListeners();

/*класс для отображения карточек*/
const defaultCardList = new Section({
    renderer: (item) => {
        defaultCardList.addItem(createCard({ data: item }))
    }
}, '.gallery__cards')

/*класс для работы с Api*/
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61',
    '895e832b-1163-4e0c-87e7-99d6139284c1');

/*рендеринг карточек с данными по пользователю*/
api.getAllCardWhithUser()
    .then(([cards, user]) => {
        currentUserId = user._id
        defaultCardList.renderItems(cards);
    })
    .catch((err) => {
        console.log(err)
    })

/*информация о пользователе*/
const userInfo = new UserInfo();

/*установка данных пользоателя на сайт при открытии страницы*/
api.getUserInfo().then((item) => {
    userInfo.setUserInfo({ data: item })
    userInfo.setUserInfoInProfile(nameProfile, jobProfile, imageProfile)
})
    .catch((err) => {
        console.log(err)
    })

/*валидация формы редактирования профиля*/
const formEditValidator = new FormValidator(validateSet, formElementsEdit);
formEditValidator.enableValidation();

/*попап редактирования профиля*/
const popupEditProfile = new PopupWithForm((userData) => {
    popupEditProfile.setButtonSave();
    api.editUserInfo({ item: userData }).then((newItem) => {
        nameProfile.textContent = newItem.name;
        jobProfile.textContent = newItem.about;
        popupEditProfile.setBattonMeaning();
    })
        .catch((err) => {
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
    popupAddCard.setButtonSave();
    api.addNewCard({ item: cardData })
        .then((newCard) => {
            defaultCardList.addItemStart(createCard({ data: newCard }));
            popupAddCard.close();
            popupAddCard.setBattonMeaning();
        })
        .catch((err) => {
            console.log(err)
        })

}, '.popup_type_new-card');

/*установка событий на попап добавления карточки*/
popupAddCard.setEventListeners();

/*попап подтверждения удаления карточки*/
const popupDeleteCard = new PopupWithSubmit(() => {
    popupDeleteCard.setButtonSave();
    const card = popupDeleteCard.getParams();
    api.deleteCard(card.getCardId())
        .then(() => {
            card.handleRemoveCardClick();
            popupDeleteCard.setBattonMeaning()
        })
        .catch((err) => console.log(err));
}, '.popup_type_delete-card')

/*установка событий на попап подтверждения удаления карточки*/
popupDeleteCard.setEventListeners();

/*попап изменения фото профиля*/
const popupEditAvatar = new PopupWithForm((data) => {
    popupEditAvatar.setButtonSave()
    api.editAvatar({ item: data }).then((res) => {
        imageProfile.src = res.avatar
        popupEditAvatar.setBattonMeaning()
    })
        .catch((err) => console.log(err))
},
    '.popup_type_new-avatar')
/*установка событий на попап изменения фото профиля*/
popupEditAvatar.setEventListeners();
/*валидация формы изменения фото профиля*/
const formEditAvatar = new FormValidator(validateSet, formElementsEditAvatar);
formEditAvatar.enableValidation();

/*событие на открытие попапа изменения фото профиля*/
imageProfileOverley.addEventListener('click', () => {
    popupEditAvatar.open();
    formEditAvatar.resetErrors();
    formEditAvatar.disableSubmiButton();
})

/*событие на открытие формы редактирования профиля*/
openEditPopupButton.addEventListener('click', () => {
    popupEditProfile.open();
    popupEditProfile.setValueInputs({ data: userInfo.getUserInfo() });
    formEditValidator.resetErrors();
    formEditValidator.disableSubmiButton();
});

/*событие на открытие формы добавления карточки*/
addCardButton.addEventListener('click', () => {
    popupAddCard.open();
    formAddCardValidator.resetErrors();
    formAddCardValidator.disableSubmiButton();
});












