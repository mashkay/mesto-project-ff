const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const profileEditModal = document.querySelector('.popup_type_edit');
const profileEditForm = document.forms['edit-profile'];
const profileEditButton = document.querySelector('.profile__edit-button');

const profileEditAvatarButton = document.querySelector(
    '.profile__edit-avatar-button'
);
const profileAvatarEditModal = document.querySelector(
    '.popup_type_edit-avatar'
);
const profileAvatarEditForm = document.forms['edit-avatar'];

const cardCreationModal = document.querySelector('.popup_type_new-card');
const cardCreationForm = document.forms['new-place'];
const cardCreationButton = document.querySelector('.profile__add-button');

const cardImageModal = document.querySelector('.popup_type_image');
const cardDeleteModal = document.querySelector('.popup_type_delete-card');
const cardDeleteForm = document.forms['delete-card'];

const popups = document.querySelectorAll('.popup');

export const elements = {
    cardsContainer,
    cardTemplate,
    profileName,
    profileDescription,
    profileAvatar,
    profileEditModal,
    profileEditForm,
    profileEditButton,
    cardCreationModal,
    cardCreationForm,
    cardCreationButton,
    cardImageModal,
    popups,
    cardDeleteModal,
    cardDeleteForm,
    profileEditAvatarButton,
    profileAvatarEditModal,
    profileAvatarEditForm,
};
