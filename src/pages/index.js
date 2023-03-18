
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js'
import {
    validateSet, cardSet, formSet, openEditPopupButton,
    nameProfile, jobProfile, imageProfile, addCardButton, imageProfileOverley
} from '../utils/Constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit';
import UserInfo from '../components/UserInfo.js';
import './index.css';

/*КЛАССЫ*/
/*класс для отображения карточек*/
const defaultCardList = new Section({
    renderer: (item) => {
        defaultCardList.addItem(createCard({ data: item }));
    }
}, '.gallery__cards')

/*класс с информацией о пользователе*/
const userInfo = new UserInfo({
    nameSelector: nameProfile,
    aboutSelector: jobProfile,
    avatarSelector: imageProfile
});

/*класс для работы с Api*/
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61',
    '895e832b-1163-4e0c-87e7-99d6139284c1');

/*МЕТОДЫ*/
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
    }, '#gallery__card', userInfo.getUserInfo()._id, cardSet)
    const cardElement = card.createCard();
    return cardElement;
}

/*рендеринг карточек с данными по пользователю*/
api.getAllCardWhithUser()
    .then(([cards, user]) => {
        /*установка данных с сервера текущему пользователю*/
        userInfo.setUserInfo({ data: user });
        /*установка данных пользователя на сайт при открытии страницы*/
        userInfo.setUserInfoInProfile();
        /*рендеринг карточек, полученных с сервера*/
        defaultCardList.renderItems(cards);
    })
    .catch((err) => {
        console.log(err)
    });

/*ВАЛИДАЦИЯ*/
/*объект для записи валидаторов*/
const formValidators = {}

/*Включение валидации*/
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(validateSet, formElement)
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};
enableValidation(formSet);

/*ПОПАПЫ*/
/*попап картинки карточки*/
const popupWithImage = new PopupWithImage('.popup_type_image');
/*установка событий на попап*/
popupWithImage.setEventListeners();

/*попап редактирования профиля*/
const popupEditProfile = new PopupWithForm((userData) => {
    popupEditProfile.renderLoading(true)
    api.editUserInfo({ item: userData }).then((newItem) => {
        userInfo.setUserInfo({ data: newItem });
        userInfo.setUserInfoInProfile();
    })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupEditProfile.close();
            popupEditProfile.renderLoading(false);
        })
}, '.popup_type_edit');

/*установка событий на попап редактирования профиля*/
popupEditProfile.setEventListeners();

/*попап добавления карточек*/
const popupAddCard = new PopupWithForm((cardData) => {
    popupAddCard.renderLoading(true);
    api.addNewCard({ item: cardData })
        .then((newCard) => {
            defaultCardList.addItemStart(createCard({ data: newCard }));
            popupAddCard.close();
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            popupAddCard.close();
            popupAddCard.renderLoading(false);
        })
}, '.popup_type_new-card');

/*установка событий на попап добавления карточки*/
popupAddCard.setEventListeners();

/*попап подтверждения удаления карточки*/
const popupDeleteCard = new PopupWithSubmit(() => {
    popupDeleteCard.renderLoading(true);
    const card = popupDeleteCard.getParams();
    api.deleteCard(card.getCardId())
        .then(() => {
            card.handleRemoveCardClick();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            popupDeleteCard.close();
            popupDeleteCard.renderLoading(false);
        });
}, '.popup_type_delete-card')

/*установка событий на попап подтверждения удаления карточки*/
popupDeleteCard.setEventListeners();

/*попап изменения фото профиля*/
const popupEditAvatar = new PopupWithForm((data) => {
    popupEditAvatar.renderLoading(true)
    api.editAvatar({ item: data }).then((res) => {
        userInfo.setUserInfo({ data: res });
        userInfo.setUserInfoInProfile();
    })
        .catch((err) => console.log(err))
        .finally(() => {
            popupEditAvatar.close();
            popupEditAvatar.renderLoading(false);
        })
},
    '.popup_type_new-avatar')

/*установка событий на попап изменения фото профиля*/
popupEditAvatar.setEventListeners();

/*СОБЫТИЯ*/
/*событие на открытие попапа изменения фото профиля*/
imageProfileOverley.addEventListener('click', () => {
    popupEditAvatar.open();
    formValidators[formSet.formEditAvatar].resetErrors();
    formValidators[formSet.formEditAvatar].disableSubmiButton();
})

/*событие на открытие формы редактирования профиля*/
openEditPopupButton.addEventListener('click', () => {
    popupEditProfile.open();
    popupEditProfile.setValueInputs({ data: userInfo.getUserInfo() });
    formValidators[formSet.formEditUser].resetErrors();
    formValidators[formSet.formEditUser].disableSubmiButton();
});

/*событие на открытие формы добавления карточки*/
addCardButton.addEventListener('click', () => {
    popupAddCard.open();
    formValidators[formSet.formAddCard].resetErrors();
    formValidators[formSet.formAddCard].disableSubmiButton();
});












