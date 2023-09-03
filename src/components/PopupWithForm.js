import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__item'));
        this._submitButton = this._popup.querySelector('.popup__button');
    }

    
    _getInputValues() {
        const inputData = {};
        this._inputList.forEach((input) => {
            inputData[input.name] = input.value;
        })

        return inputData;
    }

    changeSubmitButtonName(name) {
        console.log(name);
        this._submitButton.textContent = name;
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