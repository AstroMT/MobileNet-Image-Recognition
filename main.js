function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded() {
  console.log("The ml5 classification model is loaded!");
}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

var previous_result = "";

function gotResult(error, results) {
  if (error) {
    console.log(error);
  } else {
    if ((results[0].confidence > 0.5) && (previous_result != results[0].label)) {
      console.log(results);
      previous_result = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = "The object detected is " + results[0].label;
      utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("object_label").innerHTML = results[0].label;
      document.getElementById("accuracy_label").innerHTML = ((results[0].confidence) * 100).toFixed(3) + "%";
    }
  }
}