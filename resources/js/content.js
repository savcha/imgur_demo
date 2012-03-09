var API_KEY = 'ecb3c9429017e1310b52e91afeb50175';
var currentImage;


function snap(){
    navigator.camera.getPicture(onSuccess, onFail, {destinationType : Camera.DestinationType.DATA_URL});
}

function choose(){
    console.log('choose called');
}

function onSuccess(imageData) {
    console.log('image successfully taken');
    currentImage = imageData;
    var image = document.getElementById('image');
    image.src = "data:image/jpeg;base64," + currentImage;
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
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log('ajax fail');
            alert('Imgur submission failed because: ' + textStatus);
        }
    })
}