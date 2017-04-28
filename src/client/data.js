import $ from 'jquery';

export function getThumbnailsData(search, limit, offset) {
    return $.get(`/api/preview?search=${encodeURI(search || '')}&limit=${limit}&offset=${offset}`)
        .fail(function () {
            console.error("Can't get preview of images");
        });
}

function getThumbnailsDataWithUntaggedInternal(resolve, reject, limit, offset) {
    $.get(`/api/untagged?limit=${limit}&offset=${offset}`)
        .done(function (data) {
            if (!!data.readNext) {
                setTimeout(function () {
                    offset += limit;
                    console.log("Reading next from " + offset);
                    getThumbnailsDataWithUntaggedInternal(resolve, reject, limit, offset);
                }, 10);
            } else {
                resolve(data);
            }
        })
        .fail(function () {
            console.error("Can't get preview of untagged images");
            reject();
        });
}

export function getThumbnailsDataWithUntagged(limit, offset) {
    return new Promise(function(resolve, reject) {
        getThumbnailsDataWithUntaggedInternal(resolve, reject, limit, offset)
    });
}
