import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    getInputValues() {
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__item'));
        this._inputData = {};
        this._inputList.forEach((input) => {
            this._inputData[input.name] = input.value;
        })

        return this._inputData;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form = this._popup.querySelector('.popup__form');
        this._form.addEventListener('submit', this._handleFormSubmit.bind(this));    
    }

    close() {
        super.close();
        this._form.reset();
    }
}