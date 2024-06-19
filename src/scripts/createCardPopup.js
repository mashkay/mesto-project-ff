export default function setupCreateCardPopup(
    cardDeletionFunction,
    cardLikeToggleFunction,
    createCardFunction,
    animatePopupFunction,
    openPopupFunction
) {
    const newCardBtn = document.querySelector('.profile__add-button');
    const newCardModal = document.querySelector('.popup_type_new-card');
    const cardsContainer = document.querySelector('.places__list');
    const cardTemplate = document.querySelector('#card-template').content;
    animatePopupFunction(newCardModal);

    const form = document.forms['new-place'];
    const placeNameInput = form.elements['place-name'];
    const linkInput = form.elements['link'];

    let handleSubmit;

    const setupNewCardPopup = (closePopupFunction) => {
        handleSubmit = (evt) => {
            evt.preventDefault();
            const cardData = {
                name: placeNameInput.value,
                link: linkInput.value,
            };
            const card = createCardFunction(
                cardTemplate,
                cardData,
                cardDeletionFunction,
                cardLikeToggleFunction,
                openPopupFunction,
                animatePopupFunction
            );
            cardsContainer.prepend(card);
            closePopupFunction();
        };
        form.addEventListener('submit', handleSubmit);
    };

    const resetNewCardPopup = () => {
        placeNameInput.value = '';
        linkInput.value = '';
        form.removeEventListener('submit', handleSubmit);
    };

    newCardBtn.addEventListener('click', () => {
        openPopupFunction(newCardModal, setupNewCardPopup, resetNewCardPopup);
    });
}
