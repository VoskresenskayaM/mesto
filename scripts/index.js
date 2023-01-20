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

/*кнопка редактирования в профайле*/
const profile = document.querySelector('.profile');
const openEditPopupButton = profile.querySelector('.profile__edit');

/*имя и профессия из профайла*/
const nameProfile = profile.querySelector('.profile__title');
const jobProfile = profile.querySelector('.profile__subtitle');

/*форма редактирования профиля*/
const popupEdit = document.querySelector('.popup_type_edit');
const formElementsEdit = popupEdit.querySelector('.form');
const closePopupButton = popupEdit.querySelector('.popup__close-button');

/*данные из формы*/
const nameInput = formElementsEdit.querySelector('.form__input_theme_name');
const jobInput = formElementsEdit.querySelector('.form__input_theme_profession');

/*ошибки инпут*/
const editInputs = formElementsEdit.querySelectorAll('.form__input')
const editInputErrors = formElementsEdit.querySelector('.form__input-error')

/*попап карточки*/
const popupTypeImage = document.querySelector('.popup_type_image');

/*галлерея*/
const cardsList = document.querySelector('.gallery__cards');

/*открытие формы добавления карточки*/
const popupAddCard = document.querySelector('.popup_type_new-card');
const addCardButton = profile.querySelector('.profile__add-plus');
const formElementsAddCard = popupAddCard.querySelector('.form');

/*закрытие формы добавления карточки*/
const closeAddCardButton = popupAddCard.querySelector('.popup__close-button');

/*добавление новой карточки*/
const placeInput = popupAddCard.querySelector('.form__input_theme_place');
const linkInput = popupAddCard.querySelector('.form__input_theme_link');

/*закрытие попап по оверлей*/
function closeForEsc(evt) {
    const activPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') closePopup(activPopup);
}

/*закрытие попап esc*/
function closeForOverley(evt) {
    const activPopup = document.querySelector('.popup_opened');
    if (evt.target.classList.contains('popup') || 
    evt.target.classList.contains('popup__close-button')) {
        closePopup(activPopup);
    }
}

/*сброс ошибок и очистка формы*/ 
function resetErrors(form) {
    const formInputs = Array.from(form.querySelectorAll('.form__input'));
    const formInputErrors = Array.from(form.querySelectorAll('.form__input-error'));
    formInputs.forEach((input) => {
        if (input.classList.contains('form__input_type_error'))
            input.classList.remove('form__input_type_error');
    });
    formInputErrors.forEach((inputError) => {
        if (inputError.classList.contains('form__input-error_active'))
            inputError.classList.remove('form__input-error_active')
    });
}

/*открытие попапа*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeForEsc);
    popup.addEventListener('click', closeForOverley);
};

/*закрытие попапа*/
function closePopup(popup) {
    const form = popup.querySelector('.form');
    if (form!==null) {
        resetErrors(form);
        form.reset();
    }
    popup.removeEventListener('keydown', closeForEsc);
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

/*создание карточки*/
function createCard(cardObject) {
    const cardTemplate = document.querySelector('#gallery__card').content;
    const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);
    /*событие для удаление карточки*/
    cardElement.querySelector('.gallery__card-delete').addEventListener('click', () => {
        cardElement.closest('.gallery__card').remove();
    });

    const image = cardElement.querySelector('.gallery__card-image');
    image.src = cardObject.link;
    image.alt = cardObject.name;
    /*событие для открытия попап карточки*/
    image.addEventListener('click', () => {
        openPopup(popupTypeImage);
        openCardPopup(cardObject);
    });

    cardElement.querySelector('.gallery__card-title').textContent = cardObject.name;

    /*лайк*/
    cardElement.querySelector('.gallery__card-heart').addEventListener('click', (evt) => {
        evt.target.classList.toggle('gallery__card-heart_active');
    });
    return cardElement
}

/*рендеринг страницы*/
function renderCards(cardList) {
    cardList.forEach(element => {
        cardsList.append(createCard(element));
    });
};

renderCards(initialCards);

/*открытие попапа с карточкой*/
function openCardPopup(cardObject) {
    const image = popupTypeImage.querySelector('.card-popup__image');
    image.src = cardObject.link;
    image.alt = cardObject.name;
    popupTypeImage.querySelector('.card-popup__title').textContent = cardObject.name;
}

/*событие на открытие формы редактирования профиля*/
openEditPopupButton.addEventListener('click', () => {
    openPopup(popupEdit);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
});

/*событие на сохранение данных формы редактирования профиля*/
formElementsEdit.addEventListener('submit', sendEditForm);

/*событие на добавление карточки в каталог*/
formElementsAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const card = {
        name: placeInput.value,
        link: linkInput.value
    }
    cardsList.prepend(createCard(card));
    closePopup(popupAddCard);
});

/*событие на открытие формы добавления карточки в попап*/
addCardButton.addEventListener('click', () => {
    openPopup(popupAddCard);
});










