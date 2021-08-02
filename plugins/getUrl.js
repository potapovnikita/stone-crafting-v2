import * as JSZipUtils from "jszip-utils/dist/jszip-utils";

export const getImgLocal = (url) => {
    const imageUrl = require('~/assets/' + `${url}`)
    return url ? `${imageUrl}` : ''
};

export const getBgImgLocal = (url) => {
    const imageUrl = require('~/assets/' + `${url}`)
    return url ? `url(${imageUrl})` : ''
};

export const getImgExternal = (url) => {
    if(url && url.includes('http')) {
        return url;
    }
    const imageUrl = 'https://stone-crafting.com/sharedFiles/assets/' + `${url}`
    return url ? `${imageUrl}` : ''
};

export const arrayBufferToBase64 = (buffer, type = '') => {
    return `data:${type ? type : 'image/png'};base64,` + buffer
};

export const getFilesFromData = (data) => {
    let files = [];

    data.forEach((file) => {
        files.push(dataURLtoFile(arrayBufferToBase64(file.data, file.type), file.name));
    });

    return files;
};

export const isObject = (obj) => {
    return obj === Object(obj);
};

export const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while(n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
};


export const urlToPromise = (url) => {
    return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if (err) {
                reject(err);
            } else {
                console.log('data', data)
                resolve(data);
            }
        });
    });
}
