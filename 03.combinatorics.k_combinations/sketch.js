// This sketch introduces the concepts of permutations and combinations

// Suggestions:
// - K-combinations are only the selection of subsets of a particular size k.
// This could be used if you want to combine things together. For instance, if
// your set contains characters, combinations could give you all possible ways
// of forming groups of characters. If your set contains emotions, and you
// would like to create a piece combining three together, you could look at all
// the k-combinations for k = 3.

// define our variables
let a, p, mySelect;

function setup() {

  createCanvas(800, 350);

  // material for combinations
  // (also, you may have to increase the canvas size)
  a = ["happiness", "sadness", "excitement", "anger", "curiosity"];
  // a = ["entrance", "roof", "basement", "staircase", "kitchen"];

  p = k_combinator(a, 2); //  all k combinations (sets of length k). Order does not matter!

  // we prepare our canvas, text size, we don't cut words at the end of lines, and select a font
  fill(0);
  textSize(25);
  textWrap(WORD);
  textAlign(LEFT);
  textFont('Helvetica');

  // reference: https://p5js.org/reference/#/p5/createSelect
  mySelect = createSelect();
  mySelect.position(805, 5);

  // Add options programmatically
  for (let i = 0; i < a.length; i++) {
    mySelect.option(String(i+1)); // add as many numbers as there are 
  }

  // Set the selected option corresponding to the size of our k (2)
  mySelect.selected(String(2));

}

function draw() {

  background(18, 252, 241);

  // display the results
  for (let i = 0; i < p.length; i++) {
    text(p[i].join(' or '), 50, 50 + i*30);
  }

  // check if the user changed the number k
  mySelect.changed(reCombine);

  // pesky little indication
  push();
  fill(255,0,0);
  stroke(255);
  textSize(13);
  textAlign(RIGHT);
  textFont('Courier New');
  text('change me →', 795 + random()*2, 18 + random() * 2);
  pop();

}

function reCombine() {
  // when the user selects something, 
  // recompute the k combinations using the selected number!
  p = k_combinator(a, Number(mySelect.selected())); 
}

// ----------------------------------------
// THE UNDERBELLY
// ----------------------------------------

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
