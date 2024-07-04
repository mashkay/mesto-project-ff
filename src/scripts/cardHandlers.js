import { handleApiRequestError } from './errorHandlers';

const handleImageClick = (cardObj) => {
    const cardModal = cardObj.modalProperties.cardImageModal;
    const cardModalImage = cardModal.querySelector('.popup__image');
    const cardModalCaption = cardModal.querySelector('.popup__caption');
    const cardData = cardObj.data;

    // открыть модальное окно с картинкой только после загрузки картинки
    cardModalImage.addEventListener(
        'load',
        () => {
            cardObj.modalProperties.openModal(cardModal);
        },
        { once: true }
    );
    cardModalImage.src = cardData.link;
    cardModalImage.alt = cardData.name;
    cardModalCaption.textContent = cardData.name;
};

const handleDeleteBtnClick = (cardObj) => {
    // создаем обработчик для кнопки submit
    const handleDelete = (event) => {
        event.preventDefault();
        cardObj.apiMethods
            .deleteCard(cardObj.data._id)
            .then(() => {
                cardObj.elementMethods.deleteCard(cardObj.cardElement);
                cardObj.modalProperties.closeModal(
                    cardObj.modalProperties.cardDeleteModal
                );
            })
            .catch(handleApiRequestError);
    };
    // добавляем обработчик на кнопку submit
    cardObj.modalProperties.cardDeleteModal.addEventListener(
        'submit',
        handleDelete
    );
    // добавляем обработчик на событие 'modal.closed' удаляющий handleDelete
    cardObj.modalProperties.cardDeleteModal.addEventListener(
        'modal.closed',
        () => {
            cardObj.modalProperties.cardDeleteModal.removeEventListener(
                'submit',
                handleDelete
            );
        },
        { once: true }
    );
    cardObj.modalProperties.openModal(cardObj.modalProperties.cardDeleteModal);
};

const handleLikeBtnClick = (cardObj, { cardLikeButton, cardLikeCounter }) => {
    const cardWasLiked =
        cardObj.elementMethods.isCardAlreadyLiked(cardLikeButton);
    const likeMethod = cardWasLiked ? 'remove' : 'add';
    cardObj.apiMethods
        .toggleCardLike(cardObj.data._id, cardWasLiked)
        .then((cardData) => {
            cardObj.elementMethods.updateCardLikes(
                cardLikeCounter,
                cardData.likes.length
            );
            cardObj.elementMethods.toggleCardLikeBtn(
                cardLikeButton,
                likeMethod
            );
            cardObj.data = cardData;
        })
        .catch(handleApiRequestError);
};

const isCardOwner = (card, userId) => {
    return card.owner._id === userId;
};

const isCardLiked = (card, userId) => {
    return card.likes.some((user) => user._id === userId);
};

export const cardEventHandlers = {
    handleDeleteBtnClick,
    handleImageClick,
    handleLikeBtnClick,
};

export const cardUtilityMethods = {
    isCardLiked,
    isCardOwner,
};
