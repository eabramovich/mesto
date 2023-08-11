export default class FormValidator {
    constructor(formElement, formAttributeList) {
        this._formElement = formElement;
        this._formSelector = formAttributeList.formSelector;
        this._inputSelector = formAttributeList.inputSelector;
        this._submitButtonSelector = formAttributeList.submitButtonSelector;
        this._inactiveButtonClass = formAttributeList.inactiveButtonClass;
        this._inputErrorClass = formAttributeList.inputErrorClass;
        this._errorClass = formAttributeList.errorClass;
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернет true
            // Обход массива прекратится и вся функция
            // hasInvalidInput вернет true
            return !inputElement.validity.valid;
        });
    }

    disabledButton(button) {
        button.classList.add(this._inactiveButtonClass);
        button.disabled = true;
    }
    
    enableButton(button) {
        button.classList.remove(this._inactiveButtonClass);
        button.disabled = false;
    }

    _toggleButtonState = (inputList, buttonElement) => {
        if(this._hasInvalidInput(inputList)) {
            this.disabledButton(buttonElement);
        } else {
            this.enableButton(buttonElement);
        }
    }

    _showItemError = (inputElement, errorMessage) => {
        // Находим элемент ошибки
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-item-error`);
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
    };
    
    hideItemError = (inputElement) => {
        // Находим элемент ошибки
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-item-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    }

    _isValid = (inputElement) => {
        if(!inputElement.validity.valid) {
            this._showItemError(inputElement, inputElement.validationMessage)
        } else {
            this.hideItemError(inputElement);
        }
    }

    _setFormInputEventListeners() {
        // Делаем массив из всех полей внутри формы
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonSubmit = this._formElement.querySelector(this._submitButtonSelector);
        
        this._toggleButtonState(inputList, buttonSubmit);
    
        inputList.forEach((inputElement) => {
            // каждому полю добавляем обработчик события input
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonSubmit);
            });
        });
    };

    enableValidation = () => {
        this._setFormInputEventListeners();
    }

}

















// const enableFormValidation = (formAttributeList) => {
//     // Делаем массив из всех форм на странице
//     const formList = Array.from(document.querySelectorAll(formAttributeList.formSelector));

//     formList.forEach((formElement) => {
//         const newForm = new FormValidator(formElement, formAttributeList);
//         newForm.setFormInputEventListeners();
//     });
// };


// //Активация валидации форм
// enableFormValidation(formAttributeList);