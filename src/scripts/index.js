import '../pages/index.css';
// import initialCards from './cards.js';
import {
    openModal,
    closeModal,
    animateModal,
    addCloseModalListeners,
} from './modal.js';
import {
    createCard,
    deleteCard,
    toggleCardLikeBtn,
    cardElementMethods,
} from './card.js';
import {
    editProfileFormSubmitHandler,
    setupEditProfileForm,
    editProfile,
    editAvatar,
    editAvatarFormSubmitHandler,

    // parseUserData,
} from './profile.js';
import {
    getCardsData,
    getUserData,
    updateAvatar,
    updateUserData,
    addCard,
    api,
} from './api.js';

import { validation } from './validation.js';

import { cardEventHandlers, cardUtilityMethods } from './cardHandlers.js';

import { apiParser } from './apiParser.js';

import { handleApiRequestError } from './errorHandlers.js';

import { elements } from './elements.js';

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile'];
const editProfileButton = document.querySelector('.profile__edit-button');

const addCardModal = document.querySelector('.popup_type_new-card');
const addCardForm = document.forms['new-place'];
const addCardButton = document.querySelector('.profile__add-button');

const cardImageModal = document.querySelector('.popup_type_image');

const popups = document.querySelectorAll('.popup');

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
    cardsContainer[method](cardElement);
}

function handleNewCardSubmit({
    form,
    cardObject,
    apiMethod,
    onApiError,
    onApiSuccess,
    finalAction,
}) {
    const nameInput = form.elements['place-name'];
    const linkInput = form.elements['link'];

    apiMethod({
        name: nameInput.value,
        link: linkInput.value,
    })
        .then((cardData) => {
            const parsedCardData = apiParser.extractCardData(cardData);
            const currentUserId = parsedCardData.owner.id;
            onApiSuccess(
                {
                    configuration: cardObject.configuration,
                    data: parsedCardData,
                },
                currentUserId
            );

            form.reset();
        })
        .catch(onApiError)
        .finally(() => finalAction(false, form));
}


Promise.all([api.getUserData(), api.getCardsData()])
    .then(([userData, cardDataList]) => {
        const parsedUserData = apiParser.extractUserData(userData);
        currentUserId = parsedUserData.id;

        editAvatar(parsedUserData.avatar, profileAvatar);

        editProfile(parsedUserData, {
            name: profileName,
            description: profileDescription,
        });

        cardDataList.forEach((card) => {
            const parsedCardData = apiParser.extractCardData(card);
            renderCard(
                {
                    configuration: cardConfiguration,
                    data: parsedCardData,
                },
                currentUserId,
                'append'
            );
        });
    })
    .catch(handleApiRequestError);

popups.forEach((popup) => {
    animateModal(popup);
    addCloseModalListeners(popup);
});

elements.editProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderLoading(true, elements.editProfileForm);
    editProfileFormSubmitHandler({
        form: elements.editProfileForm,
        profile: { name: profileName, description: profileDescription },
        apiMethod: updateUserData,
        onApiError: handleApiRequestError,
        onApiSuccess: editProfile,
        finalAction: renderLoading,
    });
    closeModal(editProfileModal);
});

elements.addCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderLoading(true, elements.addCardForm);
    handleNewCardSubmit({
        form: elements.addCardForm,
        cardObject: {
            configuration: cardConfiguration,
        },
        apiMethod: addCard,
        onApiError: handleApiRequestError,
        onApiSuccess: renderCard,
        finalAction: renderLoading,
    });
    closeModal(addCardModal);
});

elements.editProfileButton.addEventListener('click', () => {
    setupEditProfileForm(elements.editProfileForm, {
        name: elements.profileName,
        description: elements.profileDescription,
    });
    validation.clearValidation({ formElement: elements.editProfileForm, validationConfig: validation.validationConfig})
    openModal(elements.editProfileModal);
});

elements.editProfileAvatarButton.addEventListener('click', () => {
    openModal(elements.editProfileAvatarModal);
});

elements.editProfileAvatarForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderLoading(true, elements.editProfileAvatarForm);
    editAvatarFormSubmitHandler({
        form: elements.editProfileAvatarForm,
        avatarElement: elements.profileAvatar,
        apiMethod: updateAvatar,
        onApiError: handleApiRequestError,
        onApiSuccess: editAvatar,
        finalAction: renderLoading,
    });

    closeModal(elements.editProfileAvatarModal);
});

elements.addCardButton.addEventListener('click', () => {
    openModal(elements.addCardModal);
});

function renderLoading(isLoading, form) {
    const button = form.querySelector('.popup__button');
    if (isLoading) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = 'Сохранить';
    }
}


// validation.showInputError({
//   formElement: elements.editProfileForm,
//   inputElement: elements.editProfileForm.elements.name,
//   errorMessage: 'Ошибка',
//   validationConfig: validation.validationConfig,

// })
validation.enableValidation(validation.validationConfig);