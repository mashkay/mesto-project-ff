const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile'];
const editProfileFormSubmitButton = editProfileForm.querySelector('.popup__button');
const editProfileButton = document.querySelector('.profile__edit-button');

const editProfileAvatarButton = document.querySelector('.profile__edit-avatar-button');
const editProfileAvatarModal = document.querySelector('.popup_type_edit-avatar');
const editProfileAvatarForm = document.forms['edit-avatar'];
const editProfileAvatarFormSubmitButton = editProfileAvatarForm.querySelector('.popup__button');




const addCardModal = document.querySelector('.popup_type_new-card');
const addCardForm = document.forms['new-place'];
const addCardSubmitButton = addCardForm.querySelector('.popup__button');

const addCardButton = document.querySelector('.profile__add-button');

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
    editProfileModal,
    editProfileForm,
    editProfileButton,
    addCardModal,
    addCardForm,
    addCardButton,
    cardImageModal,
    popups,
    cardDeleteModal,
    cardDeleteForm,
    editProfileAvatarButton,
    editProfileAvatarModal,
    editProfileAvatarForm,
    editProfileFormSubmitButton,
    editProfileAvatarFormSubmitButton,
    addCardSubmitButton,
    

};
