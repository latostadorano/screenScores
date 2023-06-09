let team1Score = 0;
let team2Score = 0;

let minutes = 0;
let seconds = 0;
let playing = false;
let playPauseButton;

let period = 1;

let team1Fouls = 0;
let team2Fouls = 0;

let tieColor, looseColor, winColor;
let colorA1, colorA2;

let textModifier = 1;

function setup() {
  //createCanvas(windowWidth, windowHeight);
  //frameRate(1);

  textAlign(CENTER);

  // Set the maximum width and height for the canvas
  let maxWidth = windowWidth; // Set your desired maximum width here
  let maxHeight = windowHeight; // Set your desired maximum height here
  let canvasWidth = min(windowWidth, maxWidth);
  let canvasHeight = min(windowHeight, maxHeight);
  createCanvas(canvasWidth, canvasHeight);

  // Definimos la font
  textAlign(CENTER);
  textFont("Arial");
  textStyle(BOLD);
  if (canvasWidth < canvasHeight){
    textModifier = 1.3;
    print('textModifier = 1.3!')
  }

  // Definimos colores para empates y ventajas
  backgroundColor = 50;
  tieColor = color("#48CFAD");
  looseColor = color("#5D9CEC");
  winColor = color("#4A89DC");

  colorA1 = winColor;
  colorA2 = looseColor;

  // Crea botones de play, pausa y stop
  playButton = createButton("▶️"); //⏸
  playButton.style("visibility", "visible");
  playButton.position(width / 2 - 50, 165);
  playButton.mousePressed(togglePlaying);
  //playButton.center('horizontal');

  stopButton = createButton("⏹");
  stopButton.position(width / 2 + 15, 165);
  stopButton.mousePressed(stopTime);
  
  //print('Canvas width: '+ canvasWidth + '  Canvas height: ' + canvasHeight);
}

function draw() {
  background(backgroundColor);
  updateTime();

  // Muestra el estado actual de los botones
  stopButton.elt.disabled = playing;

  if (team1Score === team2Score) {
    colorA1 = tieColor;
    colorA2 = tieColor;
  }
  if (team1Score > team2Score) {
    colorA1 = winColor;
    colorA2 = looseColor;
  } else if (team1Score < team2Score) {
    colorA2 = winColor;
    colorA1 = looseColor;
  }

  noStroke();
  fill(colorA1);
  rect(0, 0, width / 2, height);
  fill(colorA2);
  rect(width / 2, 0, width, height);

  // Mostrar los fondos dinámicos del marcador
  noStroke();
  fill(colorA1);
  rect(0, 0, width / 2, height);
  fill(colorA2);
  rect(width / 2, 0, width, height);

  stroke(255);
  strokeWeight(3);
  line(width / 2, height / 2 - 90, width / 2, height / 2 + 170);

  // Mostrar los MARCADORES de cada equipo
  push();
  fill(255);
  noStroke();
  textSize(550/(textModifier*1.2));
  textAlign(CENTER, CENTER);
  text(team1Score, width / 4, height / 2 + 70);
  text(team2Score, (width / 4) * 3, height / 2 + 70);
  pop();

  // Mostrar el TIEMPO del juego
  push();
  noStroke();
  fill(0, 80);
  textSize(150/(textModifier*2));
  textAlign(CENTER, CENTER);
  let formattedTime = nf(minutes, 2) + ":" + nf(seconds, 2);
  text(formattedTime, width / 2, height / 8);
  pop();

  push();
  noStroke();
  fill(255);
  
  // Mostrar las FALTAS de cada equipo
  textSize(40);
  textAlign(CENTER, CENTER);
  textSize(80/textModifier);
  text(team1Fouls, width / 5, height / 8);
  text(team2Fouls, (width / 5) * 4, height / 8);
  textSize(25);
  text("Faltas", width / 5, height / 8 + 50);
  text("Faltas", (width / 5) * 4, height / 8 + 50);

  // Mostrar el PERIODO actual
  textSize(80/textModifier);
  textAlign(CENTER, CENTER);
  text(period, width / 2, (height / 8) * 7);
  textSize(25);
  text("PERIODO", width / 2, (height / 8) * 7 + 50);

  pop();

  //print('MouseX: ' + mouseX + '  MouseY: ' + mouseY);

  push();
  rectMode(CORNERS);
  fill(0);
  noFill();
  noStroke();
  let haaight = height / 17;
  rect(width / 10, haaight, width / 10 + width / 5, haaight * 3);
  rect((width / 10) * 7, haaight, (width / 10) * 9, haaight * 3);

  rect(width / 10, haaight, (width / 10 + width / 5) / 2, haaight * 3);
  rect((width / 10) * 7, haaight, (width / 10) * 7.5, haaight * 3);
  pop();
  
  noFill();
  //rect(0,height/20 *16, 400, height);
}

function updateTeam1Score() {
  team1Score += 1;
}

function updateTeam2Score() {
  team2Score += 1;
}

function updateTime() {
  if (playing && !paused && frameCount % 60 == 0) {
    seconds += 1;
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    }
    let formattedTime = nf(minutes, 2) + ":" + nf(seconds, 2);
    periodPlaying = true;
  }
}
function playTime() {
  playing = true;
  paused = false;
}

function pauseTime() {
  paused = true;
}

function togglePlaying() {
  if (playing == false) {
    playing = true;
    playTime();
    print("Timer stopped.");
    playButton.html("⏸");
  } else {
    playing = false;
    print("Timer start.");
    pauseTime();
    playButton.html("▶️");
  }
}

function togglePeriod() {
  if (period == 1) {
    period = 2;
  }
  else {
    period = 1;
  }
}

function updatePeriod() {
  period += 1;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    team1Score += 1;
  } else if (keyCode === RIGHT_ARROW) {
    team2Score += 1;
  } else if (keyCode === UP_ARROW) {
    team1Fouls += 1;
  } else if (keyCode === DOWN_ARROW) {
    team2Fouls += 1;
  }
}

function stopTime() {
  playing = false;
  paused = false;
  minutes = 0;
  seconds = 0;
}

function mousePressed() {
  var heightScores = height / 20
  var distanceScores = width / 2 / 5;
  var heightFouls = height / 17;
  var heightPeriod = height/20 *17;
  var distancePeriod = width/9;

  // SCORES
  if (mouseY > height/20 *7 && mouseY < height/20*15) {
    if (mouseX > 0 && mouseX < distanceScores) {
      team1Score -= 1;
      win = false;
    }
    if (mouseX > distanceScores && mouseX < width / 2) {
      team1Score += 1;
      win = true;
    }
    if (mouseX > width / 2 && mouseX < width / 2 + distanceScores) {
      team2Score -= 1;
      win = false;
    }
    if (mouseX > width / 2 + distanceScores && mouseX < width) {
      team2Score += 1;
      win = true;
    }
  }
  // FALTAS
  if (mouseY > heightFouls && mouseY < heightFouls * 3) {
    if (mouseX > width / 10 && mouseX < (width / 10 + width / 5) / 2) {
      team1Fouls -= 1;
    } else if (
      mouseX > (width / 10 + width / 5) / 2 &&
      mouseX < width / 10 + width / 5
    ) {
      team1Fouls += 1;
    } else if (mouseX > (width / 10) * 7 && mouseX < (width / 10) * 7.5) {
      team2Fouls -= 1;
    } else if (mouseX > (width / 10) * 7.5 && mouseX < (width / 10) * 9) {
      team2Fouls += 1;
    }
  }
  
  // PERIOD
  if (mouseY > heightPeriod && mouseY < height){
    if (mouseX > width/2 - distancePeriod && mouseX < width/2 + distancePeriod){
      togglePeriod();
    }
  }
}



/*
Aquí vamos

function touchStarted() {
  // Comprueba si hay toques en la pantalla y si se ha tocado uno de los botones
  if (touches && touches[0]) {
    // Botón 1: cambia el color de fondo
    if (dist(touches[0].x, touches[0].y, width/3, height/2) < 25) {
      backgroundColor = color(random(255), random(255), random(255));
    }
    
    // Botón 2: cambia el color del círculo
    if (dist(touches[0].x, touches[0].y, width/3 *2, height/2) < 25) {
      backgroundColor = color(random(255), random(255), random(255));
    }
  }
  
  // Asegurémonos de que el evento touchStarted no se propague
  return false;
}


*/
