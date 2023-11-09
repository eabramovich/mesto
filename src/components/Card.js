export default class Card {
  constructor({ name, link, likes, owner, _id }, 
              currentUserId, 
              templateSelector, 
              handleOpenImagePopup, 
              handleRemoveCard,
              handleLikeCard) 
  {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._cardId = _id;
    this._currentUserId = currentUserId;
    this._templateSelector = templateSelector;
    this._handleOpenImagePopup = handleOpenImagePopup;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeCard = handleLikeCard;
  }

  isCurrentUserCard() {
    return this._owner._id == this._currentUserId;
  }

  isCurrentUserLikeCard() {
    return this._likes.some(like => like._id == this._currentUserId);
  }

  setLikesCount(count) {
    this._element.querySelector('.places__place-like-count').textContent = count;
  }

  _getTemplate () {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.places__place')
      .cloneNode(true);

      return cardElement;
  }

  toggleLikeCard(likes) {
    this._likes = likes;
    if(this.isCurrentUserLikeCard()) {
      this._likeButton.classList.add('places__place-like-button_active');
    } else {
      this._likeButton.classList.remove('places__place-like-button_active');
    }
    
  }

  removeCardElement() {
    this._element.remove();
    this._name = null;
    this._link = null;
    this._likeButton = null;
    this._element = null;
  }

  
  _setEventListeners() {
    this._likeButton = this._element.querySelector('.places__place-like-button');
    this._deleteButton = this._element.querySelector('.places__place-trash-button');
    this._cardImage =  this._element.querySelector('.places__place-image');

    /** Add a click listener to the like button */
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this._cardId, this);
    });
    
    /** Add a click listener to the delete button */
    if(this.isCurrentUserCard()) {
      this._deleteButton.addEventListener('click', () => {
        this._handleRemoveCard(this._cardId, this);
      });
    }

    /** Add a click listener to the image */
    this._cardImage.addEventListener('click', () => {
      this._handleOpenImagePopup(this._name, this._link);
    })
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._setEventListeners();
  
    this._element.querySelector('.places__place-name').textContent = this._name;

    this.setLikesCount(this._likes.length);
    this.toggleLikeCard(this._likes);

    if(!this.isCurrentUserCard()) {
      this._deleteButton.classList.add('places__place-trash-button_disabled');
    }

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }
}
