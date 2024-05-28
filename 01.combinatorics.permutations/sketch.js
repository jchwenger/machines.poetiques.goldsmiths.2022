// This sketch introduces the concepts of permutations and combinations

// Suggestions:
// - Permutations will yield all possible orderings of a set. Note that this
// is very abstract, and could apply to all sorts of things. For instance, the
// elements of the set could be different events in a narrative, performance,
// or animation.

// define our variables
let a, p;

function setup() {

  createCanvas(500, 800);

  // material for permutations and combinations
  // BEWARE! The computation for this list grows very, very fast,
  // and your browser will quickly run out of resources
  // (also, you may have to increase the canvas size)
  a = ["hello", "world", "goodbye", "universe"];
  // a = ["entrance", "roof", "basement", "staircase"];
  // a = ["stand", "sit", "raise hand", "close eyes"];

  p = permutator(a); // all permuations: shuffling! Order matters!

  // we prepare our canvas, text size, we don't cut words at the end of lines, and select a font
  fill(255);
  textSize(25);
  textWrap(WORD);
  textAlign(CENTER);
  textFont('Helvetica');

}

function draw() {

  background(245, 27, 241);

  // display the results
  for (let i = 0; i < p.length; i++) {
      text(p[i].join(', '), width/2, 50 + i*30);
  }

}

// ----------------------------------------
// THE UNDERBELLY
// ----------------------------------------

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
