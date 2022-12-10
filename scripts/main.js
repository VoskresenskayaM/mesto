let profile = document.querySelector('.profile');
let openPopupButton = profile.querySelector('.profile__edit');
let nameProfile = profile.querySelector('.profile__title');
let jobProfile = profile.querySelector('.profile__subtitle');

let popup = document.querySelector('.popup');
let formElements = popup.querySelector('.popup__container');
let closePopupButton = formElements.querySelector('.popup__container-close');

let nameInput = popup.querySelector('.popup__container-contact-info_name');
let jobInput = popup.querySelector('.popup__container-contact-info_profession');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = nameProfile.innerText;
    jobInput.value = jobProfile.innerText;
};

function closePopup() {
    popup.classList.remove('popup_opened')
};

function sendForm(evt) {
    evt.preventDefault();
    let newName = nameInput.value;
    let newJobe = jobInput.value;
    nameProfile.textContent = newName;
    jobProfile.textContent = newJobe;
    closePopup();
};

openPopupButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

formElements.addEventListener('submit', sendForm);


