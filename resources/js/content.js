var API_KEY = 'ecb3c9429017e1310b52e91afeb50175';
var currentImage;

function snap(){
    console.log('snap called');
    navigator.camera.getPicture(submit, onFail, {
        sourceType : Camera.PictureSourceType.CAMERA,
        destinationType : Camera.DestinationType.DATA_URL
    });
}

function choose(){
    console.log('choose called');
    navigator.camera.getPicture(submit, onFail, {
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType : Camera.DestinationType.DATA_URL
    });
}

function onSuccess(imageData) {
    console.log('image successfully taken');
//    currentImage = imageData;
    console.log('trying to change page');
    $.mobile.changePage( "#submit", { transition: "slide"} );
    console.log('changed page')
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function submit(){

    console.log('submit called');

    $.ajax({
        url: 'http://api.imgur.com/2/upload.json',
        type: 'POST',
        data: {
            key: API_KEY,
            type: 'base64',
            name: 'test',
            title: 'imgur upload test',
            caption: 'uploaded from android',
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

    $.mobile.changePage( "#successful", { transition: "slide"} );
//    location.href = '#successful'
    setTimeout(function(){
        $.mobile.changePage( "#main", { transition: "slide"} );
//        location.href = '#main';
    }, 3000)
}
