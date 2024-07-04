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
    const cardElement = cardObj.template.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');

    cardImage.src = cardObj.data.link;
    cardImage.alt = cardObj.data.name;
    cardTitle.textContent = cardObj.data.name;
    cardLikeCounter.textContent = cardObj.data.likes.length;
    cardObj.cardElement = cardElement;

    if (!cardObj.utilityMethods.isCardOwner(cardObj.data, userId)) {
        cardDeleteButton.classList.add('card__delete-button_is-hidden');
    } else {
        cardDeleteButton.classList.remove('card__delete-button_is-hidden');
        cardDeleteButton.addEventListener('click', () =>
            cardObj.eventListeners.handleDeleteBtnClick(cardObj)
        );
    }
    if (cardObj.utilityMethods.isCardLiked(cardObj.data, userId)) {
        cardLikeButton.classList.add('card__like-button_is-active');
    }

    cardLikeButton.addEventListener('click', () =>
        cardObj.eventListeners.handleLikeBtnClick(cardObj, {
            cardLikeButton,
            cardLikeCounter,
        })
    );

    cardImage.addEventListener('click', () => {
        cardObj.eventListeners.handleImageClick(cardObj);
    });

    return cardElement;
}
