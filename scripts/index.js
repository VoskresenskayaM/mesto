/*кнопка редактирования в профайле*/
let profile = document.querySelector('.profile');
let openPopupButton = profile.querySelector('.profile__edit');

/*имя и профессия из профайла*/ 
let nameProfile = profile.querySelector('.profile__title');
let jobProfile = profile.querySelector('.profile__subtitle');

/*форма редактирования профиля*/ 
let popup = document.querySelector('.popup');
let formElements = popup.querySelector('.form');
let closePopupButton = popup.querySelector('.popup__close-button');

/*данные из формы*/ 
let nameInput = formElements.querySelector('.form__input_theme_first');
let jobInput = formElements.querySelector('.form__input_theme_second');

/*открытие попапа*/ 
function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
};
openPopupButton.addEventListener('click', openPopup);

/*закрытие попапа*/ 
function closePopup() {
    popup.classList.remove('popup_opened')
};
closePopupButton.addEventListener('click', closePopup);

/*сохранаение данных формы*/ 
function sendForm(evt) {
    evt.preventDefault();
    let newName = nameInput.value;
    let newJobe = jobInput.value;
    nameProfile.textContent = newName;
    jobProfile.textContent = newJobe;
    closePopup();
};
formElements.addEventListener('submit', sendForm);


