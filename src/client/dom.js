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
            $('#thumbnails').prepend('<div class="imageDiv col-md-4 row" data-name="' + value.name + '"><div class="col-md-10 col-md-offset-1"><img class="imgPreview img-thumbnail img-responsive" src="' + value.preview + '"></img></div><div class="col-md-10 col-md-offset-1 input-group"><input class="tagsInput form-control" type="text" value="' + value.tags + '"/><span class="input-group-btn"><button class="saveTagsBtn btn btn-default">Edit</button></span></div></div>');
        }
    });
}

function attachClickHandlers() {
    $('.imgPreview').click(function (event) {
        $('#bigImage').empty();
        var name = $( this ).parents('.imageDiv').attr('data-name');

        $.get('/api/image?fileName=' + encodeURI(name))
            .done(function (data) {
                $('#bigImage').append('<img class="img-responsive" src="' + data.href + '"></img>');
            })
            .fail(function () {
                console.error("Can't get full image");
            });
    });

    $('.saveTagsBtn').click(function (event) {
        var name = $( this ).parents('.imageDiv').attr('data-name');
        var tags = $( this ).parents('.imageDiv').find('.tagsInput').val();

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