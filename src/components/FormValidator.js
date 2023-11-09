export default class FormValidator {
    constructor(formElement, validationConfig) {
        this._formElement = formElement;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернет true
            // Обход массива прекратится и вся функция
            // hasInvalidInput вернет true
            return !inputElement.validity.valid;
        });
    };

    disableButton() {
        this._buttonSubmit.classList.add(this._inactiveButtonClass);
        this._buttonSubmit.disabled = true;
    };
    
    enableButton() {
        this._buttonSubmit.classList.remove(this._inactiveButtonClass);
        this._buttonSubmit.disabled = false;
    };

    _toggleButtonState() {
        if(this._hasInvalidInput()) {
            this.disableButton();
        } else {
            this.enableButton();
        }
    };

    _showItemError(inputElement, errorMessage) {
        // Находим элемент ошибки
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-item-error`);
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
    };
    
    _hideItemError(inputElement) {
        // Находим элемент ошибки
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-item-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    };

    hideErrors() {
        this._inputList.forEach((inputElement) => {
            this._hideItemError(inputElement);
        });
    };

    _isValid(inputElement) {
        if(!inputElement.validity.valid) {
            this._showItemError(inputElement, inputElement.validationMessage)
        } else {
            this._hideItemError(inputElement);
        }
    };

    _setFormInputEventListeners() {
        // Делаем массив из всех полей внутри формы
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);
        
        this._toggleButtonState();
    
        this._inputList.forEach((inputElement) => {
            // каждому полю добавляем обработчик события input
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation = () => {
        this._setFormInputEventListeners();
    };

}