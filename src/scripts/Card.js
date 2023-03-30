export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name
    this._link = data.link
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;
    this._cardElement = this._cardTemplate.querySelector('.elements__item').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.elements__img');
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _likedHandler() {
    this._cardInfoButton.classList.toggle('elements__info-btn_liked');
  }

  render() {
    this._cardImage.src = this._link;
    this._cardElement.querySelector('.elements__title').textContent = this._name;
    this._cardImage.alt = this._name;

    this._cardInfoButton = this._cardElement.querySelector('.elements__info-btn'); 

    this._cardInfoButton.addEventListener('click', () => this._likedHandler());

    const cardDelete = this._cardElement.querySelector('.elements__delete-btn');

    cardDelete.addEventListener('click', () => this._deleteCard());

    this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));

    return this._cardElement;
  }
}