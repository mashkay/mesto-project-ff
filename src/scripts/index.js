const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function deleteCard(card) {
  card.remove();
}
function toggleCardLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

function createCard(cardData, cardDeletionFunction, cardLikeToggleFunction) {
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
  return cardElement;
}

initialCards.forEach(function (card) {
  const cardElement = createCard(card, deleteCard, toggleCardLike);
  cardsContainer.append(cardElement);
});
