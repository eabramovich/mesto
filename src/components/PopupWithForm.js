import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__item'));
    }

    
    _getInputValues() {
        const inputData = {};
        this._inputList.forEach((input) => {
            inputData[input.name] = input.value;
        })

        return inputData;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form = this._popup.querySelector('.popup__form');
        this._form.addEventListener('submit', evt => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });    
    }

    close() {
        super.close();
        this._form.reset();
    }
}