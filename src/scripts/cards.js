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

let cardsContainer = document.body.querySelector('.elements__list');

let newCardButton = document.body.querySelector('.profile__add-button');
let newCardPopup= document.body.querySelector('#newpost');
let newCardForm = newCardPopup.querySelector('form');
let newCardFormCloseButton = newCardPopup.querySelector('.popup__btn-close');

let cardNameForm = newCardForm.querySelector('#postname');
let cardLink = newCardForm.querySelector('#postlink');

let cardZoom = document.body.querySelector('#element-zoom');
let cardZoomCloseBtn = cardZoom.querySelector('.popup__btn-close');

function createCard(cardItem) {
    const card = document.createElement('li');
    card.classList.add('elements__item')

    const cardImage = document.createElement('img');
    cardImage.classList.add('elements__img')
    cardImage.src = cardItem.link;

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('elements__info')

    const cardInfoTitle = document.createElement('h2');
    cardInfoTitle.classList.add('elements__title')
    cardInfoTitle.textContent = cardItem.name;

    const cardInfoButton = document.createElement('button');
    cardInfoButton.classList.add('elements__info-btn')

    cardInfoButton.addEventListener('click', likedHandler);

    const cardDelete = document.createElement('button');
    cardDelete.classList.add('elements__delete-btn')

    cardDelete.addEventListener('click', deleteCard);

    function deleteCard() {
        cardsContainer.removeChild(card);
    }

    card.appendChild(cardImage);
    card.appendChild(cardDelete);
    card.appendChild(cardInfo);
    cardInfo.appendChild(cardInfoTitle);
    cardInfo.appendChild(cardInfoButton);

    cardsContainer.appendChild(card);

    cardImage.addEventListener('click', openHandler);
    cardZoomCloseBtn.addEventListener('click', closeHandler);

    function openHandler() {
        cardZoom.classList.add('popup_opened');

        let elementZoonImage = document.body.querySelector('.element-zoom__img');
        let elementZoomTitile = document.body.querySelector('.element-zoom__title');

        elementZoomTitile.textContent = cardItem.name;
        elementZoonImage.src = cardItem.link;


    }



    function closeHandler() {
        closeCard();
    }

    function closeCard() {
        cardZoom.classList.remove('popup_opened');
    }


}

initialCards.forEach(createCard);

function likedHandler(event) {
    event.target.classList.toggle('elements__info-btn_liked');
}

newCardButton.addEventListener('click', clickHandlerCard);

newCardFormCloseButton.addEventListener('click', clickHandlerCloseCard);

newCardForm.addEventListener('submit', handleFormSubmitCard);

function clickHandlerCard() {
    newCardPopup.classList.add('popup_opened');
}

function clickHandlerCloseCard() {
    closePopupCard();
}

function closePopupCard () {
    newCardPopup.classList.remove('popup_opened');
}

function handleFormSubmitCard (evt) {
    evt.preventDefault();

    closePopupCard();

    createCard({
        name: cardNameForm.value,
        link: cardLink.value
    })

    cardNameForm.value = '';
    cardLink.value = '';
}



