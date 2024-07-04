const extractCardData = (cardData) => {
    return {
        name: cardData.name,
        link: cardData.link,
        likes: cardData.likes.map((like) => extractUserData(like)),
        id: cardData._id,
        owner: extractUserData(cardData.owner),
    };
};

const extractUserData = (userData) => {
    return {
        name: userData.name,
        description: userData.about,
        avatar: userData.avatar,
        id: userData._id,
    };
};

export const apiParser = {
    extractCardData,
    extractUserData,
};
