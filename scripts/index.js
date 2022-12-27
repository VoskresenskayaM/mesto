/*кнопка редактирования в профайле*/
const profile = document.querySelector('.profile');
const openPopupButton = profile.querySelector('.profile__edit');

/*имя и профессия из профайла*/
const nameProfile = profile.querySelector('.profile__title');
const jobProfile = profile.querySelector('.profile__subtitle');

/*форма редактирования профиля*/
const popupEdit = document.querySelector('.popup_type_edit');
const formElements = popupEdit.querySelector('.form');
const closePopupButton = popupEdit.querySelector('.popup__close-button');

/*данные из формы*/
const nameInput = formElements.querySelector('.form__input_theme_name');
const jobInput = formElements.querySelector('.form__input_theme_profession');

/*открытие попапа*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
};

openPopupButton.addEventListener('click', () => {
    openPopup(popupEdit);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
});

/*закрытие попапа*/
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

closePopupButton.addEventListener('click', () => {
    closePopup(popupEdit);
});

/*сохранаение данных формы*/
function sendForm(evt) {
    evt.preventDefault();
    const newName = nameInput.value;
    const newJobe = jobInput.value;
    nameProfile.textContent = newName;
    jobProfile.textContent = newJobe;
    closePopup(popupEdit);
};
formElements.addEventListener('submit', sendForm);

/*добавление карточек из массива*/
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
const popupTypeImage = document.querySelector('.popup_type_image');

/*создание карточки*/
function addCard(cardObject) {
    const cardTemplate = document.querySelector('#gallery__card').content;
    const cardElement = cardTemplate.querySelector('.gallery__card').cloneNode(true);
    /*событие для удаление карточки*/
    cardElement.querySelector('.gallery__card-delete').addEventListener('click', ()=> {
        cardElement.closest('.gallery__card').remove();
    });
 
    const image = cardElement.querySelector('.gallery__card-image');
    image.src = cardObject.link;
    image.alt = cardObject.name;
     /*событие для открытия попап карточки*/
    image.addEventListener('click',  () => {
        openPopup(popupTypeImage);
        openCardPopup(cardObject); 
    });

    cardElement.querySelector('.gallery__card-title').textContent = cardObject.name;

    /*лайк*/
    cardElement.querySelector('.gallery__card-heart').addEventListener('click',  (evt) => {
        evt.target.classList.toggle('gallery__card-heart_active');
    });
    return cardElement
}

/*рендеринг страницы*/
const cardsList = document.querySelector('.gallery__cards');
function renderCards(arr) {
    arr.forEach(element => {
        cardsList.append(addCard(element));
    });
};

renderCards(initialCards);

/*открытие формы добавления карточки*/
const popupAddCard = document.querySelector('.popup_type_new-card');
const addCardButton = profile.querySelector('.profile__add-plus');
const formElementsAddCard = popupAddCard.querySelector('.form');

addCardButton.addEventListener('click', () => {
    openPopup(popupAddCard);
});

/*закрытие формы добавления карточки*/
const closeAddCardButton = popupAddCard.querySelector('.popup__close-button');
closeAddCardButton.addEventListener('click', () => {
    closePopup(popupAddCard);
});

/*добавление новой карточки*/
const placeInput = popupAddCard.querySelector('.form__input_theme_place');
const linkInput = popupAddCard.querySelector('.form__input_theme_link');

formElementsAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const card = new Object();
    card.name = placeInput.value;
    card.link = linkInput.value;
    const newCard = addCard(card);
    cardsList.prepend(newCard);
    closePopup(popupAddCard);
});

function removeCard(card)
{
    card.remove();
}
/*открытие попапа с карточкой*/
function openCardPopup (cardObject) {
    const popup = document.querySelector('.popup_type_image'); 
    const popupTemplate = document.querySelector('#card-popup').content; 
    const card = popupTemplate.querySelector('.card-popup').cloneNode(true); 
    const image = card.querySelector('.card-popup__image');
    image.src= cardObject.link;
    image.alt= cardObject.name;
    /*событие для закрытия попапа с карточкой*/
    card.querySelector('.popup__close-button').addEventListener('click', (evt) =>
    {
        closePopup(popupTypeImage);
        setTimeout(removeCard, 600, card);
    });
    card.querySelector('.card-popup__title').textContent = cardObject.name;
    popup.append(card);
}


