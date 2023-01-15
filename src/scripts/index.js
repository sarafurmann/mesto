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

const cardNameForm = newCardForm.querySelector('#postname');
const cardLink = newCardForm.querySelector('#postlink');

const zoomPopup = document.body.querySelector('#element-zoom');
const zoomPopupCloseBtn = zoomPopup.querySelector('.popup__btn-close');

const elementZoonImage = document.body.querySelector('.element-zoom__img');
const elementZoomTitle = document.body.querySelector('.element-zoom__title');

const cardTemplate = document.querySelector('#cardTemplate').content;


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

profileEditformCloseButton.addEventListener('click', handleClickClose);

profileEditform.addEventListener('submit', handleFormSubmit);

zoomPopupCloseBtn.addEventListener('click', handleClose);

newCardButton.addEventListener('click', handleClickCard);

newCardFormCloseButton.addEventListener('click', handleClickCloseCard);

newCardForm.addEventListener('submit', handleFormSubmitCard);

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
} 

function closePopup(popup) {
    popup.classList.remove('popup_opened');
} 

function handleClick() {
    renderProfileForm(profileName.textContent, profileJob.textContent);
    openPopup(profilePopup);
}

function handleClickClose() {
    closePopup(profilePopup);
}

function handleFormSubmit (evt) {
    evt.preventDefault();

    renderProfile(profileNameAbout.value, profileJobPlace.value);

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


    cardImage.addEventListener('click', openHandler);

    function openHandler() {
        openPopup(zoomPopup);

        elementZoomTitle.textContent = cardItem.name;
        elementZoonImage.src = cardItem.link;
        elementZoonImage.alt = cardItem.name;
    }

    return cardElement;
}

initialCards.forEach(function initCard(cardItem) {
    const card = createCard(cardItem);

    cardsContainer.append(card);
});

function handleFormSubmitCard (evt) {
    evt.preventDefault();

    closePopup(newCardPopup);

    const card = createCard({
        name: cardNameForm.value,
        link: cardLink.value
    });

    cardsContainer.prepend(card);

    cardNameForm.value = '';
    cardLink.value = '';
}

