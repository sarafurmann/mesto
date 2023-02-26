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

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name
    this._link = data.link
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._elementZoonImage = document.body.querySelector('.element-zoom__img');
    this._elementZoomTitle = document.body.querySelector('.element-zoom__title');
  }

  _openHandler = () => {
    openPopup(zoomPopup);

    this._elementZoomTitle.textContent = this._name;
    this._elementZoonImage.src = this._link;
    this._elementZoonImage.alt = this._name;
  }

  _deleteCard(evt) {
    const card = evt.target.closest('.elements__item');
    card.remove();
  }

  _likedHandler(event) {
    event.target.classList.toggle('elements__info-btn_liked');
  }

  render() {
    const cardElement = this._cardTemplate.querySelector('.elements__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__img');

    cardImage.src = this._link;
    cardElement.querySelector('.elements__title').textContent = this._name;
    cardImage.alt = this._name;

    const cardInfoButton = cardElement.querySelector('.elements__info-btn');

    cardInfoButton.addEventListener('click', this._likedHandler);

    const cardDelete = cardElement.querySelector('.elements__delete-btn');

    cardDelete.addEventListener('click', this._deleteCard);

    cardImage.addEventListener('click', this._openHandler);

    return cardElement;
  }
}