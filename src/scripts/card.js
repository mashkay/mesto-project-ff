function deleteCard(card) {
    card.remove();
}
function toggleCardLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

function createCard(
    cardTemplate,
    cardData,
    cardDeletionFunction,
    cardLikeToggleFunction,
    openPopupFunction,
    animatePopupFunction
) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardModal = document.querySelector('.popup_type_image');
    const cardModalImage = cardModal.querySelector('.popup__image');
    const cardModalCaption = cardModal.querySelector('.popup__caption');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    animatePopupFunction(cardModal);

    const setupCardPopup = () => {
        cardModalImage.src = cardImage.src;
        cardModalImage.alt = cardImage.alt;
        cardModalCaption.textContent = cardTitle.textContent;
    };

    const resetCardPopup = () => {
        cardModalImage.src = '';
        cardModalImage.alt = '';
        cardModalCaption.textContent = '';
    };

    cardDeleteButton.addEventListener('click', () =>
        cardDeletionFunction(cardElement)
    );

    cardLikeButton.addEventListener('click', () =>
        cardLikeToggleFunction(cardLikeButton)
    );
    cardImage.addEventListener('click', () => {
        openPopupFunction(cardModal, setupCardPopup, resetCardPopup);
    });
    return cardElement;
}

export { createCard, deleteCard, toggleCardLike };
