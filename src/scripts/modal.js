export default function openModal(
    element,
    setupContentFunction,
    resetContentFunction,

) {
    const closeBtn = element.querySelector('.popup__close');
    const content = element.querySelector('.popup__content');
    const controller = new AbortController();
    const signal = controller.signal;
    const closeModal = () => {
        resetContentFunction();
        element.classList.remove('popup_is-opened');
        controller.abort();
    };
    const closeOnEscape = (evt) => {
        if (evt.key === 'Escape') {
            closeModal();
        }
    };
    const closeOnOverlayClick = (evt) => {
        if (evt.target === element && !content.contains(evt.target)) {
            closeModal();
        }
    };

    setupContentFunction(closeModal);

    document.addEventListener('keydown', closeOnEscape, { signal });
    closeBtn.addEventListener('click', closeModal, { signal });
    element.addEventListener('click', closeOnOverlayClick, { signal });
    element.classList.add('popup_is-opened');
}
