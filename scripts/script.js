const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');

// Находим попапы
const popups = document.querySelectorAll('.popup');
const popupEditForm = document.querySelector('.popup_edit-form');
const popupAddForm = document.querySelector('.popup_add-form');
const popupImageContainer = document.querySelector('.popup_type_image')

// Находим форму редактирования профиля
const editForm = document.forms.edit_form;
// Находим поля формы редактирования профиля в DOM
const nameInput = editForm.elements.username;
const jobInput = editForm.elements.profession;
const editFormSubmitButton = editForm.querySelector('.popup__button');
// Находим поля c данными пользователя из профиля
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoProfession = document.querySelector('.profile__info-profession');

// Находим форму добавления нового места
const addForm = document.forms.add_form;
// Находим поля формы добавления нового места
const placeNameInput = addForm.elements.placename;
const placeLinkInput = addForm.elements.placelink;

//Находим темплейт для карточки
const cardTemplate = document.querySelector('#place').content;
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

//Находим контейнер для карточек
const cardsContainer = document.querySelector('.places__container');


function createCard(name, link) {
    // клонируем содержимое тега template
    const placeElement = cardTemplate.querySelector('.places__place').cloneNode(true);

    // наполняем содержимым
    placeElement.querySelector('.places__place-name').textContent = name;
    const placeImage = placeElement.querySelector('.places__place-image');
    placeImage.src = link;
    placeImage.alt = name;

     //Добавляем обработчик на событие клика на кнопку лайк
     const likeButton = placeElement.querySelector('.places__place-like-button');
     likeButton.addEventListener('click', (evt) => {
         toggleLikeCard(evt.target);
     });
 
     //Добавляем обработчик на событие клика на кнопку удаления
     const deleteButton = placeElement.querySelector('.places__place-trash-button');
     deleteButton.addEventListener('click', (evt) => {
         deleteCard(evt.target);
     });
     
    //Добавляем обработчик на событие клика на картинку
    placeImage.addEventListener('click', (evt) => {
        popupImage.src = link;
        popupImage.alt = name;
        popupCaption.textContent = name;
        openPopup(popupImageContainer);
    });

    return placeElement
}


function addCard(card) {
    cardsContainer.prepend(card);
}


function initialLoad() {
    initialCards.forEach((card) => {
        const cardElement = createCard(card.name, card.link);
        addCard(cardElement);
    });
}

function getClosestPopup(elem) {
    const closestPopup = elem.closest('.popup');
    return closestPopup;
}


function getOpenedPopup() {
    return document.querySelector('.popup_opened');
}


function closeByEsc(evt){
    if(evt.key === 'Escape') {
        closePopup(getOpenedPopup());
    }
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc)
}


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}


function openEditForm() {
    //Открываем попам с формой редактирования профиля
    openPopup(popupEditForm);

     // Заполняем поля формы редактирования профиля
     nameInput.value = profileInfoName.textContent;
     jobInput.value = profileInfoProfession.textContent;

     // Активация кнопки submit
     enableButton(editForm, formAttributeList);
}


function openAddForm() {
    //Открываем попап с формой добавления нового места
    openPopup(popupAddForm);
}

function handleEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получение значения поля username с формы и заполнение в профиле поля, где хранится имя пользователя
    profileInfoName.textContent = nameInput.value; 
    // Получение значения поля profession с формы и заполнение в профиле поля, где хранится профессия пользователя
    profileInfoProfession.textContent = jobInput.value; 
    closePopup(popupEditForm);
}


function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const newPlace = createCard(placeNameInput.value, placeLinkInput.value);
    addCard(newPlace);
    closePopup(popupAddForm);
    addForm.reset();

    // Деактивация кнопкки submit
    disabledButton(evt.submitter, formAttributeList);
}


function toggleLikeCard(elem) {
    elem.classList.toggle('places__place-like-button_active');
}


function deleteCard(elem) {
    const card = elem.closest('.places__place');
    card.remove();
}


// Первоначальная загрузка информации на страницу
initialLoad();

//Открытие формы редактирования профиля
editButton.addEventListener('click', openEditForm);

//Открытие формы добавления новой карточки
addButton.addEventListener('click', openAddForm);

//Обработчик закрытия всех попапов
closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', (evt) => {
        closePopup(getClosestPopup(evt.target));
    });
});

// Закрытие попавов кликом на оверлей
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup_opened')) {
            closePopup(evt.target);
        }
    });
})


editForm.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);

