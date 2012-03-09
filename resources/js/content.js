var API_KEY = 'ecb3c9429017e1310b52e91afeb50175';

console.log('running js');

document.addEventListener("deviceready", function(){
    console.log('device ready');
}, false);

console.log('setting up snap');
function snap(){
    console.log('snap called');
    navigator.camera.getPicture(onSuccess, onFail, {});
}

function onSuccess(imageData) {
    console.log('image successfully taken');
    var image = document.getElementById('image');
    image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}