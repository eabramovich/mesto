let editButton = document.querySelector('.profile__edit-button');
let closeButtton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup');

function openEditForm() {
    let editForm = document.querySelector('.popup');
    editForm.classList.add('popup_opened');
    // Находим поля формы в DOM
    let nameInput = document.querySelector('.popup__name');
    let jobInput = document.querySelector('.popup__profession');
    // Узнаем текущее значение данных профиля
    let profileName = document.querySelector('.profile__info-name').textContent;
    let profileProfession = document.querySelector('.profile__info-profession').textContent;
    // Заполняем поля формы
    nameInput.value = profileName;
    jobInput.value = profileProfession;
}

function closeEditForm() {
    let editForm = document.querySelector('.popup');
    editForm.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Находим поля формы в DOM
    let nameInput = document.querySelector('.popup__name');
    let jobInput = document.querySelector('.popup__profession');
    let name = nameInput.value; // Получение значения поля name
    let profession = jobInput.value; // Получение значения поля profession
    let profileInfoName = document.querySelector('.profile__info-name');
    let profileInfoProfession = document.querySelector('.profile__info-profession');
    profileInfoName.textContent = name;
    profileInfoProfession.textContent = profession;
    closeEditForm();
}

editButton.addEventListener('click', openEditForm);
closeButtton.addEventListener('click', closeEditForm);
formElement.addEventListener('submit', handleFormSubmit);