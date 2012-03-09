var API_KEY = 'ecb3c9429017e1310b52e91afeb50175';
var currentImage;


function snap(){
    console.log('snap called');
    navigator.camera.getPicture(submit, onFail, {
        sourceType : Camera.PictureSourceType.CAMERA,
        destinationType : Camera.DestinationType.DATA_URL,
        targetWidth: 100,
        targetHeight: 100
    });
}

function choose(){
    console.log('choose called');
    navigator.camera.getPicture(submit, onFail, {
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType : Camera.DestinationType.DATA_URL,
        targetWidth: 100,
        targetHeight: 100
    });
}

function onSuccess(imageData) {
    console.log('image successfully taken');
//    currentImage = imageData;
    /*var image = document.getElementById('image');
    image.src = "data:image/jpeg;base64," + imageData;*/
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function submit(imgData){

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
            image: imgData
        },
        success: function(data){
            console.log('ajax success');
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('ajax fail');
            alert('Imgur submission failed because: ' + textStatus);
        }
    })
}
