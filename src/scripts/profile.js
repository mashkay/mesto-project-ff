export function editProfile(data, profile) {
    const nameElement = profile.name;
    const descriptionElement = profile.description;
    nameElement.textContent = data.name;
    descriptionElement.textContent = data.about;
}

export function editProfileFormSubmitHandler({
    form,
    profile,
    apiMethod,
    onApiError,
    onApiSuccess,
    finalAction,
    closeModal,
    modal,
}) {
    const nameInput = form.elements.name;
    const descriptionInput = form.elements.description;
    apiMethod({ name: nameInput.value, about: descriptionInput.value })
        .then((data) => {
            onApiSuccess(data, profile);
            closeModal(modal);
        })
        .catch(onApiError)
        .finally(() => finalAction(false, form));
}

export function setupEditProfileForm(form, profile) {
    const nameInput = form.elements.name;
    const descriptionInput = form.elements.description;
    const nameElement = profile.name;
    const descriptionElement = profile.description;
    nameInput.value = nameElement.textContent;
    descriptionInput.value = descriptionElement.textContent;
}

export function editAvatar(avatarURL, avatarElement) {
    avatarElement.style = `background-image: url(${avatarURL})`;
}

export function editAvatarFormSubmitHandler({
    form,
    avatarElement,
    apiMethod,
    onApiError,
    onApiSuccess,
    finalAction,
    closeModal,
    modal,
}) {
    const avatarInput = form.elements['avatar-link'];
    apiMethod({ avatar: avatarInput.value })
        .then((data) => {
            onApiSuccess(data.avatar, avatarElement);
            closeModal(modal);
        })
        .catch(onApiError)
        .finally(() => finalAction(false, form));
}
