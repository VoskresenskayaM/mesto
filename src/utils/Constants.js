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
    cardLikeCount: '.gallery__card-heart-count',
    cardTitle: '.gallery__card-title',
    cardImage: '.gallery__card-image',
    cardDelete: '.gallery__card-delete',
    cardDeleteInactiv: 'gallery__card-delete_inactiv',
}

const formSettings = {
    formSelector: '.form',
    formEditUser : 'editUser',
    formAddCard : 'addCard',
    formEditAvatar : 'editAvatar'
}

/*кнопка редактирования в профайле*/
const profile = document.querySelector('.profile');
const openEditPopupButton = profile.querySelector('.profile__edit');
/*имя, профессия, фото профайла*/
const nameProfile = profile.querySelector('.profile__title');
const jobProfile = profile.querySelector('.profile__subtitle');
const imageProfile =profile.querySelector('.profile__image');
/*кнопка смены фото профиля*/
const imageProfileOverley =profile.querySelector('.profile__image-overley');
/*кнопка добавления карточки*/
const addCardButton = profile.querySelector('.profile__add-plus');

export {
    initialCards as inCards,
    validateSettings as validateSet,
    cardSettings as cardSet,
    formSettings as formSet,
    openEditPopupButton,
    nameProfile,
    jobProfile,
    imageProfile,
    addCardButton,
    imageProfileOverley
}

