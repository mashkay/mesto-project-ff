const apiConfig = {
    baseURL: 'https://mesto.nomoreparties.co/',
    version: 'v1',
    cohortId: 'wff-cohort-17',
    headers: {
        authorization: 'e178b060-afc3-4d24-8384-782bc5f9de45',
        'Content-Type': 'application/json',
    },

    getBaseURL: function () {
        return new URL(`${this.version}/${this.cohortId}/`, this.baseURL);
    },
};

function parseResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const getUserData = () => {
    return fetch(new URL('users/me', apiConfig.getBaseURL()), {
        headers: apiConfig.headers,
    }).then(parseResponse);
};

const getCardsData = () => {
    return fetch(new URL('cards', apiConfig.getBaseURL()), {
        headers: apiConfig.headers,
    }).then(parseResponse);
};

const updateUserData = (data) => {
    return fetch(new URL('users/me', apiConfig.getBaseURL()), {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify(data),
    }).then(parseResponse);
};

const updateAvatar = (data) => {
    return fetch(new URL('users/me/avatar', apiConfig.getBaseURL()), {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify(data),
    }).then(parseResponse);
};

const addCard = (data) => {
    return fetch(new URL('cards', apiConfig.getBaseURL()), {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify(data),
    }).then(parseResponse);
};

const deleteCard = (cardId) => {
    return fetch(new URL(`cards/${cardId}`, apiConfig.getBaseURL()), {
        method: 'DELETE',
        headers: apiConfig.headers,
    }).then(parseResponse);
};

const toggleCardLike = (cardId, wasLiked) => {
    return fetch(new URL(`cards/likes/${cardId}`, apiConfig.getBaseURL()), {
        method: wasLiked ? 'DELETE' : 'PUT',
        headers: apiConfig.headers,
    }).then(parseResponse);
};

export const api = {
    getUserData,
    getCardsData,
    updateUserData,
    updateAvatar,
    addCard,
    deleteCard,
    toggleCardLike,
};
