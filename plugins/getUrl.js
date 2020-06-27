export const getImgLocal = (url) => {
    const imageUrl = require('~/assets/' + `${url}`)
    return url ? `${imageUrl}` : ''
};

export const getBgImgLocal = (url) => {
    const imageUrl = require('~/assets/' + `${url}`)
    return url ? `url(${imageUrl})` : ''
};

export const getImgExternal = (url) => {
    const imageUrl = 'https://stone-crafting.com/sharedFiles/assets/' + `${url}`
    return url ? `${imageUrl}` : ''
};
