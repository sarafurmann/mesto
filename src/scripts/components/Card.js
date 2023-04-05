export class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDelete, handleCardLike) {
    this._name = data.name
    this._link = data.link
    this._id = data.id
    this._canDelete = data.canDelete
    this._likeCount = data.likeCount;
    this._isLiked = data.isLiked;
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._cardElement = this._cardTemplate.querySelector('.elements__item').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.elements__img');
    this._cardLikes = this._cardElement.querySelector('.elements__number-like');
  }

  _deleteCard() {
    this._handleCardDelete(this._id, () => this._cardElement.remove());
  }

  _likedHandler() {
    this._handleCardLike(this._id, this._isLiked, () => {
      this._cardInfoButton.classList.toggle('elements__info-btn_liked');
      if (this._isLiked) {
        this._likeCount -= 1;
      } else {
        this._likeCount += 1;
      }

      this._cardLikes.textContent = this._likeCount;
      this._isLiked = !this._isLiked
    })
  }

  render() {
    this._cardImage.src = this._link;
    this._cardElement.querySelector('.elements__title').textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardLikes.textContent = this._likeCount;
    this._cardInfoButton = this._cardElement.querySelector('.elements__info-btn'); 
    if (this._isLiked) {
      this._cardInfoButton.classList.add('elements__info-btn_liked');
    }

    this._cardInfoButton.addEventListener('click', () => this._likedHandler());

    const cardDelete = this._cardElement.querySelector('.elements__delete-btn');
    if (!this._canDelete) {
      cardDelete.remove()
    } else {
      cardDelete.addEventListener('click', () => this._deleteCard());
    }

    this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));

    return this._cardElement;
  }
}