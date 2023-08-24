/** This is a constant for the cards container. */
export const cardsContainer = document.querySelector('.places__container');
export const cardsContainerSelector = '.places__container';

/** These are constants for the user data. */
export const profileInfoNameSelector = '.profile__info-name';
export const profilePersonalInfoSelector = '.profile__info-profession';

/** These are constants for the edit and add buttons. */
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

/** These are constants for the place card popup */
export const popupTypeImageSelector = '.popup_type_image';
export const popupImage = '.popup__image';
export const popupCaption = document.querySelector('.popup__caption');

/**  These are general constants for for all popups. */
export const popups = document.querySelectorAll('.popup');
export const closeButtons = document.querySelectorAll('.popup__close-button');

/** These are constants for the add form. */
export const popupAddFormSelector = '.popup_add-form';
export const addForm = document.forms.add_form;
export const placeNameInput = addForm.elements.placename;
export const placeLinkInput = addForm.elements.placelink;

/** These are constants for the edit form. */
export const popupEditFormSelector = '.popup_edit-form';
export const editForm = document.forms.edit_form;
export const nameInput = editForm.elements.username;
export const jobInput = editForm.elements.profession;
export const editFormSubmitButton = editForm.querySelector('.popup__button');

export const cardTemplateSelector = '#place';

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'
}
