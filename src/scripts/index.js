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

const cardNameForm = newCardForm.querySelector('#postname');
const cardLink = newCardForm.querySelector('#postlink');

const zoomPopup = document.body.querySelector('#element-zoom');
const zoomPopupCloseBtn = zoomPopup.querySelector('.popup__btn-close');

const elementZoonImage = document.body.querySelector('.element-zoom__img');
const elementZoomTitle = document.body.querySelector('.element-zoom__title');

const cardTemplate = document.querySelector('#cardTemplate').content;

const formElement = document.body.querySelector('.popup__form');
const formInput = formElement.querySelector('.postname-error');
buttonSave = newCardPopup.querySelector('.popup__btn-save');



profileInfoButton.addEventListener('click', handleClick);

profileEditformCloseButton.addEventListener('click', handleClickClose);

profileEditform.addEventListener('submit', handleFormSubmit);

zoomPopupCloseBtn.addEventListener('click', handleClose);

newCardButton.addEventListener('click', handleClickCard);

newCardFormCloseButton.addEventListener('click', handleClickCloseCard);

newCardForm.addEventListener('submit', handleFormSubmitCard);

cardNameForm.addEventListener('input', handleChangeCardName);
cardLink.addEventListener('input', handleChangeCardLink);
profileNameAbout.addEventListener('input', handleChangeNameAbout);
profileJobPlace.addEventListener('input', handleChangeJobPlace);

let cardNameValidation = validateNewCardName('');
let cardLinkValidation = validateNewCardLink('');
let NameEditValidation = validateNewCardLink('');
let JobValidation = validateNewCardLink('');

function handleChangeCardName() {
    const errorName = newCardPopup.querySelector('.postname-error');
    cardNameValidation = validateNewCardName(cardNameForm.value);

    if (cardNameValidation.valid) {
        cardNameForm.classList.remove(cardNameValidation.errorClass);
        errorName.textContent = '';
    } else {
        errorName.textContent = cardNameValidation.errorMessage;
        cardNameForm.classList.add(cardNameValidation.errorClass);
    }

    buttonSave.disabled = !cardNameValidation.valid || !cardLinkValidation.valid;
}

function handleChangeCardLink() {
    const errorLink = newCardPopup.querySelector('.postlink-error');
    cardLinkValidation = validateNewCardLink(cardLink.value);
    

    if (cardLinkValidation.valid) {
        cardLink.classList.remove(cardLinkValidation.errorClass);
        errorLink.textContent = '';
    } else {
        errorLink.textContent = cardLinkValidation.errorMessage;
        cardLink.classList.add(cardLinkValidation.errorClass);
    }

    buttonSave.disabled = !cardNameValidation.valid || !cardLinkValidation.valid;
}

function handleChangeNameAbout() {
    const errorNameEdit = profilePopup.querySelector('.name-error');
    NameEditValidation = validateNameEdit(profileNameAbout.value);

    if (NameEditValidation.valid) {
        profileNameAbout.classList.remove(NameEditValidation.errorClass);
        errorNameEdit.textContent = '';
    } else {
        errorNameEdit.textContent = NameEditValidation.errorMessage;
        profileNameAbout.classList.add(NameEditValidation.errorClass);
    }

    buttonSave.disabled = !NameEditValidation.valid || !JobValidation.valid;
}

function handleChangeJobPlace() {
    const errorJob = profilePopup.querySelector('.job-error');
    JobValidation = validateJob(profileJobPlace.value);

    if (JobValidation.valid) {
        profileJobPlace.classList.remove(JobValidation.errorClass);
        errorJob.textContent = '';
    } else {
        errorJob.textContent = JobValidation.errorMessage;
        profileJobPlace.classList.add(JobValidation.errorClass);
    }

    buttonSave.disabled = !NameEditValidation.valid || !JobValidation.valid;
}



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

function handleFormSubmit (evt) {
    evt.preventDefault();

    const errorNameEdit = profilePopup.querySelector('.name-error');
    const errorJob = profilePopup.querySelector('.job-error');

    const NameEditValidation = validateNameEdit(profileNameAbout.value);
    const JobValidation = validateJob(profileJobPlace.value);

    if (NameEditValidation.valid) {
        profileNameAbout.classList.remove(NameEditValidation.errorClass);
        errorNameEdit.textContent = '';
    } else {
        errorNameEdit.textContent = NameEditValidation.errorMessage;
        profileNameAbout.classList.add(NameEditValidation.errorClass);
    }

    if (JobValidation.valid) {
        profileJobPlace.classList.remove(JobValidation.errorClass);
        errorJob.textContent = '';
    } else {
        errorJob.textContent = JobValidation.errorMessage;
        profileJobPlace.classList.add(JobValidation.errorClass);
    }

    if (!NameEditValidation.valid || !JobValidation.valid) {
        return;
    }


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

    const errorName = newCardPopup.querySelector('.postname-error');
    const errorLink = newCardPopup.querySelector('.postlink-error');

    const cardNameValidation = validateNewCardName(cardNameForm.value);
    const cardLinkValidation = validateNewCardLink(cardLink.value);
    

    if (cardNameValidation.valid) {
        cardNameForm.classList.remove(cardNameValidation.errorClass);
        errorName.textContent = '';
    } else {
        errorName.textContent = cardNameValidation.errorMessage;
        cardNameForm.classList.add(cardNameValidation.errorClass);
    }

    if (cardLinkValidation.valid) {
        cardLink.classList.remove(cardLinkValidation.errorClass);
        errorLink.textContent = '';
    } else {
        errorLink.textContent = cardLinkValidation.errorMessage;
        cardLink.classList.add(cardLinkValidation.errorClass);
    }

    if (!cardNameValidation.valid || !cardLinkValidation.valid) {
        return;
    }

    closePopup(newCardPopup);

    const card = createCard({
        name: cardNameForm.value,
        link: cardLink.value
    });

    cardsContainer.prepend(card);

    cardNameForm.value = '';
    cardLink.value = '';
}

function closeEscape(evt) {
    const key = evt.key;
    if (key === 'Escape') {
        closePopup(document.querySelector('#element-zoom'));        
    }
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
    })
})


