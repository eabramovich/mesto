let editButton = document.querySelector('.profile__edit-button');
let closeButtton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__profession');
// Находим поля c данными пользователя из профиля
let profileInfoName = document.querySelector('.profile__info-name');
let profileInfoProfession = document.querySelector('.profile__info-profession');

function openEditForm() {
    let editForm = document.querySelector('.popup');
    editForm.classList.add('popup_opened');
    // Заполняем поля формы
    nameInput.value = profileInfoName.textContent;
    jobInput.value = profileInfoProfession.textContent;
}

function closeEditForm() {
    let editForm = document.querySelector('.popup');
    editForm.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получение значения поля username с формы и заполнение в профиле поля, где хранится имя пользователя
    profileInfoName.textContent = nameInput.value; 
    // Получение значения поля profession с формы и заполнение в профиле поля, где хранится профессия пользователя
    profileInfoProfession.textContent = jobInput.value; 
    closeEditForm();
}

editButton.addEventListener('click', openEditForm);
closeButtton.addEventListener('click', closeEditForm);
formElement.addEventListener('submit', handleFormSubmit);