

export function editProfile(data, profile) {
    const nameElement = profile.name;
    const descriptionElement = profile.description;
    nameElement.textContent = data.name;
    descriptionElement.textContent = data.description;
}

export function editProfileFormSubmitHandler({
    form,
    profile,
    apiMethod,
    onApiError,
    onApiSuccess,
    finalAction,
}) {
    const nameInput = form.elements.name;
    const descriptionInput = form.elements.description;
    apiMethod({ name: nameInput.value, about: descriptionInput.value })
        .then((data) => {
            const parsedUserData = parseUserData(data);
            onApiSuccess(parsedUserData, profile);
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

export function parseUserData(userData) {
    return {
        name: userData.name,
        description: userData.about,
        avatar: userData.avatar,
        id: userData._id,
    };
}

export function editAvatarFormSubmitHandler({
    form,
    avatarElement,
    apiMethod,
    onApiError,
    onApiSuccess,
    finalAction,
}) {
    const avatarInput = form.elements['avatar-link'];
    apiMethod({ avatar: avatarInput.value })
        .then((data) => {
            const parsedUserData = parseUserData(data);
            onApiSuccess(parsedUserData.avatar, avatarElement);
        })
        .catch(onApiError)
        .finally(() => finalAction(false, form));
}
