export function deleteCard(card) {
    card.remove();
}
export function toggleCardLike(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

export function createCard(
    cardData,
    cardTemplate,
    cardDeletionFunction,
    cardLikeToggleFunction,
    cardModal,
    openModalFunction
) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardDeleteButton.addEventListener('click', () =>
        cardDeletionFunction(cardElement)
    );

    cardLikeButton.addEventListener('click', () =>
        cardLikeToggleFunction(cardLikeButton)
    );
    cardImage.addEventListener('click', () => {
        const cardModalImage = cardModal.querySelector('.popup__image');
        const cardModalCaption = cardModal.querySelector('.popup__caption');
        // открыть модальное окно с картинкой только после загрузки картинки
        cardModalImage.addEventListener(
            'load',
            () => {
                openModalFunction(cardModal);
            },
            { once: true }
        );
        cardModalImage.src = cardData.link;
        cardModalImage.alt = cardData.name;
        cardModalCaption.textContent = cardData.name;
    });

    return cardElement;
}

export function handleNewCardSubmit(
    form,
    cardTemplate,
    cardsContainer,
    cardModal,
    openModalFunction
) {
    const nameInput = form.elements['place-name'];
    const linkInput = form.elements['link'];
    const cardData = {
        name: nameInput.value,
        link: linkInput.value,
    };
    const cardElement = createCard(
        cardData,
        cardTemplate,
        deleteCard,
        toggleCardLike,
        cardModal,
        openModalFunction
    );
    nameInput.value = '';
    linkInput.value = '';

    cardsContainer.prepend(cardElement);
}

export function setupAddCardForm(form) {
    const nameInput = form.elements['place-name'];
    const linkInput = form.elements['link'];
    nameInput.value = '';
    linkInput.value = '';
}
