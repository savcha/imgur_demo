var API_KEY = 'ecb3c9429017e1310b52e91afeb50175';

function snap(){
    console.log('snap called');
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50 });
}

function onSuccess(imageData) {
    console.log('image successfully taken');
}

function onFail(message) {
    alert('Failed because: ' + message);
}