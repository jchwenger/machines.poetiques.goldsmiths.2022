// define our variables
let x,y,z,t,e,f;
let s1;
let s2;

function setup() {

  createCanvas(500, 800);

  // our sentence
  s1 = "Introducing textual systems through experimental French poetry";

  // reservoirs/slots
  y = ["Introducing"];
  z = ["textual"];
  t = ["systems"];
  e = ["experimental"];
  f = ["French"];

  // this is a javascript formatted string, aka template literal
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  s2 = `${randEl(y)} ${randEl(z)} ${randEl(t)} through ${randEl(e)} ${randEl(f)} poetry`;

}

function draw() {

  // we prepare our canvas, text size, we don't cut words at the end of lines, and select a font
  background(255);
  textSize(25);
  textWrap(WORD);
  textFont('Helvetica');

  // ----------------------------------------
  // 2) Slots / Reservoirs
  // our sentences: the original and the modified one (see keyPressed)
  text(s1, 10, 30, 300);
  text(s2, 10, 200, 300);

}

// each time we press space we get a new random sentence (see randEl)
function keyPressed() {
  if (key === ' ') {
    s2 = `${randEl(y)} ${randEl(z)} ${randEl(t)} through ${randEl(e)} ${randEl(f)} poetry`;
  }
}

// ----------------------------------------
// THE UNDERBELLY
// ----------------------------------------

// ----------------------------------------
// https://stackoverflow.com/a/5915122
// get one random element from an array

function randEl(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}
