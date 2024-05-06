const plasesList = document.querySelector('.places__list');

function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

function createCard(name, link, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  cardDeleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', function (event) {
    event.target.classList.toggle('card__like-button_is-active');
  });
  return cardElement;
}

initialCards.forEach(function (card) {
  const cardElement = createCard(card.name, card.link, deleteCard);
  plasesList.append(cardElement);
});
