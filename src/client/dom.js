import $ from 'jquery';
import { getThumbnailsData, getThumbnailsDataWithUntagged } from './data.js';

let offset = 0;
let limit = 10;
let total;

function generateThumbnails(data) {
    total = data.total;
    limit = data.limit;
    offset = data.offset;
    $('#thumbnails').empty();
    $.each(data.items, function (index, value) {
        if (value.type === 'file') {
            $('#thumbnails').prepend('<div class="imageDiv" data-name="' + value.name + '"><img class="imgPreview" src="' + value.preview + '"></img><input class="tagsInput" type="text" value="' + value.tags + '"/><button class="saveTagsBtn">Edit</button></div>');
        }
    });
}

function attachClickHandlers() {
    $('.imgPreview').click(function () {
        $('#bigImage').empty();
        var name = $(this).parent('.imageDiv').attr('data-name');

        $.get('/api/image?fileName=' + encodeURI(name))
            .done(function (data) {
                $('#bigImage').append('<img src="' + data.href + '"></img>');
            })
            .fail(function () {
                console.error("Can't get full image");
            });
    });

    $('.saveTagsBtn').click(function () {
        var name = $(this).parent('.imageDiv').attr('data-name');
        var tags = $(this).parent('.imageDiv').find('.tagsInput').val();

        $.post('/api/saveTags', { "name": name, "tags": tags });
    });
}


export function drawPreviews(data) {
    generateThumbnails(data);
    attachClickHandlers();
}

export function init() {
    $('#prevButton').click(function () {
        offset -= limit;
        if (offset < 0) {
            offset = 0;
        }
        getThumbnailsData($('#searchTextbox').val(), limit, offset)
            .then(function (data) {
                drawPreviews(data);
            });
    });

    $('#nextButton').click(function () {
        offset += limit;
        if (offset > total) {
            offset -= limit;
            if (offset < 0) {
                offset = 0;
            }
        }
        getThumbnailsData($('#searchTextbox').val(), limit, offset)
            .then(function (data) {
                drawPreviews(data);
            });

    });

    $('#searchButton').click(function () {
        $('#bigImage').empty();
        offset = 0;
        getThumbnailsData($('#searchTextbox').val(), limit, offset)
            .then(function (data) {
                drawPreviews(data);
            });

    });

    $('#untaggedButton').click(function () {
        $('#bigImage').empty();
        offset = 0;
        getThumbnailsDataWithUntagged(limit, offset)
            .then(function (data) {
                drawPreviews(data);
            });

    });
}