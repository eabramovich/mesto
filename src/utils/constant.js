/** This is a constant for the cards container. */
export const cardsContainerSelector = '.places__container';

/** These are constants for the user data. */
export const profileInfoNameSelector = '.profile__info-name';
export const profilePersonalInfoSelector = '.profile__info-profession';
export const profileInfoImageSelector = '.profile__avatar';

/** These are constants for the edit and add buttons. */
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

/** These is constant for the image popup */
export const popupTypeImageSelector = '.popup_type_image';

/** These is constant for the confirmation popup */
export const popupTypeConfirmationSelector = '.popup_type_confirmation';

/** These are constants for the add form. */
export const popupAddFormSelector = '.popup_add-form';
export const addForm = document.forms.add_form;

/** These are constants for the edit form. */
export const popupEditFormSelector = '.popup_edit-form';
export const editForm = document.forms.edit_form;
export const nameInput = editForm.elements.username;
export const jobInput = editForm.elements.profession;

export const cardTemplateSelector = '#place';

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'
}
