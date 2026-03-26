// P_2_2_3_02
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * form mophing process by connected random agents
 * two forms: circle and line
 *
 * MOUSE
 * click               : start a new circe
 * position x/y        : direction and speed of floating
 *
 * KEYS
 * 1-2                 : fill styles
 * 3-4                 : form styles circle/line
 * arrow up/down       : step size +/-
 * f                   : freeze. loop on/off
 * Delete/Backspace    : clear display
 * s                   : save png
 */
'use strict';


let distortionFactor = 1;

let freeze = false;

let form;

function setup() {
  createCanvas(windowWidth, windowHeight);

  stroke(0, 50);
  strokeWeight(0.75);
  background(255);
  form = new MorphingForm(width/2, height/2)

}

function draw() {
  form.render()
}

function mousePressed() {
  form.reset(mouseX, mouseY)
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
  if (key == '1') form.filled = false;
  if (key == '2') form.filled = true
  if (key == '3') form.drawMode = 1;
  if (key == '4') form.drawMode = 2;

  if (keyCode == UP_ARROW) form.stepSize++;
  if (keyCode == DOWN_ARROW) form.stepSize--;
  form.stepSize = max(form.stepSize, 1);

  // pause/play draw loop
  if (key == 'f' || key == 'F') freeze = !freeze;
  if (freeze) {
    noLoop();
  } else {
    loop();
  }
}