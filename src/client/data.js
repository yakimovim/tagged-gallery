import 'whatwg-fetch';

export function getThumbnails(search = '', offset = 0, limit = 12, sortBy = 'name') {
    return fetch(`/api/preview?search=${encodeURI(search || '')}&limit=${limit}&offset=${offset}&sortBy=${encodeURI(sortBy)}`, { credentials: 'same-origin' })
        .then(function (response) {
            return response.json();
        })
        .catch(function () {
            console.error("Can't get preview of images");
        });
}

function getThumbnailsDataWithUntaggedInternal(resolve, reject, limit, offset, sortBy = 'name') {
    fetch(`/api/untagged?limit=${limit}&offset=${offset}&sortBy=${encodeURI(sortBy)}`, { credentials: 'same-origin' })
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            if (!!data.readNext) {
                setTimeout(function () {
                    offset += limit;
                    console.log("Reading next from " + offset);
                    getThumbnailsDataWithUntaggedInternal(resolve, reject, limit, offset, sortBy);
                }, 10);
            } else {
                resolve(data);
            }
        })
        .catch(function () {
            console.error("Can't get preview of untagged images");
            reject();
        });
}

export function getThumbnailsDataWithUntagged(limit, offset, sortBy = 'name') {
    return new Promise(function (resolve, reject) {
        getThumbnailsDataWithUntaggedInternal(resolve, reject, limit, offset, sortBy)
    });
}

export function getFullImage(name) {
    return fetch(`/api/image?fileName=${encodeURI(name)}`, { credentials: 'same-origin' }).then(function (response) {
        return response.json()
    });}

export function getClientId() {
    return fetch('/api/clientId', { credentials: 'same-origin' }).then(function (response) {
        return response.text()
    });
}

export function saveTags(name, tags) {
    return fetch('/api/saveTags', {
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "name": name,
            "tags": tags
        })
    });
}