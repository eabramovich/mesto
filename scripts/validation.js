const formAttributeList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'
}


const showItemError = (formElement, inputElement, errorMessage, formAttributeList) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-item-error`);
    inputElement.classList.add(formAttributeList.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formAttributeList.errorClass);
};
 

const hideItemError = (formElement, inputElement, formAttributeList) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-item-error`);
    inputElement.classList.remove(formAttributeList.inputErrorClass);
    errorElement.classList.remove(formAttributeList.errorClass);
    errorElement.textContent = '';
}


const isValid = (formElement, inputElement, formAttributeList) => {
    if(!inputElement.validity.valid) {
        showItemError(formElement, inputElement, inputElement.validationMessage, formAttributeList)
    } else {
        hideItemError(formElement, inputElement, formAttributeList, formAttributeList);
    }
}


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернет true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернет true
        return !inputElement.validity.valid;
    });
}

function disabledButton(button, formAttributeList) {
    button.classList.add(formAttributeList.inactiveButtonClass);
    button.disabled = true;
}


function enableButton(button, formAttributeList) {
    button.classList.remove(formAttributeList.inactiveButtonClass);
    button.disabled = false;
}


const toggleButtonState = (inputList, buttonElement, formAttributeList) => {
    if(hasInvalidInput(inputList)) {
        disabledButton(buttonElement, formAttributeList);
    } else {
        enableButton(buttonElement, formAttributeList);
    }
}


const setFormInputEventListeners = (formElement, formAttributeList) => {
    // Делаем массив из всех полей внутри формы
    const inputList = Array.from(formElement.querySelectorAll(formAttributeList.inputSelector));
    const buttonSubmit = formElement.querySelector(formAttributeList.submitButtonSelector);
    
    toggleButtonState(inputList, buttonSubmit, formAttributeList);

    inputList.forEach((inputElement) => {
        // каждому полю добавляем обработчик события input
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, formAttributeList);
            toggleButtonState(inputList, buttonSubmit, formAttributeList);
        });
    });
};


const enableFormValidation = (formAttributeList) => {
    // Делаем массив из всех форм на странице
    const formList = Array.from(document.querySelectorAll(formAttributeList.formSelector));

    formList.forEach((formElement) => {
        setFormInputEventListeners(formElement, formAttributeList);
    });
};


//Активация валидации форм
enableFormValidation(formAttributeList);