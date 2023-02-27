const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT4nCYHBtUXZDZk_wGEZEcArokGrn7Un-AKw&usqp=CAU'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS5HrEpr1XoxDpel1bIp099D6sCFP9xroWBA&usqp=CAU'
    }
]

const validateSettings = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    errorInput: '.form__input-error',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active',
}

const cardSettings = {
    card: '.gallery__card',
    cardActiv: 'gallery__card-heart_active',
    cardLike: '.gallery__card-heart',
    cardTitle: '.gallery__card-title',
    cardImage: '.gallery__card-image',
    cardDelete: '.gallery__card-delete',
}

/*крестик закрытия попапа*/
const popupCloseButton = document.querySelector('.popup__close-button');
/*поля формы редактирования профиля*/
const nameInput = document.querySelector('.form__input_theme_name');
const jobInput = document.querySelector('.form__input_theme_profession');
/*кнопка редактирования в профайле*/
const profile = document.querySelector('.profile');
const openEditPopupButton = profile.querySelector('.profile__edit');
/*имя и профессия из профайла*/
const nameProfile = profile.querySelector('.profile__title');
const jobProfile = profile.querySelector('.profile__subtitle');
/*форма редактирования профиля*/
const popupEdit = document.querySelector('.popup_type_edit');
const formElementsEdit = popupEdit.querySelector('.form');
/*открытие формы добавления карточки*/
const popupAddCard = document.querySelector('.popup_type_new-card');
const addCardButton = profile.querySelector('.profile__add-plus');
const formElementsAddCard = popupAddCard.querySelector('.form');

export {
    initialCards as inCards,
    validateSettings as validateSet,
    cardSettings as cardSet,
    popupCloseButton,
    nameInput,
    jobInput,
    /*index.js*/
    openEditPopupButton,
    nameProfile,
    jobProfile,
    formElementsEdit,
    addCardButton,
    formElementsAddCard
}

