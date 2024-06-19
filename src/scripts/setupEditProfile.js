export default function setupEditProfile(
    animatePopupFunction,
    openPopupFunction
) {
    const editBtn = document.querySelector('.profile__edit-button');
    const editProfileModal = document.querySelector('.popup_type_edit');
    animatePopupFunction(editProfileModal);

    const form = document.forms['edit-profile'];
    const profileTitle = document.querySelector('.profile__title');
    const profileDescriprion = document.querySelector('.profile__description');
    const nameInput = form.elements['name'];
    const descriptionInput = form.elements['description'];

    const getNameOldValue = () => {
        return document.querySelector('.profile__title').textContent;
    };

    const getDescriptionOldValue = () => {
        return document.querySelector('.profile__description').textContent;
    };

    const updateProfile = () => {
        profileTitle.textContent = nameInput.value;
        profileDescriprion.textContent = descriptionInput.value;
    };

    let handleSubmit;

    const setupProfilePopup = (closePopupFunction) => {
        nameInput.value = getNameOldValue();
        descriptionInput.value = getDescriptionOldValue();

        handleSubmit = (evt) => {
            evt.preventDefault();
            updateProfile();
            closePopupFunction();
        };
        form.addEventListener('submit', handleSubmit);
    };

    const resetProfilePopup = () => {
        nameInput.value = 'жопа';
        descriptionInput.value = 'жопная';
        form.removeEventListener('submit', handleSubmit);
    };

    editBtn.addEventListener('click', () => {
        openPopupFunction(
            editProfileModal,
            setupProfilePopup,
            resetProfilePopup
        );
    });
}
