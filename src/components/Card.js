export default class Card {
  constructor(card, templateSelector, handleOpenImagePopup) {
    this._name = card.placename;
    this._link = card.placelink;
    this._templateSelector = templateSelector;
    this._handleOpenImagePopup = handleOpenImagePopup;
  }

  _getTemplate = () => {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.places__place')
      .cloneNode(true);

      return cardElement;
  }

  _toggleLikeCard = () => {
    this._likeButton.classList.toggle('places__place-like-button_active');
  }

  _removeCard = () => {
    this._element.remove();
    this._name = null;
    this._link = null;
    this._likeButton = null;
    this._element = null;
  }

  
  _setEventListeners = () => {
    this._likeButton = this._element.querySelector('.places__place-like-button');
    this._deleteButton = this._element.querySelector('.places__place-trash-button');
    this._cardImage =  this._element.querySelector('.places__place-image');

    /** Add a click listener to the like button */
    this._likeButton.addEventListener('click', this._toggleLikeCard);
    
    /** Add a click listener to the delete button */
    this._deleteButton.addEventListener('click', this._removeCard)

    /** Add a click listener to the image */
    this._cardImage.addEventListener('click', () => {
      this._handleOpenImagePopup(this._name, this._link);
    })
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();
  
    this._element.querySelector('.places__place-name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    
    return this._element;
  }
}
