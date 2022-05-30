
// define our variables
let a;
let x,y,z,t,e,f;
let s1;
let s2;

function setup() {

  createCanvas(500, 800);

  // ----------------------------------------
  // 1) Shuffling

  // material for permutations and combinations
  // BEWARE! The computation for this list grows very, very fast,
  // and your browser will quickly run out of resources
  // (also, you may have to increase the canvas size)
  a = ["hello", "world", "goodbye", "universe"];
  // a = ["entrance", "roof", "basement", "staircase"];

  // here three choices for permutations
  // (use only one at a time!)
  const p = permutator(a); // all permuations: shuffling! Order matters!
  // const p = combinator(a); //  all combinations (sets of various lengths). Order does not matter!
  // const p = k_combinator(a, 2); //  all k combinations (sets of length k). Order does not matter!

  // ----------------------------------------
  // 2) Slots / Reservoirs

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
  // 1) Shuffling
  for (let i = 0; i < p.length;i++) {
      text(p[i].join(', '), 10, 30 + i*30);
  }

  // ----------------------------------------
  // 2) Slots / Reservoirs
  // our sentences: the original and the modified one (see keyPressed)
  // text(s1, 10, 30, 300);
  // text(s2, 10, 200, 300);

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


// ----------------------------------------
// Permutations
// ------------

// https://stackoverflow.com/a/20871714
// generate all permutations of an array
// Order matters! [a,b] =/= [b,a]

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result;
}

// ----------------------------------------
// Combinations
// ------------

/**
 * Copyright 2012 Akseli Palén.
 * Created 2012-07-15.
 * Licensed under the MIT license.
 */

// https://stackoverflow.com/a/37075399
// generate all combinations of a set:
// Order doesn't matter! [a,b] == [b,a]

// 1) all k combinations (all different sets of k elements from array)

function k_combinator(set, k) {
  let i, j, combs, head, tailcombs;
  if (k > set.length || k <= 0) {
    return [];
  }
  if (k == set.length) {
    return [set];
  }
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i+1);
    tailcombs = k_combinator(set.slice(i + 1), k - 1);
    for (let j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}

// 2) all possible combinations (all sets of 1 element, 2 elements, ... n = total length of array)

function combinator(set) {
  var k, i, combs, k_combs;
  combs = [];
  for (k = 1; k <= set.length; k++) {
    k_combs = k_combinator(set, k);
    for (i = 0; i < k_combs.length; i++) {
      combs.push(k_combs[i]);
    }
  }
  return combs;
}
