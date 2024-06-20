export function editProfile(data, profile) {
    const nameElement = profile.name;
    const descriptionElement = profile.description;
    nameElement.textContent = data.name;
    descriptionElement.textContent = data.description;
}

export function editProfileFormSubmitHandler(
    form,
    profile,
    editProfileFunction
) {
    const nameInput = form.elements.name;
    const descriptionInput = form.elements.description;
    editProfileFunction(
        {
            name: nameInput.value,
            description: descriptionInput.value,
        },
        profile
    );
}

export function setupEditProfileForm(form, profile) {
    const nameInput = form.elements.name;
    const descriptionInput = form.elements.description;
    const nameElement = profile.name;
    const descriptionElement = profile.description;
    nameInput.value = nameElement.textContent;
    descriptionInput.value = descriptionElement.textContent;
}
