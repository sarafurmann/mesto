let profileInfoButton = document.body.querySelector('.profile__info-button');
let profileEditform = document.body.querySelector('#editform');
let profileEditformCloseButton = profileEditform.querySelector('.popup__btn-close');
let profileName = document.body.querySelector('.profile__info-name');
let profileJob = document.body.querySelector('.profile__info-job');
let profileNameAbout = profileEditform.querySelector('#name');
let profileJobPlace = profileEditform.querySelector('#job');



function clickHandler() {
    renderProfileForm(profileName.textContent, profileJob.textContent);
    profileEditform.classList.add('popup_opened');
}

profileInfoButton.addEventListener('click', clickHandler);

function clickHandlerClose() {
    closePopup();
}

profileEditformCloseButton.addEventListener('click', clickHandlerClose);

function closePopup () {
    profileEditform.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();

    renderProfile(profileNameAbout.value, profileJobPlace.value);

    closePopup();
}

profileEditform.addEventListener('submit', handleFormSubmit)

function renderProfile(name, job) {
    profileName.textContent = name;
    profileJob.textContent = job;
}

function renderProfileForm(name, job) {
    profileNameAbout.value = name;
    profileJobPlace.value = job;
}

