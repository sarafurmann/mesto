import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const popups = document.querySelectorAll('.popup');

const profileInfoButton = document.body.querySelector('.profile__info-button');
const profilePopup= document.body.querySelector('#editform');
const profileEditform = profilePopup.querySelector('form');
const profileEditformCloseButton = profilePopup.querySelector('.popup__btn-close');
const profileName = document.body.querySelector('.profile__info-name');
const profileJob = document.body.querySelector('.profile__info-job');
const profileNameAbout = profileEditform.querySelector('#name');
const profileJobPlace = profileEditform.querySelector('#job');

const cardsContainer = document.body.querySelector('.elements__list');

const newCardButton = document.body.querySelector('.profile__add-button');
const newCardPopup= document.body.querySelector('#newpost');
const newCardForm = newCardPopup.querySelector('form');
const newCardFormCloseButton = newCardPopup.querySelector('.popup__btn-close');

const zoomPopup = document.body.querySelector('#element-zoom');
const zoomPopupCloseBtn = zoomPopup.querySelector('.popup__btn-close');

export const initialCards = [
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
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


profileInfoButton.addEventListener('click', handleClick);

profileEditformCloseButton.addEventListener('click', () => closePopup(profilePopup));

zoomPopupCloseBtn.addEventListener('click', () => closePopup(zoomPopup));

newCardButton.addEventListener('click', handleClickCard);

newCardFormCloseButton.addEventListener('click', () => closePopup(newCardPopup));

function createCard(data) {
    return new Card(data, '#cardTemplate', openPopup).render();
}

function handleClickCard() {
    openPopup(newCardPopup);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscape)
} 

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscape)
} 

function handleClick() {
    renderProfileForm(profileName.textContent, profileJob.textContent);
    openPopup(profilePopup);
}

function renderProfile(name, job) {
    profileName.textContent = name;
    profileJob.textContent = job;
}

function renderProfileForm(name, job) {
    profileNameAbout.value = name;
    profileJobPlace.value = job;
}

initialCards.forEach(function initCard(cardItem) {
    const card = createCard(cardItem);

    cardsContainer.append(card);
});

function closeEscape(evt) {
    const key = evt.key;
    if (key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));        
    }
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    })
})

profilePopup.addEventListener('submit', handleProfileFormSubmit);

function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    renderProfile(evt.target.name.value, evt.target.job.value);

    closePopup(profilePopup);
}

newCardForm.addEventListener('submit', handleFormSubmitCard);

function handleFormSubmitCard (evt) {
    evt.preventDefault();

    const card = createCard({
        name: evt.target.postname.value,
        link: evt.target.postlink.value,
    });

    cardsContainer.prepend(card);

    newCardForm.reset();
    closePopup(newCardPopup);
}

const profileFormValidator = new FormValidator({
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_error',
    submitButtonSelector: '.popup__btn-save',
}, profileEditform);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator({
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_error',
    submitButtonSelector: '.popup__btn-save',
}, newCardForm);
cardFormValidator.enableValidation();
