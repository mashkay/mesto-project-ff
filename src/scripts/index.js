import '../pages/index.css';
import { createCard, deleteCard, toggleCardLike } from './card.js';
import openModal from './modal.js';
import initialCards from './initialCards.js';
import setupEditProfile from './setupEditProfile.js';
import setupCreateCardPopup from './createCardPopup.js';

function animatePopup(element) {
    element.classList.add('popup_is-animated');
}

function createInitialCards() {
    const cardsContainer = document.querySelector('.places__list');
    const cardTemplate = document.querySelector('#card-template').content;
    initialCards.forEach((cardData) => {
        const card = createCard(
            cardTemplate,
            cardData,
            deleteCard,
            toggleCardLike,
            openModal,
            animatePopup
        );
        cardsContainer.append(card);
    });
}

createInitialCards();

setupEditProfile(animatePopup, openModal);
setupCreateCardPopup(
    deleteCard,
    toggleCardLike,
    createCard,
    animatePopup,
    openModal
);
