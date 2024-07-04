export function deleteCard(card) {
    card.remove();
}
export function toggleCardLikeBtn(likeButton, method = 'toggle') {
    likeButton.classList[method]('card__like-button_is-active');
}

const isCardAlreadyLiked = (likeButton) =>
    likeButton.classList.contains('card__like-button_is-active');

export function updateCardLikes(cardLikeCounter, totalLikes) {
    cardLikeCounter.textContent = totalLikes;
}

export const cardElementMethods = {
    deleteCard,
    toggleCardLikeBtn,
    updateCardLikes,
    isCardAlreadyLiked,
};

export function createCard(cardObj, userId) {
    const cardElement = cardObj.configuration.template
        .querySelector('.card')
        .cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');

    cardImage.src = cardObj.data.link;
    cardImage.alt = cardObj.data.name;
    cardTitle.textContent = cardObj.data.name;
    cardLikeCounter.textContent = cardObj.data.likes.length;

    if (
        !cardObj.configuration.utilityMethods.isCardOwner(cardObj.data, userId)
    ) {
        cardDeleteButton.classList.add('card__delete-button_is-hidden');
    } else {
        cardDeleteButton.classList.remove('card__delete-button_is-hidden');
        cardDeleteButton.addEventListener('click', () =>
            cardObj.configuration.eventListeners.handleDeleteBtnClick({
                apiMethod: cardObj.configuration.apiMethods.deleteCard,
                elementMethod: cardObj.configuration.elementMethods.deleteCard,
                cardId: cardObj.data.id,
                cardElement: cardElement,
                closeModal: cardObj.configuration.modalProperties.closeModal,
                openModal: cardObj.configuration.modalProperties.openModal,
                cardDeleteForm:
                    cardObj.configuration.modalProperties.cardDeleteForm,
                cardDeleteModal:
                    cardObj.configuration.modalProperties.cardDeleteModal,
            })
        );
    }
    if (
        cardObj.configuration.utilityMethods.isCardLiked(cardObj.data, userId)
    ) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    cardLikeButton.addEventListener('click', () =>
        cardObj.configuration.eventListeners.handleLikeBtnClick({
            cardLikeButton,
            userId,
            likeCounter: cardLikeCounter,
            cardData: cardObj.data,
            apiMethod: cardObj.configuration.apiMethods.toggleCardLike,
            updateLikesCounter:
                cardObj.configuration.elementMethods.updateCardLikes,
            isCardAlreadyLiked:
                cardObj.configuration.elementMethods.isCardAlreadyLiked,
            toggleCardLikeBtn:
                cardObj.configuration.elementMethods.toggleCardLikeBtn,
        })
    );

    cardImage.addEventListener('click', () => {
        cardObj.configuration.eventListeners.handleImageClick({
            data: cardObj.data,
            modalElement: cardObj.configuration.modalProperties.cardImageModal,
            openModal: cardObj.configuration.modalProperties.openModal,
        });
    });

    return cardElement;
}
