
/*кнопка редактирования в профайле*/
const profile = document.querySelector('.profile');
const openEditPopupButton = profile.querySelector('.profile__edit');

/*имя и профессия из профайла*/
const nameProfile = profile.querySelector('.profile__title');
const jobProfile = profile.querySelector('.profile__subtitle');

/*форма редактирования профиля*/
const popupEdit = document.querySelector('.popup_type_edit');
const formElementsEdit = popupEdit.querySelector('.form');
const closeEditPopupButton = popupEdit.querySelector('.popup__close-button');
const closeEditFormButton = popupEdit.querySelector(".form__button");

/*данные из формы*/
const nameInput = formElementsEdit.querySelector('.form__input_theme_name');
const jobInput = formElementsEdit.querySelector('.form__input_theme_profession');

/*ошибки инпут*/
const editInputs = formElementsEdit.querySelectorAll('.form__input')
const editInputErrors = formElementsEdit.querySelector('.form__input-error')

/*попап карточки*/
const popupTypeImage = document.querySelector('.popup_type_image');
const popupTypeImageImage = popupTypeImage.querySelector('.card-popup__image');
const popupTypeImageTitle = popupTypeImage.querySelector('.card-popup__title')

/*галлерея*/
const cardsList = document.querySelector('.gallery__cards');

/*открытие формы добавления карточки*/
const popupAddCard = document.querySelector('.popup_type_new-card');
const addCardButton = profile.querySelector('.profile__add-plus');
const formElementsAddCard = popupAddCard.querySelector('.form');
const closeAddCardFormButton = popupAddCard.querySelector(".form__button")

/*закрытие формы добавления карточки*/
const closeAddCardButton = popupAddCard.querySelector('.popup__close-button');

/*добавление новой карточки*/
const placeInput = popupAddCard.querySelector('.form__input_theme_place');
const linkInput = popupAddCard.querySelector('.form__input_theme_link');

/*template*/
const cardTemplate = document.querySelector('#gallery__card').content;

/*закрытие попап по esc*/
function closeForEsc(evt) {
    if (evt.key === 'Escape') closePopup(document.querySelector('.popup_opened'));
}

/*закрытие попап оверлей*/
function closeForOverley(evt) {
    if (evt.target.classList.contains('popup') ||
        evt.target.classList.contains('popup__close-button')) {
        closePopup(document.querySelector('.popup_opened'));
    }
}

/*открытие попапа*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeForEsc);
    popup.addEventListener('click', closeForOverley);
};

/*закрытие попапа*/
function closePopup(popup) {
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

/*создание карточки*/
function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);
    /*событие для удаление карточки*/
    cardElement.querySelector('.gallery__card-delete').addEventListener('click', () => {
        cardElement.closest('.gallery__card').remove();
    });

    const image = cardElement.querySelector('.gallery__card-image');
    image.src = cardData.link;
    image.alt = cardData.name;
    /*событие для открытия попап карточки*/
    image.addEventListener('click', () => {
        openPopup(popupTypeImage);
        openCardPopup(cardData);
    });

    cardElement.querySelector('.gallery__card-title').textContent = cardData.name;

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
function openCardPopup(cardData) {
    popupTypeImageImage.src = cardData.link;
    popupTypeImageImage.alt = cardData.name;
    popupTypeImageTitle.textContent = cardData.name;
}

/*событие на открытие формы редактирования профиля*/
openEditPopupButton.addEventListener('click', () => {
    openPopup(popupEdit);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    disableSubmiButton(closeEditFormButton);
    resetErrors(formElementsEdit);
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
    disableSubmiButton(closeAddCardFormButton);
    formElementsAddCard.reset();
    resetErrors(formElementsAddCard);
});










