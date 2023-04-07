import './index.css'
import { Card } from '../scripts/components/Card.js'
import { FormValidator } from '../scripts/components/FormValidator.js'
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { Api } from '../scripts/api/Api.js';
import { DEFAULT_FORM_VALIDATOR_CONFIG } from '../scripts/constants.js';

const profileInfoButton = document.body.querySelector('.profile__info-button');
const profilePopup= document.body.querySelector('#editform');
const profileEditform = profilePopup.querySelector('form');
const editAvatarForm = document.querySelector('#popup__avatar form')
const profileNameAbout = profileEditform.querySelector('#name');
const profileJobPlace = profileEditform.querySelector('#job');

const newCardButton = document.body.querySelector('.profile__add-button');
const newCardPopup= document.body.querySelector('#newpost');
const newCardForm = newCardPopup.querySelector('form');
const editAvatarButton = document.body.querySelector('.profile__avatar-img');

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-62', {
    headers: {
      authorization: '95ee7e0b-cad2-4cc4-832a-9714fca3277c',
      'Content-Type': 'application/json'
    }
});

const imagePopup = new PopupWithImage('#element-zoom')
imagePopup.setEventListeners()

const userInfo = new UserInfo({
    nameSelector: '.profile__info-name',
    aboutSelector: '.profile__info-job',
    avatarSelector: '.profile__avatar-img'
});

const section = new Section({
    items: [],
    renderer(cardItem) {
        const card = createCard(cardItem);
    
        return card;
    }
}, '.elements__list');

const profileFormValidator = new FormValidator(
    DEFAULT_FORM_VALIDATOR_CONFIG,
    profileEditform
);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(
    DEFAULT_FORM_VALIDATOR_CONFIG,
    newCardForm
);
cardFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(
    DEFAULT_FORM_VALIDATOR_CONFIG,
    editAvatarForm
);
editAvatarFormValidator.enableValidation();

function createCard(data) {
    return new Card(
        data,
        '#cardTemplate',
        imagePopup.open.bind(imagePopup),
        (id, onDelete) => {
            const confirmDeletionFormPopup = new PopupWithForm('#popup__confirm', () => {
                api.deleteCard(id).then(() => {
                    onDelete()
                    confirmDeletionFormPopup.close()
                }).catch(console.error);
            })
            confirmDeletionFormPopup.setEventListeners(true, 'Удаляется...')
            confirmDeletionFormPopup.open()
        },
        (id, isLiked, onLiked) => {
            if (isLiked) {
                api.dislikeCard(id).then(onLiked).catch(console.error);
            } else {
                api.likeCard(id).then(onLiked).catch(console.error);
            }
        }
    ).render();
}

function renderProfileForm(name, job) {
    profileNameAbout.value = name;
    profileJobPlace.value = job;
}

const profileFormPopup = new PopupWithForm('#editform', function handleProfileFormSubmit (data) {
    api.editUser(data.name, data.job).then(() => {
        userInfo.setUserInfo(data.name, data.job);
        
        profileFormPopup.close();
    })
    .catch(console.error)
    .finally(() => {
        profileFormPopup.resetText();
    });
    
})
profileInfoButton.addEventListener('click', function handleClick() {
    const { name, about } = userInfo.getUserInfo()
    renderProfileForm(name, about);
    profileFormValidator.setDisabledToSubmitButton();
    profileFormPopup.open()
});
profileFormPopup.setEventListeners();

const editAvatarFormPopup = new PopupWithForm('#popup__avatar', function handleAvatarFormSubmit (data) {
    api.editUserAvatar(data.avatar).then(() => {
        userInfo.setUserAvatar(data.avatar);

        editAvatarFormPopup.close();
    })
    .catch(console.error)
    .finally(() => {
        editAvatarFormPopup.resetText();
    });
})

editAvatarFormPopup.setEventListeners();

editAvatarButton.addEventListener('click', function handleEditAvatar() {
    editAvatarFormPopup.open();
})

const newCardFormPopup = new PopupWithForm('#newpost', function handleFormSubmitCard (data) {
    api.addCard(data.postname, data.postlink).then((res) => {
        const card = createCard({
            name: data.postname,
            link: data.postlink,
            id: res._id,
            likeCount: res.likes.length,
            canDelete: true
        });
    
        section.addItem(card);
    
        newCardFormPopup.close();
    })
    .catch(console.error)
    .finally(() => {
        newCardFormPopup.resetText();
    });
    
});
newCardButton.addEventListener('click', function handleClickCard() {
    cardFormValidator.setDisabledToSubmitButton();
    newCardFormPopup.open()
});
newCardFormPopup.setEventListeners()

Promise.all([
    api.getUser(),
    api.getInitialCards()
]).then(([user, cards]) => {
    userInfo.setUserInfo(user.name, user.about)
    userInfo.setUserAvatar(user.avatar);

    section.setItems(
        cards.map((card) => {
            return {
                name: card.name,
                link: card.link,
                id: card._id,
                likeCount: card.likes.length,
                isLiked: card.likes.some((like) => like._id === user._id),
                canDelete: user._id === card.owner._id
            }
        })
    )

    section.render();
}).catch(console.error);
