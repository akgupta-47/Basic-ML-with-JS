let mobilenet, video, classifier;
let imgButton1, imgButton2, imgButton3;
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
  classifier = mobilenet.classification(video, videoReady);

  imgButton1 = createButton("happy");
  imgButton1.mousePressed(() => {
    classifier.addImage("happy");
    // console.log("sample 1 is pressed");
  });

  imgButton2 = createButton("sad");
  imgButton2.mousePressed(() => {
    classifier.addImage("sad");
    // console.log("sample 2 is pressed");
  });

  imgButton3 = createButton("train");
  imgButton3.mousePressed(() => {
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
}
