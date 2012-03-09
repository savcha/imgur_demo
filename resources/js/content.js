var API_KEY = 'ecb3c9429017e1310b52e91afeb50175';

console.log('running js');

document.addEventListener("deviceready", function(){
    console.log('device ready');
}, false);

console.log('setting up snap');
function snap(){
    console.log('snap called');

    if(navigator){
        console.log('navigator defined');
        if(navigator.camera){
            console.log('camera defined');
            navigator.camera.getPicture(onSuccess, onFail, {});
        }
        else console.log('camera not defined');
    }
    else console.log('navigator not defined');
}

function choose(){
    console.log('choose called');
}

function onSuccess(imageData) {
    console.log('image successfully taken');
    var image = document.createElement('img');//document.getElementById('image');
    image.src = "data:image/jpeg;base64," + imageData;
    document.getElementsByTagName('body')[0].appendChild(image);
}

function onFail(message) {
    alert('Failed because: ' + message);
}