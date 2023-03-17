export class Card {
  constructor(data, templateSelector, openPopup) {
    this._name = data.name
    this._link = data.link
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._zoomPopup = document.body.querySelector('#element-zoom');
    this._elementZoonImage = document.body.querySelector('.element-zoom__img');
    this._elementZoomTitle = document.body.querySelector('.element-zoom__title');
    this._cardElement = this._cardTemplate.querySelector('.elements__item').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.elements__img');
    this._openPopup = openPopup;
  }

  _handleZoom() {
    this._openPopup(this._zoomPopup);

    this._elementZoomTitle.textContent = this._name;
    this._elementZoonImage.src = this._link;
    this._elementZoonImage.alt = this._name;
  }

  _deleteCard(evt) {
    this._cardElement.remove();
  }

  _likedHandler(event) {
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

    this._cardImage.addEventListener('click', () => this._handleZoom());

    return this._cardElement;
  }
}