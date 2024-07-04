const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

const enableValidation = (validationConfig) => {
    const formElementList = Array.from(
        document.querySelectorAll(validationConfig.formSelector)
    );
    formElementList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setInputEventListeners({
            formElement,
            validationConfig,
        });
    });
};

const clearValidation = ({ formElement, validationConfig }) => {
    const inputElementList = Array.from(
        formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
        validationConfig.submitButtonSelector
    );
    inputElementList.forEach((inputElement) => {
        inputElement.setCustomValidity('');
        hideInputError({ formElement, inputElement, validationConfig });
    });
    setButtonState({ inputElementList, buttonElement, validationConfig });
};

const showInputError = ({
    formElement,
    inputElement,
    errorMessage,
    validationConfig,
}) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = ({ formElement, inputElement, validationConfig }) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(validationConfig.errorClass);
};

const setButtonState = ({
    inputElementList,
    buttonElement,
    validationConfig,
}) => {
    if (hasInvalidInput(inputElementList)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const hasInvalidInput = (inputElementList) => {
    return inputElementList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const checkInputElementValidity = ({
    formElement,
    inputElement,
    validationConfig,
}) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(
            inputElement.dataset.errorMessagePatternMismatch
        );
    } else {
        inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
        showInputError({
            formElement,
            inputElement,
            errorMessage: inputElement.validationMessage,
            validationConfig,
        });
    } else {
        hideInputError({
            formElement,
            inputElement,
            validationConfig,
        });
    }
};

const setInputEventListeners = ({ formElement, validationConfig }) => {
    const inputElementList = Array.from(
        formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
        validationConfig.submitButtonSelector
    );
    setButtonState({ inputElementList, buttonElement, validationConfig });
    inputElementList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputElementValidity({
                formElement,
                inputElement,
                validationConfig,
            });
            setButtonState({
                inputElementList,
                buttonElement,
                validationConfig,
            });
        });
    });
};

export const validation = {
    enableValidation,
    clearValidation,
    showInputError,
    hideInputError,
    validationConfig,
    setInputEventListeners,
};
