// This sketch introduces the concepts of permutations and combinations

// Suggestions:
// - Combinations are subsets, and the order of the elements does not matter.
// This is equivalent to enumerating all the ways you can select a certain
// number of elements from a set. 

// define our variables
let a, p;

function setup() {

  createCanvas(700, 1100);

  // material for permutations and combinations
  // BEWARE! The computation for this list grows very, very fast,
  // and your browser will quickly run out of resources
  // (also, you may have to increase the canvas size)
  a = ["train ride", "stroll", "missed flight", "deep dive", "quick sprint"];
  // a = ["banana", "strawberry", "cucumber", "porridge", "apple"];

  p = combinator(a); //  all combinations (sets of various lengths). Order does not matter!

  // we prepare our canvas, text size, we don't cut words at the end of lines, and select a font
  fill(255);
  textSize(25);
  textWrap(WORD);
  textAlign(CENTER);
  textFont('Helvetica');

}

function draw() {

  background(22, 245, 141);

  let currentLength = 1; // we start with single words
  let topMargin = 50;

  // display the results
  for (let i = 0; i < p.length; i++) {
    if (p[i].length > currentLength) {
      currentLength++; // update our current length
      topMargin += 30; // cheeky: update the top margin to add an empty line
    }
    text(p[i].join(' + '), width/2, topMargin + i*30);
  }

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
