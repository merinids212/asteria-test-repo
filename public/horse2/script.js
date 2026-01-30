let video,
  poseNet,
  poses = [],
  horseModel,
  headpos = { x: 0, y: 0, rotate: 0, xrotate: 0, yrotate: 0, width: 1 },
  toggle = 0,
  angle,
  xoffset,
  yoffset,
  xwidth,
  handX,
  handY,
  leftEar,
  rightEar,
  body = document.body,
  nose,
  nosepos,
  rightHand,
  handpos,
  faceWidth;

function preload() {
  horseModel = loadModel("https://assets.codepen.io/383755/horse_1.obj", true);
}

function setup() {
  frameRate(30);
  let horseCanvas = createCanvas(1024, 768, WEBGL);
  horseCanvas.parent("#container");
  video = createCapture(VIDEO);
  video.size(640, 480);

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });
}

function modelReady() { document.body.classList.add("loaded");
}

function bodyparts() {
  this.ears = { left: {}, right: {} };
  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      leftEar = poses[i].pose.keypoints[3];
      this.ears.left = leftEar.position;
      rightEar = poses[i].pose.keypoints[4];
      this.ears.right = rightEar.position;
      nose = poses[i].pose.keypoints[0];
      nosepos = nose.position;
      rightHand = poses[i].pose.keypoints[10];
      handpos = rightHand.position;
      facewidth = (this.ears.left.x - this.ears.right.x) * -3;
      xoffset =
        (nosepos.x - this.ears.right.x) /
        (this.ears.left.x - this.ears.right.x);
      angle = (this.ears.left.y - this.ears.right.y) / 3;
      yoffset =
        (this.ears.left.y + this.ears.right.y - nosepos.y * 2) / -4 - 12;
      if (rightHand.score > 0.5){
        body.classList.add('showhand');
        if ((headpos.handX < 300 && headpos.handY > 0) && (headpos.handY < 300 && headpos.handY > 0)){
          if (toggle == 0){
            body.classList.add("lightsout");
            setTimeout(() => { toggle = 1 }, 2000);
          }else{
            body.classList.remove("lightsout");
            setTimeout(() => { toggle = 0 }, 2000);
          }
        }
      }else{
        body.classList.remove('showhand');
      }
      if (nose.score > 0.25) {
        TweenMax.to(headpos, 0.5, {
          x: nosepos.x - width / 3,
          y: height / 2 - nosepos.y,
          xrotate: xoffset * 48 - 24,
          yrotate: yoffset,
          rotate: angle,
          handX: handpos.x,
          handY: handpos.y,
          width: facewidth,
          overwrite: true
        });
      }
    }
  }
}


function draw() {
  background(0, 0, 0, 0);
  angleMode(DEGREES);
  noStroke();
  ambientLight(150);
  directionalLight(163, 163, 163, 0, 250, -650);
  specularMaterial(250);
  shininess(10);
  bodyparts();
  translate(0, 300, -800);
  rotate(headpos.rotate);
  scale(3, -3);
  translate(
    headpos.x / 2 + 15,
    headpos.y / 3 + 50 - headpos.yrotate * 2,
    -200 + headpos.width * -1
  );
  rotateX(headpos.yrotate);
  rotateY(headpos.xrotate);
  scale(2);
  body.style.setProperty("--x", headpos.x);
  body.style.setProperty("--y", headpos.y);
  body.style.setProperty("--handx", headpos.handX);
  body.style.setProperty("--handy", headpos.handY);
  model(horseModel);
}

function mouseClicked() {
  if (toggle == 0){
    body.classList.add("lightsout");
    toggle = 1;
   }else{
     body.classList.remove("lightsout");
     toggle = 0;
   }
}
