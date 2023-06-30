const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');

// Находим форму редактирования профиля
const editForm = document.querySelector('[name="edit-form"]');
// Находим поля формы редактирования профиля в DOM
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__profession');
// Находим поля c данными пользователя из профиля
const profileInfoName = document.querySelector('.profile__info-name');
const profileInfoProfession = document.querySelector('.profile__info-profession');

// Находим форму добавления нового места
const addForm = document.querySelector('[name="add-form"]');
// Находим поля формы добавления нового места
const placeNameInput = document.querySelector('[name="placename"]');
const placeLinkInput = document.querySelector('[name="placelink"]');
//Находим темплейт для карточки
const cardTemplate = document.querySelector('#place').content;

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
    // Заполняем поля формы
    nameInput.value = profileInfoName.textContent;
    jobInput.value = profileInfoProfession.textContent;
}


function openAddForm() {
    //Открываем попап с формой добавления нового места
    openPopup(addForm);
}


function createCard(name, link) {
    // клонируем содержимое тега template
    const placeElement = cardTemplate.querySelector('.places__place').cloneNode(true);

    // наполняем содержимым
    placeElement.querySelector('.places__place-name').textContent = name;
    const placeImage = placeElement.querySelector('.places__place-image');
    placeImage.src = link;
    placeImage.alt = name;

    return placeElement
}


function addCard(card) {
    const cardsContainer = document.querySelector('.places__container');
    cardsContainer.prepend(card);
}


function cardsLoad() {
    for(let i=0; i < initialCards.length; i++) {
        let card = createCard( initialCards[i].name, initialCards[i].link);
        addCard(card);
    }
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
    placeNameInput.value = '';
    placeLinkInput.value = '';
}

function toggleLikeCard(elem) {
    elem.classList.toggle('places__place-like-button_active');
}

cardsLoad();

//Открытие формы редактирования профиля
editButton.addEventListener('click', openEditForm);
//Открытие формы добавления новой карточки
addButton.addEventListener('click', openAddForm);


//Обработчик закрытия всех попапов
closeButtons.forEach((closeButton) => {
    closeButton.addEventListener('click', function(evt) {
        closePopup(evt.target);
    });
});

const likeButtons = document.querySelectorAll('.places__place-like-button');
//Обработчик для лайка карточек
likeButtons.forEach((likeButton) => {
    console.log('123');
    likeButton.addEventListener('click', function(evt) {
        console.log(evt.target);
        toggleLikeCard(evt.target);
    });
});


editForm.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);
