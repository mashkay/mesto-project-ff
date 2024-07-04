export function closeModal(modalElement) {
    modalElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeOnEsc);
    
    const event = new Event("modal.closed");
    modalElement.dispatchEvent(event);
}

function closeOnEsc(event) {
    if (event.key === 'Escape') {
        const modalElement = document.querySelector('.popup_is-opened');

        closeModal(modalElement);
    }
}

function closeOnOverlayClick(event) {
    if (!event.target.closest('.popup__content')) {
        const modalElement = event.currentTarget.closest('.popup_is-opened');
        closeModal(modalElement);
    }
}

export function animateModal(modalElement) {
    modalElement.classList.add('popup_is-animated');
}

export function openModal(modalElement) {
    modalElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeOnEsc);
    // trigger event: shown
    const event = new Event("modal.shown");
    modalElement.dispatchEvent(event);
}

export function addCloseModalListeners(modalElement) {
    modalElement.addEventListener('click', closeOnOverlayClick);
    const closeBtn = modalElement.querySelector('.popup__close');
    closeBtn.addEventListener('click', () => closeModal(modalElement));
}
