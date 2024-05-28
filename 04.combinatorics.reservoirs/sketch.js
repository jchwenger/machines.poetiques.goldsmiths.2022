// This sketch uses randomness to implement something like the 'beautiful
// corpse' ('cadavre exquis'): the structure of the sentence is set in advance,
// but it is composed of 'slots' that can be filled with interchangeable
// elements.

// Suggestions:
// - The core idea here is that opposition between an overall structure (here
// the sentence) and constituent parts / slots, that don't themselves move, but
// can be filled with changing elements. This is a very abstract principle,
// that could be applied in all sorts of ways: for instance, as soon as you
// have a temporal sequence of events (perhaps during a performance, or a
// number of animations one after the other), then you could use this principle
// to inject randomness into which elements gets picked, even as you maintain
// the overarching structure.
// - It is perfectly possible to use randomness in this way to change other
// elements, not just the text. A simple example of this can be to have a
// reservoir of different fonts, or colours, etc., for the various slots?
// In this case, you would have to split the string below into several parts,
// and display each part individually.

// define our variables
let x,y,z,t,e,f;
let s1;
let s2;

function setup() {

  createCanvas(400, 400);

  // reservoirs/slots
  // TODO: add more elements to these arrays
  y = ["Introducing"];
  z = ["textual"];
  t = ["systems"];
  e = ["experimental"];
  f = ["French"];

  // our sentence: take the first element of each array
  s1 = `${y[0]} ${z[0]} ${t[0]} through ${e[0]} ${f[0]} poetry`;

  // this is a javascript formatted string, aka template literal
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  s2 = `${randEl(y)} ${randEl(z)} ${randEl(t)} through ${randEl(e)} ${randEl(f)} poetry`;

  // we prepare our canvas, text size, we don't cut words at the end of lines, and select a font
  textSize(25);
  textWrap(WORD);
  textFont('Helvetica');

}

function draw() {

  background(69, 252, 18);

  // ----------------------------------------
  // 2) Slots / Reservoirs
  // our sentences: the original and the modified one (see keyPressed)
  const m = 40;
  text(s1, m, m,        400 - m);
  text(s2, m, height/2, 400 - m);

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
  //     ⌜ from this array
  //     |   ⌜ (turn into integer)
  //     |   |          pick a random index
  //     ↓   ↓          ↓
  return arr[Math.floor(Math.random()*arr.length)];
}
