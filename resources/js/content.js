var API_KEY = 'ecb3c9429017e1310b52e91afeb50175';
var currentImage;

document.addEventListener("deviceready", function(){
    var id = setInterval(function(){
        console.log('phonegap ready')
    }, 1000);
    setTimeout(function(){
        clearInterval(id)
    }, 7000);
}, false);

function snap(){
    console.log('snap called');
    navigator.camera.getPicture(onSuccess, onFail, {destinationType : Camera.DestinationType.DATA_URL});
    //alert('Failed because phonegap has a broken api');
}

function choose(){
    console.log('choose called');
    navigator.camera.getPicture(onSuccess, onFail, {
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType : Camera.DestinationType.DATA_URL
    });
}

function onSuccess(imageData) {
    console.log('image successfully taken'+imageData);
    currentImage = imageData;
    $('#image').attr('src', "data:image/jpeg;base64," + imageData);
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

    $.ajax({
        url: 'http://api.imgur.com/2/upload.json',
        type: 'POST',
        data: {
            key: API_KEY,
            type: 'base64',
            title: title,
            caption: caption,
            image: currentImage
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
}

function postSuccess(jsonResponse){
    //todo show link to picture and removal link
    console.log('post success called');
    console.log(jsonResponse);
    console.log('about to log');
    console.log('original link is '+jsonResponse['upload']['links']['original']+', delete link is '+jsonResponse['upload']['links']['delete_page']);

    console.log('setting links');
    $('#imgur_link').val(jsonResponse['upload']['links']['original']);
    $('#delete_link').val(jsonResponse['upload']['links']['delete_page']);
    goToSubmitted();
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