import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleConfirmation) {
        super(popupSelector);
        this._confirmButton = this._popup.querySelector('.popup__button');
        this._handleConfirmation = handleConfirmation.bind(this);
        
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', this._handleConfirmation);
    }
}