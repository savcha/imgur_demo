var API_KEY = 'ecb3c9429017e1310b52e91afeb50175';
var currentImage;

/*function snap(){
    console.log('snap called');
    navigator.device.capture.captureImage(onSuccess, onFail, {
        destinationType : Camera.DestinationType.DATA_URL,
        targetWidth: 300,
        targetHeight: 300
    });
}

function choose(){
    console.log('choose called');
    navigator.camera.getPicture(onSuccess, onFail, {
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType : Camera.DestinationType.DATA_URL,
        targetWidth: 300,
        targetHeight: 300
    });
}*/


function snap(){
    navigator.device.capture.captureImage(function(mediaFiles){
        console.log('length of media files array is '+mediaFiles.length);
        onSuccess(mediaFiles[0].fullPath)
    }, onFail)
}

function choose(){
    console.log('choose called');
    navigator.camera.getPicture(onSuccess, onFail, {
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType : Camera.DestinationType.DATA_URI
    });
}


/*function onSuccess(imageData) {
    console.log('image successfully taken'+imageData);
    currentImage = imageData;
    $('#image').attr('src', "data:image/jpeg;base64," + imageData);
    goToSubmit();
}*/

function onSuccess(imageSource) {
    console.log('image successfully taken '+imageSource);
    $('#image').attr('src', imageSource);
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

    var fileURI = $('#image').attr('src');
    console.log('file uri is '+fileURI);

    var options = new FileUploadOptions();
    console.log('file options created');
    options.fileKey="file";
    options.fileName=fileURI.substr(fileURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";
    options.params = {
        key: API_KEY,
        title: title,
        caption: caption
    }
    console.log('file parameters added');

    var ft = new FileTransfer();
    console.log('file transfer created');
    ft.upload(
        fileURI,
        "http://api.imgur.com/2/upload.json",
        function(data){
            console.log('Submission successful');
            console.log(data);
            console.log("Code = " + data.responseCode);
            console.log("Response = " + data.response);
            console.log("Sent = " + data.bytesSent);
            postSuccess(data);
        },
        function(error){
            console.log('error callback');
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        },
        options);
    console.log('ft upload called');

    /*$.ajax({
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
    })*/
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