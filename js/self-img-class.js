let mobilenet, video;
let label = ``;
let prob = ``;

function mobileReady() {
  console.log("Model is ready");
  mobilenet.predict(gotResults);
}

function gotResults(err, res) {
  if (err) {
    console.error(err);
  } else {
    //console.log(res);
    let count = 0;
    count++;
    label = `The mobile net recognizes it as ${res[0].label}`;
    prob = `MobileNet has a confidence of ${
      res[0].confidence * 100
    } regarding this picture`;
    mobilenet.predict(gotResults);
    // createP(label);
    // createP(prob);
  }
}

function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);

  mobilenet = ml5.imageClassifier("MobileNet", video, mobileReady);
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(23);
  text(label, 10, height - 20);
}
