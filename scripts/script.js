const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Ростов-на-Дону',
      link: 'https://images.unsplash.com/photo-1599293220344-64dc45238326?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');

// Находим форму редактирования профиля
const editForm = document.forms.edit_form;
// Находим поля формы редактирования профиля в DOM
const nameInput = editForm.elements.username;
const jobInput = editForm.elements.profession;
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
        openPopup(popupImage);
    });

    return placeElement
}


function addCard(card) {
    cardsContainer.prepend(card);
}


function initialLoad() {
    // Заполняем поля формы редактирования профиля
    nameInput.value = profileInfoName.textContent;
    jobInput.value = profileInfoProfession.textContent;

    for(let i=0; i < initialCards.length; i++) {
        const card = createCard( initialCards[i].name, initialCards[i].link);
        addCard(card);
    }
}


function closePopup(elem) {
    const popup = elem.closest('.popup');
    popup.classList.remove('popup_opened');
}


function openPopup(elem) {
    const popup = elem.closest('.popup');
    popup.classList.add('popup_opened');
}


function openEditForm() {
    //Открываем попам с формой редактирования профиля
    openPopup(editForm);
}


function openAddForm() {
    //Открываем попап с формой добавления нового места
    openPopup(addForm);
}

function handleEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получение значения поля username с формы и заполнение в профиле поля, где хранится имя пользователя
    profileInfoName.textContent = nameInput.value; 
    // Получение значения поля profession с формы и заполнение в профиле поля, где хранится профессия пользователя
    profileInfoProfession.textContent = jobInput.value; 
    closePopup(editForm);
}


function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const newPlace = createCard(placeNameInput.value, placeLinkInput.value);
    addCard(newPlace);
    closePopup(addForm);
    addForm.reset();
}


function toggleLikeCard(elem) {
    elem.classList.toggle('places__place-like-button_active');
}


function deleteCard(elem) {
    const card = elem.closest('.places__place');
    card.remove();
}


const getOpenedPopup = () => {
    return document.querySelector('.popup_opened');
}

const hasOpenedPopup = () => {
    if(getOpenedPopup()) {
        return true;
    } else {
        return false;
    }
};


// Первоначальная загрузка информации на страницу
initialLoad();

//Открытие формы редактирования профиля
editButton.addEventListener('click', openEditForm);

//Открытие формы добавления новой карточки
addButton.addEventListener('click', openAddForm);

//Обработчик закрытия всех попапов
closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', (evt) => {
        closePopup(evt.target);
    });
});

// Закрытие попавов кликом на оверлей
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('popup_opened')) {
            closePopup(evt.target);
        }
    });
})

document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape' && hasOpenedPopup()) {
        closePopup(getOpenedPopup());
    }
});

editForm.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);

