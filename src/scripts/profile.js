let profileInfoButton = document.body.querySelector('.profile__info-button');
let profileEditPopup= document.body.querySelector('#editform');
let profileEditform = profileEditPopup.querySelector('form');
let profileEditformCloseButton = profileEditPopup.querySelector('.popup__btn-close');
let profileName = document.body.querySelector('.profile__info-name');
let profileJob = document.body.querySelector('.profile__info-job');
let profileNameAbout = profileEditform.querySelector('#name');
let profileJobPlace = profileEditform.querySelector('#job');

profileInfoButton.addEventListener('click', clickHandler);

profileEditformCloseButton.addEventListener('click', clickHandlerClose);

profileEditform.addEventListener('submit', handleFormSubmit);

function clickHandler() {
    renderProfileForm(profileName.textContent, profileJob.textContent);
    profileEditPopup.classList.add('popup_opened');
}

function clickHandlerClose() {
    closePopup();
}

function closePopup () {
    profileEditPopup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();

    renderProfile(profileNameAbout.value, profileJobPlace.value);

    closePopup();
}

function renderProfile(name, job) {
    profileName.textContent = name;
    profileJob.textContent = job;
}

function renderProfileForm(name, job) {
    profileNameAbout.value = name;
    profileJobPlace.value = job;
}

