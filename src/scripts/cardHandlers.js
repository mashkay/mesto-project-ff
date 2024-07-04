import { handleApiRequestError } from './errorHandlers';
import { apiParser } from './apiParser';

const handleImageClick = (modalProperties) => {
    const cardModal = modalProperties.modalElement;
    const cardModalImage = cardModal.querySelector('.popup__image');
    const cardModalCaption = cardModal.querySelector('.popup__caption');
    const cardData = modalProperties.data;

    // открыть модальное окно с картинкой только после загрузки картинки
    cardModalImage.addEventListener(
        'load',
        () => {
            modalProperties.openModal(cardModal);
        },
        { once: true }
    );
    cardModalImage.src = cardData.link;
    cardModalImage.alt = cardData.name;
    cardModalCaption.textContent = cardData.name;
};

const handleDeleteBtnClick = (obj) => {
    const handleDelete = (event) => {
      event.preventDefault();
      obj.apiMethod(obj.cardId)
          .then(() => {
              obj.elementMethod(obj.cardElement);
              obj.closeModal(obj.cardDeleteModal);

          })
          .catch(handleApiRequestError);
    };
    obj.cardDeleteModal.addEventListener('submit', handleDelete);
    obj.cardDeleteModal.addEventListener('modal.closed', () => {
        obj.cardDeleteModal.removeEventListener('submit', handleDelete);
    }, {once: true});
    obj.openModal(obj.cardDeleteModal);
};

const handleLikeBtnClick = (obj) => {
    const cardWasLiked = obj.isCardAlreadyLiked(obj.cardLikeButton);
    const likeMethod = cardWasLiked ? 'remove' : 'add';
    obj.apiMethod(obj.cardData.id, cardWasLiked)
        .then((rawCardData) => {
            const updatedCardData = apiParser.extractCardData(rawCardData);
            obj.updateLikesCounter(
                obj.likeCounter,
                updatedCardData.likes.length
            );
            obj.toggleCardLikeBtn(obj.cardLikeButton, likeMethod);
            obj.cardData = updatedCardData;
        })
        .catch(handleApiRequestError);
};

const isCardOwner = (card, userId) => {
    return card.owner.id === userId;
};

const isCardLiked = (card, userId) => {
    return card.likes.some((user) => user.id === userId);
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
