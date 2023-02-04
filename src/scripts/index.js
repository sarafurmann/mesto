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

const cardNameInput = newCardForm.querySelector('#postname');
const cardLink = newCardForm.querySelector('#postlink');

const zoomPopup = document.body.querySelector('#element-zoom');
const zoomPopupCloseBtn = zoomPopup.querySelector('.popup__btn-close');

const elementZoonImage = document.body.querySelector('.element-zoom__img');
const elementZoomTitle = document.body.querySelector('.element-zoom__title');

const cardTemplate = document.querySelector('#cardTemplate').content;

const formElement = document.body.querySelector('.popup__form');



profileInfoButton.addEventListener('click', handleClick);

profileEditformCloseButton.addEventListener('click', handleClickClose);

zoomPopupCloseBtn.addEventListener('click', handleClose);

newCardButton.addEventListener('click', handleClickCard);

newCardFormCloseButton.addEventListener('click', handleClickCloseCard);

function likedHandler(event) {
    event.target.classList.toggle('elements__info-btn_liked');
}

function handleClickCard() {
    openPopup(newCardPopup);
}

function handleClickCloseCard() {
    closePopup(newCardPopup);
}

function handleClose() {
    closePopup(zoomPopup);
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

function handleClickClose() {
    closePopup(profilePopup);
}

function renderProfile(name, job) {
    profileName.textContent = name;
    profileJob.textContent = job;
}

function renderProfileForm(name, job) {
    profileNameAbout.value = name;
    profileJobPlace.value = job;
}

function createCard(cardItem) {
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__img');

    cardImage.src = cardItem.link;
    cardElement.querySelector('.elements__title').textContent = cardItem.name;
    cardImage.alt = cardItem.name;

    const cardInfoButton = cardElement.querySelector('.elements__info-btn');

    cardInfoButton.addEventListener('click', likedHandler);

    const cardDelete = cardElement.querySelector('.elements__delete-btn');

    cardDelete.addEventListener('click', deleteCard);

    function deleteCard(evt) {
        const card = evt.target.closest('.elements__item');
        card.remove();
    }

    function openHandler() {
        openPopup(zoomPopup);

        elementZoomTitle.textContent = cardItem.name;
        elementZoonImage.src = cardItem.link;
        elementZoonImage.alt = cardItem.name;
    }

    cardImage.addEventListener('click', openHandler);

    return cardElement;
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


function handleProfileFormSubmit (values) {
    const name = values[0];
    const job = values[1];
    renderProfile(name, job);

    closePopup(profilePopup);
}

enableValidation({
    formSelector: '#editform .popup__form',
    inputSelector: '#editform .popup__input-wrapper',
    errorSelector: '.popup__input-error',
    inputErrorClass: 'popup__input_error',
    submitButtonSelector: '#editform .popup__btn-save',
    onSubmit: handleProfileFormSubmit,
})

function handleFormSubmitCard (values) {
    closePopup(newCardPopup);

    const name = values[0];
    const link = values[1];

    const card = createCard({
        name,
        link,
    });

    cardsContainer.prepend(card);

    newCardForm.reset();
}

enableValidation({
    formSelector: '#newpost .popup__form',
    inputSelector: '#newpost .popup__input-wrapper',
    errorSelector: '.popup__input-error',
    inputErrorClass: 'popup__input_error',
    submitButtonSelector: '#newpost .popup__btn-save',
    onSubmit: handleFormSubmitCard,
})
