import './pages/index.css'
import { Card } from './scripts/Card.js'
import { FormValidator } from './scripts/FormValidator.js'
import { Section } from './scripts/Section.js';
import { UserInfo } from './scripts/UserInfo.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { PopupWithForm } from './scripts/PopupWithForm.js';

const profileInfoButton = document.body.querySelector('.profile__info-button');
const profilePopup= document.body.querySelector('#editform');
const profileEditform = profilePopup.querySelector('form');
const profileNameAbout = profileEditform.querySelector('#name');
const profileJobPlace = profileEditform.querySelector('#job');

const newCardButton = document.body.querySelector('.profile__add-button');
const newCardPopup= document.body.querySelector('#newpost');
const newCardForm = newCardPopup.querySelector('form');

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

const imagePopup = new PopupWithImage('#element-zoom')
imagePopup.setEventListeners()


const userInfo = new UserInfo({
    nameSelector: '.profile__info-name',
    aboutSelector: '.profile__info-job'
});

const section = new Section({
    items: initialCards,
    renderer(cardItem) {
        const card = createCard(cardItem);
    
        return card;
    }
}, '.elements__list');

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

function createCard(data) {
    return new Card(data, '#cardTemplate', imagePopup.open.bind(imagePopup)).render();
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscape)
} 

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscape)
}

function renderProfileForm(name, job) {
    profileNameAbout.value = name;
    profileJobPlace.value = job;
}

function closeEscape(evt) {
    const key = evt.key;
    if (key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));        
    }
}

const profileFormPopup = new PopupWithForm('#editform', function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    userInfo.setUserInfo(evt.target.name.value, evt.target.job.value);

    profileFormPopup.close()
})
profileInfoButton.addEventListener('click', function handleClick() {
    renderProfileForm(userInfo.getUserInfo().name, userInfo.getUserInfo().about);
    profileFormValidator.setDisabledToSubmitButton();
    profileFormPopup.open()
});
profileFormPopup.setEventListeners();

const newCardFormPopup = new PopupWithForm('#newpost', function handleFormSubmitCard (evt) {
    evt.preventDefault();

    const card = createCard({
        name: evt.target.postname.value,
        link: evt.target.postlink.value,
    });

    section.addItem(card);

    newCardFormPopup.close()
});
newCardButton.addEventListener('click', function handleClickCard() {
    cardFormValidator.setDisabledToSubmitButton();
    newCardFormPopup.open()
});
newCardFormPopup.setEventListeners()

section.render();
