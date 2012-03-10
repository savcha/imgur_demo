var API_KEY = 'ecb3c9429017e1310b52e91afeb50175';

function snap(){
    console.log('snap called');
    navigator.camera.getPicture(onSuccess, onFail);
}

function choose(){
    console.log('choose called');
    navigator.camera.getPicture(onSuccess, onFail, {
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType : Camera.DestinationType.FILE_URI
    });
}

function onSuccess(imageData) {
    console.log('image successfully taken');
    currentImage = imageData;
    $('#image').attr('src', imageData);
    goToSubmit();
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function submit(){

    console.log('submit called');

    var title = $('#image_title').val();
    var caption = $('#image_title').val();

    console.log('title is '+title+', caption is '+caption);
    goToSending();

    var reader = new FileReader();
    reader.onloadend = function(evt) {
        console.log("read success "+evt.target.result);
        $.ajax({
            url: 'http://api.imgur.com/2/upload.json',
            type: 'POST',
            data: {
                key: API_KEY,
                type: 'base64',
                title: title,
                caption: caption,
                image: evt.target.result
            },
            success: function(data){
                console.log('ajax success');
                postSuccess(data);
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log('ajax fail');
                alert('Imgur submission failed because: ' + textStatus);
            }
        })
    };
    console.log('fetching image')
    var imageURL = $('#image').attr('src');
    reader.readAsDataURL(imageURL);
}

function postSuccess(jsonResponse){
    //todo show link to picture and removal link
    console.log('post success called');
    console.log(jsonResponse);
    goToSubmitted();
    console.log('original link is '+jsonResponse['links']['original']+', delete link is '+jsonResponse['links']['delete_page']);

    console.log('setting links')
    $('#imgur_link').html(jsonResponse['links']['original']);
    $('#delete_link').html(jsonResponse['links']['delete_page']);
}

//Navigation
function goToMain(){
    $.mobile.changePage( "#main", { transition: "slide"} );
}

function goToSubmit(){
    $.mobile.changePage( "#submit", { transition: "slide"} );
}

function goToSending(){
    $.mobile.changePage( "#sending", { transition: "slide"} );
}

function goToSubmitted(){
    $.mobile.changePage( "#submitted", { transition: "slide"} );
}