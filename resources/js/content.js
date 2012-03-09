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
    var image = document.getElementById('image');
    image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}