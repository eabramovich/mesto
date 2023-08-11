import Card from "./cards.js";
import FormValidator from "./validation.js";
import { initialCards } from "./data.js";
import { cardsContainer, profileInfoName, profileInfoProfession} from "./constant.js";
import { editButton, addButton} from "./constant.js";
import { popups, closeButtons} from "./constant.js";
import { popupImageContainer, popupCaption, popupImage} from "./constant.js";
import { popupAddForm, addForm, placeNameInput, placeLinkInput} from "./constant.js";
import { popupEditForm, editForm, nameInput, jobInput, editFormSubmitButton} from "./constant.js";
import { cardTemplateSelector, formAttributeList} from "./constant.js";

function getClosestPopup(elem) {
    const closestPopup = elem.closest('.popup');
    return closestPopup;
}

function getOpenedPopup() {
    return document.querySelector('.popup_opened');
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
}

const handleOpenPopup = function(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openPopup(popupImageContainer);
};

function closeByEsc(evt){
    if(evt.key === 'Escape') {
        closePopup(getOpenedPopup());
    }
}

function addCard(name, link) {
    const newCard = new Card(name, link, cardTemplateSelector, handleOpenPopup);
    const cardElement = newCard.generateCard();
    cardsContainer.prepend(cardElement);
}

function initialLoad() {
    initialCards.forEach((card) => {
        addCard(card.name, card.link);
    });
}

function openAddForm() {
    // Open the popup to add a new place
    openPopup(popupAddForm);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    addCard(placeNameInput.value, placeLinkInput.value);
    closePopup(popupAddForm);
    addForm.reset();

    // Deactivate the submit button
    addFormValidator.disabledButton(evt.submitter);
}

function openEditForm() {
    // Open the popup to edit the data profile
    openPopup(popupEditForm);
    editFormValidator.enableValidation();

     // Fill the fields to profile editing form
     nameInput.value = profileInfoName.textContent;
     jobInput.value = profileInfoProfession.textContent;

     // For case when we close form with error and open again
     editFormValidator.hideItemError(nameInput);
     editFormValidator.hideItemError(jobInput);

     // Activate the submit button
     editFormValidator.enableButton(editFormSubmitButton);
}

function handleEditFormSubmit(evt) {
    evt.preventDefault(); // Cancel the standard form submission
    // Get the value of the username from the edit form and set username in the profile info block
    profileInfoName.textContent = nameInput.value; 
    // Get the value of the profession from the edit form and set profession in the profile info block
    profileInfoProfession.textContent = jobInput.value; 
    closePopup(popupEditForm);
}

// Cards initial load
initialLoad();

//Handler to open the addform
addButton.addEventListener('click', openAddForm);
// Add validation for addForm
const addFormValidator = new FormValidator(addForm, formAttributeList);
addFormValidator.enableValidation();
addForm.addEventListener('submit', handleAddFormSubmit);

// Handler to open the editForm
editButton.addEventListener('click', openEditForm);
// Add validation for editForm
const editFormValidator = new FormValidator(editForm, formAttributeList);
editFormValidator.enableValidation();
editForm.addEventListener('submit', handleEditFormSubmit);

//Handler for closing all popups
closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', (evt) => {
        closePopup(getClosestPopup(evt.target));
    });
});

// Handler for closing popups by clicking on the overlay
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup_opened')) {
            closePopup(evt.target);
        }
    });
})



