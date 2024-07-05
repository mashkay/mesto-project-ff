import '../pages/index.css';

import {
    openModal,
    closeModal,
    animateModal,
    addCloseModalListeners,
} from './modal.js';
import { createCard, cardElementMethods } from './card.js';
import {
    editProfileFormSubmitHandler,
    setupEditProfileForm,
    editProfile,
    editAvatar,
    editAvatarFormSubmitHandler,
} from './profile.js';
import { api } from './api.js';

import { validation } from './validation.js';

import { cardEventHandlers, cardUtilityMethods } from './cardHandlers.js';

import { handleApiRequestError } from './errorHandlers.js';

import { elements } from './elements.js';

let currentUserId = '';

const cardConfiguration = {
    template: elements.cardTemplate,
    elementMethods: cardElementMethods,
    eventListeners: cardEventHandlers,
    utilityMethods: cardUtilityMethods,
    apiMethods: {
        toggleCardLike: api.toggleCardLike,
        deleteCard: api.deleteCard,
    },
    modalProperties: {
        cardImageModal: elements.cardImageModal,
        cardDeleteModal: elements.cardDeleteModal,
        cardDeleteForm: elements.cardDeleteForm,
        openModal: openModal,
        closeModal: closeModal,
    },
};

function renderCard(cardObj, currentUserId, method = 'prepend') {
    const cardElement = createCard(cardObj, currentUserId);
    elements.cardsContainer[method](cardElement);
}

function renderLoading(isLoading, form) {
    const button = form.querySelector('.popup__button');
    if (isLoading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = 'Сохранить';
    }
}

function handleNewCardSubmit({
    form,
    cardObject,
    apiMethod,
    onApiError,
    onApiSuccess,
    finalAction,
    closeModal,
    modal,
}) {
    const nameInput = form.elements['place-name'];
    const linkInput = form.elements['link'];

    apiMethod({
        name: nameInput.value,
        link: linkInput.value,
    })
        .then((cardData) => {
            onApiSuccess(
                {
                    ...cardObject,
                    data: cardData,
                },
                currentUserId
            );
            closeModal(modal);
        })
        .catch(onApiError)
        .finally(() => finalAction(false, form));
}

Promise.all([api.getUserData(), api.getCardsData()])
    .then(([userData, cardDataList]) => {
        currentUserId = userData._id;

        editAvatar(userData.avatar, elements.profileAvatar);

        editProfile(userData, {
            name: elements.profileName,
            description: elements.profileDescription,
        });

        cardDataList.forEach((cardData) => {
            renderCard(
                { ...cardConfiguration, data: cardData },
                currentUserId,
                'append'
            );
        });
    })
    .catch(handleApiRequestError);

elements.popups.forEach((popup) => {
    animateModal(popup);
    addCloseModalListeners(popup);
});

elements.profileEditForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderLoading(true, elements.profileEditForm);
    editProfileFormSubmitHandler({
        form: elements.profileEditForm,
        profile: {
            name: elements.profileName,
            description: elements.profileDescription,
        },
        apiMethod: api.updateUserData,
        onApiError: handleApiRequestError,
        onApiSuccess: editProfile,
        finalAction: renderLoading,
        closeModal: closeModal,
        modal: elements.profileEditModal,
    });
});

elements.cardCreationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderLoading(true, elements.cardCreationForm);
    handleNewCardSubmit({
        form: elements.cardCreationForm,
        cardObject: {
            ...cardConfiguration,
        },
        apiMethod: api.addCard,
        onApiError: handleApiRequestError,
        onApiSuccess: renderCard,
        finalAction: renderLoading,
        closeModal: closeModal,
        modal: elements.cardCreationModal,
    });
});

elements.profileEditButton.addEventListener('click', () => {
    setupEditProfileForm(elements.profileEditForm, {
        name: elements.profileName,
        description: elements.profileDescription,
    });
    validation.clearValidation({
        formElement: elements.profileEditForm,
        validationConfig: validation.validationConfig,
    });
    openModal(elements.profileEditModal);
});

elements.profileEditAvatarButton.addEventListener('click', () => {
    elements.profileAvatarEditForm.reset();
    validation.clearValidation({
        formElement: elements.profileAvatarEditForm,
        validationConfig: validation.validationConfig,
    });
    openModal(elements.profileAvatarEditModal);
});

elements.profileAvatarEditForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderLoading(true, elements.profileAvatarEditForm);
    editAvatarFormSubmitHandler({
        form: elements.profileAvatarEditForm,
        avatarElement: elements.profileAvatar,
        apiMethod: api.updateAvatar,
        onApiError: handleApiRequestError,
        onApiSuccess: editAvatar,
        finalAction: renderLoading,
        closeModal: closeModal,
        modal: elements.profileAvatarEditModal,
    });
});

elements.cardCreationButton.addEventListener('click', () => {
    elements.cardCreationForm.reset();
    validation.clearValidation({
        formElement: elements.cardCreationForm,
        validationConfig: validation.validationConfig,
    });
    openModal(elements.cardCreationModal);
});

validation.enableValidation(validation.validationConfig);
