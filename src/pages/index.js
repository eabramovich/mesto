import './index.css';

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { cardsContainerSelector, profileInfoNameSelector, profilePersonalInfoSelector} from "../utils/constant.js";
import { profileInfoImageSelector, editAvatarIcon} from "../utils/constant.js";
import { editButton, addButton} from "../utils/constant.js";
import { popupTypeImageSelector, popupTypeConfirmationSelector} from "../utils/constant.js";
import { popupAddFormSelector, addForm} from "../utils/constant.js";
import { popupEditFormSelector, editForm, nameInput, jobInput} from "../utils/constant.js";
import { popupUpdateAvatarFormSelector, updateAvatarForm, profileImageLinkInput } from '../utils/constant.js';
import { cardTemplateSelector, validationConfig} from "../utils/constant.js";


const userInfo = new UserInfo({
    userNameSelector: profileInfoNameSelector, 
    userInfoSelector: profilePersonalInfoSelector,
    userImageSelector: profileInfoImageSelector
});

const api = new Api({
    baseUrl:'https://mesto.nomoreparties.co/v1/cohort-74', 
    headers: {
        authorization: 'f5d4ffa0-2360-4168-849b-08882ca95571',
        'Content-Type': 'application/json'
    }
});

const popupWithImage = new PopupWithImage(popupTypeImageSelector);
popupWithImage.setEventListeners();

const popupRemoveCardConfirmation = new PopupWithConfirmation(popupTypeConfirmationSelector, handleRemoveCardConfirmation);
popupRemoveCardConfirmation.setEventListeners();

const popupAddForm = new PopupWithForm(popupAddFormSelector, handleAddFormSubmit);
popupAddForm.setEventListeners();

const popupEditForm = new PopupWithForm(popupEditFormSelector, handleEditFormSubmit);
popupEditForm.setEventListeners();

const popupUpdateAvatarForm = new PopupWithForm(popupUpdateAvatarFormSelector, handleUpdateAvatarFormSubmit);
popupUpdateAvatarForm.setEventListeners();

/**  Add validation for editForm */
const editFormValidator = new FormValidator(editForm, validationConfig);
editFormValidator.enableValidation();

/**  Add validation for addForm */
const addFormValidator = new FormValidator(addForm, validationConfig);
addFormValidator.enableValidation();

const updateAvatarFormValidator = new FormValidator(updateAvatarForm, validationConfig)
updateAvatarFormValidator.enableValidation();

const handleOpenImagePopup = function(name, link) {
    popupWithImage.open(name, link);
};

let cardIdForRemove;
let cardForRemove;
const handleRemoveCard= function(cardId, card) {
  popupRemoveCardConfirmation.open();
  cardIdForRemove = cardId;
  cardForRemove = card;
}

function handleRemoveCardConfirmation() {
  api.removeCard(cardIdForRemove)
    .then((res) => {
      cardForRemove.removeCardElement();
      popupRemoveCardConfirmation.close();
    })
    .catch((err) => {
      console.log(err);
    })
}

function handleLikeCard(cardId, card) {
  if(card.isCurrentUserLikeCard()) {
    api.removeLikeCard(cardId)
      .then((res) => {
        card.toggleLikeCard(res.likes);
        card.setLikesCount(res.likes.length);
      })
      .catch((err) => {
        console.log(err);
      })
  } else{
    api.addLikeCard(cardId)
    .then((res) => {
      card.toggleLikeCard(res.likes);
      card.setLikesCount(res.likes.length);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

function createCard(cardData) {
    const newCard = new Card(cardData, userData._id, cardTemplateSelector, handleOpenImagePopup, handleRemoveCard, handleLikeCard);

    return newCard.generateCard();
}

let userData = {};
let cardList;
let cards;

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then((values) => {
  /** User info initial load */
  [userData, cards] = values;
  userInfo.setUserInfo(userData.name, userData.about);
  userInfo.setUserImage(userData.avatar);

  /**Cards initial load */
  cardList = new Section({
    items: cards.reverse(),
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    }
  }, cardsContainerSelector);
  
  cardList.renderItems();
})
.catch((err) => {
  console.log(err);
});

function openAddForm() {
    /**  Open the popup to add a new place */
    popupAddForm.open();
    addFormValidator.disableButton();
    addFormValidator.hideErrors();
}

function handleAddFormSubmit(cardData) {
    popupAddForm.changeSubmitButtonName('Сохранение...');
    api.addNewCard(cardData)
      .then((res) => {
        const cardElement = createCard(res);
        cardList.addItem(cardElement);
        popupAddForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function() {
        popupAddForm.changeSubmitButtonName('Создать');
      }) 
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

function handleEditFormSubmit(dataProfile) {
    popupEditForm.changeSubmitButtonName('Сохранение...');
    api.updateUserInfo(dataProfile.username, dataProfile.profession)
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about);
        popupEditForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function() {
        popupEditForm.changeSubmitButtonName('Сохранить');
      });
   
}

function openUpdateAvatarForm() {
  popupUpdateAvatarForm.open();
  
  updateAvatarFormValidator.hideErrors();
  updateAvatarFormValidator.enableButton();
}

function handleUpdateAvatarFormSubmit(avatarData) {
  popupUpdateAvatarForm.changeSubmitButtonName('Сохранение...');
  api.updateUserAvatar(avatarData.avatar)
    .then((res) => {
      userInfo.setUserImage(avatarData.avatar);
      popupUpdateAvatarForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(function() {
      popupUpdateAvatarForm.changeSubmitButtonName('Сохранить');
    });
}

/** Handler to open the addform */
addButton.addEventListener('click', openAddForm);

/**  Handler to open the editForm */
editButton.addEventListener('click', openEditForm);

/**  Handler to open the popupUpdateAvatarForm */
editAvatarIcon.addEventListener('click', openUpdateAvatarForm);






