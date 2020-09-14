let mobilenet, penguin;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  penguin = createImg("../img/penguin.jpg", () => {
    image(penguin, 0, 0, width, height);
  });
  penguin.hide();
  background(0);

  mobilenet = ml5.imageClassifier("MobileNet", () => {
    console.log("Model is ready");
    mobilenet.predict(penguin, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log(res);
        let label = `The mobile net recognizes it as ${res[0].label}`;
        let prob = `MobileNet has a confidence of ${
          res[0].confidence * 100
        } regarding this picture`;
        createP(label);
        createP(prob);
      }
    });
  });
}
