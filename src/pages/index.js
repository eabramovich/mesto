import './index.css';

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/data.js";
import { cardsContainerSelector, profileInfoNameSelector, profilePersonalInfoSelector} from "../utils/constant.js";
import { editButton, addButton} from "../utils/constant.js";
import { popupTypeImageSelector} from "../utils/constant.js";
import { popupAddFormSelector, addForm, placeNameInput, placeLinkInput} from "../utils/constant.js";
import { popupEditFormSelector, editForm, nameInput, jobInput} from "../utils/constant.js";
import { cardTemplateSelector, validationConfig} from "../utils/constant.js";

const popupWithImage = new PopupWithImage(popupTypeImageSelector);
popupWithImage.setEventListeners();

const popupAddForm = new PopupWithForm(popupAddFormSelector, handleAddFormSubmit);
popupAddForm.setEventListeners();

const popupEditForm = new PopupWithForm(popupEditFormSelector, handleEditFormSubmit);
popupEditForm.setEventListeners();

const userInfo = new UserInfo({userNameSelector: profileInfoNameSelector, userInfoSelector: profilePersonalInfoSelector});

/**  Add validation for editForm */
const editFormValidator = new FormValidator(editForm, validationConfig);
editFormValidator.enableValidation();

/**  Add validation for addForm */
const addFormValidator = new FormValidator(addForm, validationConfig);
addFormValidator.enableValidation();

const handleOpenImagePopup = function(name, link) {
    popupWithImage.open(name, link);
};

function createCard(cardData) {
    const newCard = new Card(cardData, cardTemplateSelector, handleOpenImagePopup);
    const generatedCard = newCard.generateCard();

    return generatedCard;
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    }
}, cardsContainerSelector);

function openAddForm() {
    /**  Open the popup to add a new place */
    popupAddForm.open();
    addFormValidator.hideErrors();
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const cardData = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    }
    const cardElement = createCard(cardData);
    cardList.addItem(cardElement);

    popupAddForm.close();

    /** Deactivate the submit button */
    addFormValidator.disableButton(evt.submitter);
}

function openEditForm() {
    /** Open the popup to edit the data profile */
    popupEditForm.open();

    const userData = userInfo.getUserInfo();
    /** Fill the fields to profile editing form */
    nameInput.value = userData.name;
    jobInput.value = userData.personalInfo;

    /** For case when we close form with error and open again */
    editFormValidator.hideErrors();
    /**  Activate the submit button */
    editFormValidator.enableButton();
}

function handleEditFormSubmit(evt) {
    /**  Cancel the standard form submission */
    evt.preventDefault(); 
    /**  Get the data of the user from the edit form */
    const dataProfile = popupEditForm.getInputValues();
    /**  Set the data of the user to the  profile info block */
    userInfo.setUserInfo(dataProfile.username, dataProfile.profession)

    popupEditForm.close();
}

/**  Cards initial load */
cardList.renderedItems();

/** Handler to open the addform */
addButton.addEventListener('click', openAddForm);

/**  Handler to open the editForm */
editButton.addEventListener('click', openEditForm);



