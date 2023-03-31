import './index.css'
import { Card } from '../scripts/components/Card.js'
import { FormValidator } from '../scripts/components/FormValidator.js'
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';

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

function renderProfileForm(name, job) {
    profileNameAbout.value = name;
    profileJobPlace.value = job;
}

const profileFormPopup = new PopupWithForm('#editform', function handleProfileFormSubmit (data) {
    userInfo.setUserInfo(data.name, data.job);

    profileFormPopup.close()
})
profileInfoButton.addEventListener('click', function handleClick() {
    renderProfileForm(userInfo.getUserInfo().name, userInfo.getUserInfo().about);
    profileFormValidator.setDisabledToSubmitButton();
    profileFormPopup.open()
});
profileFormPopup.setEventListeners();

const newCardFormPopup = new PopupWithForm('#newpost', function handleFormSubmitCard (data) {
    const card = createCard({
        name: data.postname,
        link: data.postlink,
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
