import '../pages/index.css';
import initialCards from './cards.js';
import {
    openModal,
    closeModal,
    animateModal,
    addCloseModalListeners,
} from './modal.js';
import { createCard, deleteCard, toggleCardLike } from './card.js';
import {
    editProfileFormSubmitHandler,
    setupEditProfileForm,
    editProfile,
} from './profile.js';

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile'];
const editProfileButton = document.querySelector('.profile__edit-button');

const addCardModal = document.querySelector('.popup_type_new-card');
const addCardForm = document.forms['new-place'];
const addCardButton = document.querySelector('.profile__add-button');

const cardImageModal = document.querySelector('.popup_type_image');

const popups = document.querySelectorAll('.popup');

function handleImageClick(modalProperties) {
    const cardModal = modalProperties.modalElement;
    const cardModalImage = cardModal.querySelector('.popup__image');
    const cardModalCaption = cardModal.querySelector('.popup__caption');
    const cardData = modalProperties.data;

    // открыть модальное окно с картинкой только после загрузки картинки
    cardModalImage.addEventListener(
        'load',
        () => {
            modalProperties.openModal(cardModal);
        },
        { once: true }
    );
    cardModalImage.src = cardData.link;
    cardModalImage.alt = cardData.name;
    cardModalCaption.textContent = cardData.name;
}

function renderCard(cardObj, method = 'prepend') {
    const cardElement = createCard(cardObj);
    cardsContainer[method](cardElement);
}

function handleNewCardSubmit(cardDetailsObject) {
    const form = cardDetailsObject.form;
    const cardObj = cardDetailsObject.cardObj;

    const nameInput = form.elements['place-name'];
    const linkInput = form.elements['link'];

    cardObj.data = {
        name: nameInput.value,
        link: linkInput.value,
    };

    renderCard(cardObj);

    form.reset();
}

popups.forEach((popup) => {
    animateModal(popup);
    addCloseModalListeners(popup);
});

initialCards.forEach(function (card) {
    renderCard(
        {
            data: card,
            template: cardTemplate,
            modal: cardImageModal,
            handleImageClick: handleImageClick,
            delete: deleteCard,
            toggleLike: toggleCardLike,
            openModal: openModal,
        },
        'append'
    );
});

editProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    editProfileFormSubmitHandler(
        editProfileForm,
        {
            name: profileName,
            description: profileDescription,
        },
        editProfile
    );
    closeModal(editProfileModal);
});

addCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleNewCardSubmit({
        form: addCardForm,
        cardObj: {
            data: {},
            template: cardTemplate,
            delete: deleteCard,
            toggleLike: toggleCardLike,
            handleImageClick: handleImageClick,
            modal: cardImageModal,
            openModal: openModal,
        },
    });
    closeModal(addCardModal);
});

editProfileButton.addEventListener('click', () => {
    setupEditProfileForm(editProfileForm, {
        name: profileName,
        description: profileDescription,
    });
    openModal(editProfileModal);
});
addCardButton.addEventListener('click', () => {
    openModal(addCardModal);
});
