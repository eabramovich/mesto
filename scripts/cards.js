export default class Card {
  constructor(name, link, templateSelector, handleOpenPopup) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.places__place')
      .cloneNode(true);

      return cardElement;
  }

  _toggleLikeCard(elem) {
      elem.classList.toggle('places__place-like-button_active');
  }

  
  _setEventListeners() {
    //Add a click listener to the like button
    this._element.querySelector('.places__place-like-button').addEventListener('click', (evt) => {
      this._toggleLikeCard(evt.target);
    })
    
    //Add a click listener to the delete button
    this._element.querySelector('.places__place-trash-button').addEventListener('click', (evt) => {
      this._element.remove();
    })

    //Add a click listener to the image
    this._element.querySelector('.places__place-image').addEventListener('click', () => {
      this._handleOpenPopup(this._name, this._link);
    })
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage =  this._element.querySelector('.places__place-image');
    this._element.querySelector('.places__place-name').textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._link;
    
    return this._element;
  }
}
