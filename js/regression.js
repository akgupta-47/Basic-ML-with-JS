let mobilenet, video, classifier;
let trainButton, slider;
let label = "test";
// let prob = ``;

function mobileReady() {
  console.log("Model is ready");
  //mobilenet.predict(gotResults);
}

function videoReady() {
  console.log("Video is ready");
}

function gotResults(err, res) {
  if (err) {
    console.error(err);
  } else {
    // console.log(res);
    label = res[0].label;
    classifier.classify(gotResults);
  }
}

function setup() {
  createCanvas(640, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);

  mobilenet = ml5.featureExtractor("MobileNet", mobileReady);
  classifier = mobilenet.regression(video, videoReady);

  slider = createSlider(0, 1, 0.5, 0.01);
  slider.input(() => {
    console.log(slider.value());
  });

  trainButton = createButton("train");
  trainButton.mousePressed(() => {
    classifier.train((loss) => {
      if (loss == null) {
        console.log("training is completed");
        classifier.classify(gotResults);
      } else {
        console.log(loss);
      }
    });
  });
}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(23);
  text(label, 10, height - 20);
  let val = slider.value();
  background(val, 100, 100, 1);
}
