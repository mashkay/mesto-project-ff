(()=>{"use strict";function e(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",t);var r=new Event("modal.closed");e.dispatchEvent(r)}function t(t){"Escape"===t.key&&e(document.querySelector(".popup_is-opened"))}function r(t){t.target.closest(".popup__content")||e(t.currentTarget.closest(".popup_is-opened"))}function n(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",t);var r=new Event("modal.shown");e.dispatchEvent(r)}function o(e,t){var r=t.name,n=t.description;r.textContent=e.name,n.textContent=e.about}function a(e,t){t.style="background-image: url(".concat(e,")")}var i={baseURL:"https://mesto.nomoreparties.co/",version:"v1",cohortId:"wff-cohort-17",headers:{authorization:"e178b060-afc3-4d24-8384-782bc5f9de45","Content-Type":"application/json"},getBaseURL:function(){return new URL("".concat(this.version,"/").concat(this.cohortId,"/"),this.baseURL)}};function l(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var d={getUserData:function(){return fetch(new URL("users/me",i.getBaseURL()),{headers:i.headers}).then(l)},getCardsData:function(){return fetch(new URL("cards",i.getBaseURL()),{headers:i.headers}).then(l)},updateUserData:function(e){return fetch(new URL("users/me",i.getBaseURL()),{method:"PATCH",headers:i.headers,body:JSON.stringify(e)}).then(l)},updateAvatar:function(e){return fetch(new URL("users/me/avatar",i.getBaseURL()),{method:"PATCH",headers:i.headers,body:JSON.stringify(e)}).then(l)},addCard:function(e){return fetch(new URL("cards",i.getBaseURL()),{method:"POST",headers:i.headers,body:JSON.stringify(e)}).then(l)},deleteCard:function(e){return fetch(new URL("cards/".concat(e),i.getBaseURL()),{method:"DELETE",headers:i.headers}).then(l)},toggleCardLike:function(e,t){return fetch(new URL("cards/likes/".concat(e),i.getBaseURL()),{method:t?"DELETE":"PUT",headers:i.headers}).then(l)}},c=function(e){var t=e.formElement,r=e.inputElement,n=e.errorMessage,o=e.validationConfig,a=t.querySelector(".".concat(r.id,"-error"));r.classList.add(o.inputErrorClass),a.textContent=n,a.classList.add(o.errorClass)},u=function(e){var t=e.formElement,r=e.inputElement,n=e.validationConfig,o=t.querySelector(".".concat(r.id,"-error"));r.classList.remove(n.inputErrorClass),o.textContent="",o.classList.remove(n.errorClass)},s=function(e){var t=e.inputElementList,r=e.buttonElement,n=e.validationConfig;p(t)?(r.classList.add(n.inactiveButtonClass),r.disabled=!0):(r.classList.remove(n.inactiveButtonClass),r.disabled=!1)},p=function(e){return e.some((function(e){return!e.validity.valid}))},f=function(e){var t=e.formElement,r=e.validationConfig,n=Array.from(t.querySelectorAll(r.inputSelector)),o=t.querySelector(r.submitButtonSelector);s({inputElementList:n,buttonElement:o,validationConfig:r}),n.forEach((function(e){e.addEventListener("input",(function(){!function(e){var t=e.formElement,r=e.inputElement,n=e.validationConfig;r.validity.patternMismatch?r.setCustomValidity(r.dataset.errorMessagePatternMismatch):r.setCustomValidity(""),r.validity.valid?u({formElement:t,inputElement:r,validationConfig:n}):c({formElement:t,inputElement:r,errorMessage:r.validationMessage,validationConfig:n})}({formElement:t,inputElement:e,validationConfig:r}),s({inputElementList:n,buttonElement:o,validationConfig:r})}))}))},m={enableValidation:function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),f({formElement:t,validationConfig:e})}))},clearValidation:function(e){var t=e.formElement,r=e.validationConfig,n=Array.from(t.querySelectorAll(r.inputSelector)),o=t.querySelector(r.submitButtonSelector);n.forEach((function(e){e.setCustomValidity(""),u({formElement:t,inputElement:e,validationConfig:r})})),s({inputElementList:n,buttonElement:o,validationConfig:r})},showInputError:c,hideInputError:u,validationConfig:{formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},setInputEventListeners:f};function v(e){console.error(e)}var y={handleDeleteBtnClick:function(e){var t=function(t){t.preventDefault(),e.apiMethods.deleteCard(e.data._id).then((function(){e.elementMethods.deleteCard(e.cardElement),e.modalProperties.closeModal(e.modalProperties.cardDeleteModal)})).catch(v)};e.modalProperties.cardDeleteModal.addEventListener("submit",t),e.modalProperties.cardDeleteModal.addEventListener("modal.closed",(function(){e.modalProperties.cardDeleteModal.removeEventListener("submit",t)}),{once:!0}),e.modalProperties.openModal(e.modalProperties.cardDeleteModal)},handleImageClick:function(e){var t=e.modalProperties.cardImageModal,r=t.querySelector(".popup__image"),n=t.querySelector(".popup__caption"),o=e.data;r.addEventListener("load",(function(){e.modalProperties.openModal(t)}),{once:!0}),r.src=o.link,r.alt=o.name,n.textContent=o.name},handleLikeBtnClick:function(e,t){var r=t.cardLikeButton,n=t.cardLikeCounter,o=e.elementMethods.isCardAlreadyLiked(r),a=o?"remove":"add";e.apiMethods.toggleCardLike(e.data._id,o).then((function(t){e.elementMethods.updateCardLikes(n,t.likes.length),e.elementMethods.toggleCardLikeBtn(r,a),e.data=t})).catch(v)}},h=document.querySelector(".places__list"),E=document.querySelector("#card-template").content,C=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),_=document.querySelector(".profile__image"),b=document.querySelector(".popup_type_edit"),L=document.forms["edit-profile"],S=document.querySelector(".profile__edit-button"),M=document.querySelector(".profile__edit-avatar-button"),k=document.querySelector(".popup_type_edit-avatar"),A=document.forms["edit-avatar"],D=document.querySelector(".popup_type_new-card"),q=document.forms["new-place"],w=document.querySelector(".profile__add-button"),O=document.querySelector(".popup_type_image"),B=document.querySelector(".popup_type_delete-card"),P=document.forms["delete-card"],U={cardsContainer:h,cardTemplate:E,profileName:C,profileDescription:g,profileAvatar:_,profileEditModal:b,profileEditForm:L,profileEditButton:S,cardCreationModal:D,cardCreationForm:q,cardCreationButton:w,cardImageModal:O,popups:document.querySelectorAll(".popup"),cardDeleteModal:B,cardDeleteForm:P,profileEditAvatarButton:M,profileAvatarEditModal:k,profileAvatarEditForm:A};function j(e){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j(e)}function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function R(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function I(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?R(Object(r),!0).forEach((function(t){x(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):R(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function x(e,t,r){return(t=function(e){var t=function(e,t){if("object"!=j(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=j(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==j(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var T="",V={template:U.cardTemplate,elementMethods:{deleteCard:function(e){e.remove()},toggleCardLikeBtn:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"toggle";e.classList[t]("card__like-button_is-active")},updateCardLikes:function(e,t){e.textContent=t},isCardAlreadyLiked:function(e){return e.classList.contains("card__like-button_is-active")}},eventListeners:y,utilityMethods:{isCardLiked:function(e,t){return e.likes.some((function(e){return e._id===t}))},isCardOwner:function(e,t){return e.owner._id===t}},apiMethods:{toggleCardLike:d.toggleCardLike,deleteCard:d.deleteCard},modalProperties:{cardImageModal:U.cardImageModal,cardDeleteModal:U.cardDeleteModal,cardDeleteForm:U.cardDeleteForm,openModal:n,closeModal:e}};function N(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"prepend",n=function(e,t){var r=e.template.querySelector(".card").cloneNode(!0),n=r.querySelector(".card__image"),o=r.querySelector(".card__title"),a=r.querySelector(".card__delete-button"),i=r.querySelector(".card__like-button"),l=r.querySelector(".card__like-counter");return n.src=e.data.link,n.alt=e.data.name,o.textContent=e.data.name,l.textContent=e.data.likes.length,e.cardElement=r,e.utilityMethods.isCardOwner(e.data,t)?(a.classList.remove("card__delete-button_is-hidden"),a.addEventListener("click",(function(){return e.eventListeners.handleDeleteBtnClick(e)}))):a.classList.add("card__delete-button_is-hidden"),e.utilityMethods.isCardLiked(e.data,t)&&i.classList.add("card__like-button_is-active"),i.addEventListener("click",(function(){return e.eventListeners.handleLikeBtnClick(e,{cardLikeButton:i,cardLikeCounter:l})})),n.addEventListener("click",(function(){e.eventListeners.handleImageClick(e)})),r}(e,t);U.cardsContainer[r](n)}function J(e,t){t.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"}Promise.all([d.getUserData(),d.getCardsData()]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,i,l=[],d=!0,c=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;d=!1}else for(;!(d=(n=a.call(r)).done)&&(l.push(n.value),l.length!==t);d=!0);}catch(e){c=!0,o=e}finally{try{if(!d&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(c)throw o}}return l}}(t,r)||function(e,t){if(e){if("string"==typeof e)return F(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?F(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=n[0],l=n[1];T=i._id,a(i.avatar,U.profileAvatar),o(i,{name:U.profileName,description:U.profileDescription}),l.forEach((function(e){N(I(I({},V),{},{data:e}),T,"append")}))})).catch(v),U.popups.forEach((function(t){var n;t.classList.add("popup_is-animated"),(n=t).addEventListener("click",r),n.querySelector(".popup__close").addEventListener("click",(function(){return e(n)}))})),U.profileEditForm.addEventListener("submit",(function(t){t.preventDefault(),J(!0,U.profileEditForm),function(e){var t=e.form,r=e.profile,n=e.apiMethod,o=e.onApiError,a=e.onApiSuccess,i=e.finalAction,l=e.closeModal,d=e.modal,c=t.elements.name,u=t.elements.description;n({name:c.value,about:u.value}).then((function(e){a(e,r),l(d)})).catch(o).finally((function(){return i(!1,t)}))}({form:U.profileEditForm,profile:{name:U.profileName,description:U.profileDescription},apiMethod:d.updateUserData,onApiError:v,onApiSuccess:o,finalAction:J,closeModal:e,modal:U.profileEditModal})})),U.cardCreationForm.addEventListener("submit",(function(t){t.preventDefault(),J(!0,U.cardCreationForm),function(e){var t=e.form,r=e.cardObject,n=e.apiMethod,o=e.onApiError,a=e.onApiSuccess,i=e.finalAction,l=e.closeModal,d=e.modal,c=t.elements["place-name"],u=t.elements.link;n({name:c.value,link:u.value}).then((function(e){a(I(I({},r),{},{data:e}),T),l(d)})).catch(o).finally((function(){return i(!1,t)}))}({form:U.cardCreationForm,cardObject:I({},V),apiMethod:d.addCard,onApiError:v,onApiSuccess:N,finalAction:J,closeModal:e,modal:U.cardCreationModal})})),U.profileEditButton.addEventListener("click",(function(){var e,t,r,o,a,i;e=U.profileEditForm,t={name:U.profileName,description:U.profileDescription},r=e.elements.name,o=e.elements.description,a=t.name,i=t.description,r.value=a.textContent,o.value=i.textContent,m.clearValidation({formElement:U.profileEditForm,validationConfig:m.validationConfig}),n(U.profileEditModal)})),U.profileEditAvatarButton.addEventListener("click",(function(){U.profileAvatarEditForm.reset(),m.clearValidation({formElement:U.profileAvatarEditForm,validationConfig:m.validationConfig}),n(U.profileAvatarEditModal)})),U.profileAvatarEditForm.addEventListener("submit",(function(t){t.preventDefault(),J(!0,U.profileAvatarEditForm),function(e){var t=e.form,r=e.avatarElement,n=e.onApiError,o=e.onApiSuccess,a=e.finalAction,i=e.closeModal,l=e.modal;(0,e.apiMethod)({avatar:t.elements["avatar-link"].value}).then((function(e){o(e.avatar,r),i(l)})).catch(n).finally((function(){return a(!1,t)}))}({form:U.profileAvatarEditForm,avatarElement:U.profileAvatar,apiMethod:d.updateAvatar,onApiError:v,onApiSuccess:a,finalAction:J,closeModal:e,modal:U.profileAvatarEditModal})})),U.cardCreationButton.addEventListener("click",(function(){U.cardCreationForm.reset(),m.clearValidation({formElement:U.cardCreationForm,validationConfig:m.validationConfig}),n(U.cardCreationModal)})),m.enableValidation(m.validationConfig)})();