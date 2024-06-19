function editProfile(data) {
    const nameElement = document.querySelector('.profile__title');
    const descriptionElement = document.querySelector('.profile__description');
    nameElement.textContent = data.name;
    descriptionElement.textContent = data.description;
}

export function editProfileFormSubmitHandler(form) {
    const nameInput = form.elements.name;
    const descriptionInput = form.elements.description;
    editProfile({
        name: nameInput.value,
        description: descriptionInput.value,
    });
    nameInput.value = '';
    descriptionInput.value = '';
}

export function setupEditProfileForm(form) {
    const nameInput = form.elements.name;
    const descriptionInput = form.elements.description;
    const nameElement = document.querySelector('.profile__title');
    const descriptionElement = document.querySelector('.profile__description');
    nameInput.value = nameElement.textContent;
    descriptionInput.value = descriptionElement.textContent;
}
