Webcam.set({
    width:350,
    height:300,
    image_format:'jpg',
    jpg_quality:90
});

camera=document.getElementById("webcam");
Webcam.attach("#webcam");

function take_picture()
{
Webcam.snap (function(data_uri)
{
    document.getElementById("taken_image").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
});
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/2X42bMCLK/model.json",modelLoaded);

function modelLoaded()
{
    console.log('Model Is Loaded');
}

function check_picture()
{
    img = document.getElementById('captured_image');
    classifier.classify(img , gotResult);
}

function gotResult(error , results)
{
    if(error){
    console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_picture_object").innerHTML = results[0].label;
        document.getElementById("result_picture_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}