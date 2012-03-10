var API_KEY = 'ecb3c9429017e1310b52e91afeb50175';
var currentImage;

function snap(){
    console.log('snap called');
    navigator.camera.getPicture(onSuccess, onFail, {
        sourceType : Camera.PictureSourceType.CAMERA,
        destinationType : Camera.DestinationType.DATA_URL
    });
}

function choose(){
    console.log('choose called');
    navigator.camera.getPicture(onSuccess, onFail, {
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType : Camera.DestinationType.DATA_URL
    });
}

function onSuccess(imageData) {
    console.log('image successfully taken');
    currentImage = imageData;
    var image = document.getElementById('image');
    image.src = image.src = "data:image/jpeg;base64," + imageData;
    $.mobile.changePage( "#submit", { transition: "slide"} );
//    location.href = '#submit';
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function submit(){

    console.log('submit called');

    var title = $('#image_title').val();
    var caption = $('#image_title').val();

    console.log('title is '+title+', caption is '+caption);

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

//    $.mobile.changePage( "#successful", { transition: "slide"} );
    location.href = '#submitted';
    setTimeout(function(){
        $.mobile.changePage( "#main", { transition: "slide"} );
//        location.href = '#main';
    }, 3000)
}
