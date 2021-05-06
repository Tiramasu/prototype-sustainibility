  Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90,
    constraints:{
      facingMode:'environment'
    }
  });

  camera = document.getElementById("camera");

Webcam.attach( '#camera' );

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iExbpAVtn/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
      
  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }


function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    if(results[0].confidence.toFixed(3)>0.988 && results[0].label == "Recyclable") {
      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = "recyclable";
    }
    else{
    document.getElementById("result_object_accuracy").innerHTML = "cannot identify";
    document.getElementById("result_object_name").innerHTML = "cannot identify";
    }
    document.getElementById("result_object_accuracy1").innerHTML = results[0].confidence.toFixed(3);
  }
}