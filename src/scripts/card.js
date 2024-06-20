export function deleteCard(card) {
    card.remove();
}
export function toggleCardLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

export function createCard(cardObj) {
    const cardElement = cardObj.template.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardObj.data.link;
    cardImage.alt = cardObj.data.name;
    cardTitle.textContent = cardObj.data.name;

    cardDeleteButton.addEventListener('click', () =>
        cardObj.delete(cardElement)
    );

    cardLikeButton.addEventListener('click', () =>
        cardObj.toggleLike(cardLikeButton)
    );

    cardImage.addEventListener('click', () => {
        cardObj.handleImageClick({
            data: cardObj.data,
            modalElement: cardObj.modal,
            openModal: cardObj.openModal,
        });
    });

    return cardElement;
}
