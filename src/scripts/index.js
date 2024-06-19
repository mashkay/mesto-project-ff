import '../pages/index.css';
import initialCards from './cards.js';
import {
    openModal,
    closeModal,
    animateModal,
    addCloseModalListeners,
} from './modal.js';
import {
    createCard,
    deleteCard,
    toggleCardLike,
    handleNewCardSubmit,
    setupAddCardForm,
} from './card.js';
import {
    editProfileFormSubmitHandler,
    setupEditProfileForm,
} from './profile.js';

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile'];
const editProfileButton = document.querySelector('.profile__edit-button');

const addCardModal = document.querySelector('.popup_type_new-card');
const addCardForm = document.forms['new-place'];
const addCardButton = document.querySelector('.profile__add-button');

const cardImageModal = document.querySelector('.popup_type_image');

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    animateModal(popup);
    addCloseModalListeners(popup);
});

initialCards.forEach(function (card) {
    const cardElement = createCard(
        card,
        cardTemplate,
        deleteCard,
        toggleCardLike,
        cardImageModal,
        openModal
    );
    cardsContainer.append(cardElement);
});

editProfileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    editProfileFormSubmitHandler(editProfileForm);
    closeModal(editProfileModal);
});

addCardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleNewCardSubmit(
        addCardForm,
        cardTemplate,
        cardsContainer,
        cardImageModal,
        openModal
    );
    closeModal(addCardModal);
});

editProfileButton.addEventListener('click', () => {
    setupEditProfileForm(editProfileForm);
    openModal(editProfileModal);
});
addCardButton.addEventListener('click', () => {
    setupAddCardForm(addCardForm);
    openModal(addCardModal);
});
