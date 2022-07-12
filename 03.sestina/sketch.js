// define our variables
let img;
let rhymeWords, sestinaMatrix, scheme;

let longestWidth;
let lineHeight;

function setup() {

  createCanvas(1500, 800);

  rhymeWords = ["enters", "nail", "soul", "rod", "uncle", "room"];

  scheme = [5, 0, 4, 1, 3, 2]; // each position must appear exactly once!

  sestinaMatrix = makeSestina(rhymeWords, scheme);

  // for (let stanza of sestinaMatrix) {
  //   console.log(stanza);
  // }

  textSize(25);
  textWrap(WORD);
  textFont('Helvetica');

  // https://stackoverflow.com/a/46125820
  const longest = rhymeWords.reduce((curr, next) => curr.length > next.length ? curr : next, "");
  // console.log(`the longest word is ${longest}`);

  // https://p5js.org/reference/#/p5/textWidth
  longestWidth = textWidth(longest);

  lineHeight = 40;

}

function draw() {

  // we prepare our canvas, text size, we don't cut words at the end of lines, and select rhymeWords font
  background(255);

  text(`A Sestina Generator`, 10, lineHeight);

  for (let i = 0; i < sestinaMatrix.length; i++) {
    text(i+1, 10 + i*(longestWidth + lineHeight), lineHeight * 2);
    for (let j = 0; j < sestinaMatrix.length; j++) {
      text(sestinaMatrix[i][j], 10 + i*(longestWidth + lineHeight), lineHeight * 3 + j*lineHeight);
    }
  }

  // illustrating the algorithm
  drawScheme(scheme, ((longestWidth + lineHeight) * scheme.length)/2, scheme.length * lineHeight + lineHeight * 4);

}

// ----------------------------------------
// THE UNDERBELLY
// ----------------------------------------

function makeSestina(arr, scheme) {
  if (! arr.length === scheme.length) {
    throw `${arr} and ${scheme} must be of the same length!`;
  }
  let sestinaMatrix = [arr];  // start with our initial array of words
  // console.log(sestinaMatrix);
  // stop before the end, we don't need to close the cycle
  for (let i = 0; i < scheme.length - 1; i++) {
    new_stanza = []
    for (let ind of scheme) {
       // use the last permutated array/stanza in the matrix
       // to create the new one
      new_stanza.push(sestinaMatrix[sestinaMatrix.length-1][ind]);
    }
    sestinaMatrix.push(new_stanza);
  }
  return sestinaMatrix
}

// sort an array but return the indices required for sorting (argsort)
// https://stackoverflow.com/a/46622523
// array trick: https://stackoverflow.com/a/46622523
const argSort = (arr) => [...Array(arr.length).keys()]
  .map((item, index) => [arr[index], item]) // add the args to sort by
  .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
  .map(([, item]) => item) // extract the sorted items
  .reverse(); // sort ascending

function drawScheme(scheme, x, y) {

  line(10, y - lineHeight, (longestWidth + lineHeight) * scheme.length, y - lineHeight);
  text(`scheme:`, 10, y);
  text(`[${scheme}]`, 10, y + lineHeight);

  const schemeArgsort = argSort(scheme);

  // draw the order of the algorithm & store the Y positions
  let schemeYs = [];
  for (let i = 0; i < scheme.length; i++) {
    const schemeY = y + lineHeight * i;
    text(schemeArgsort[i] + 1, x, schemeY); // draw the order of steps of the scheme
    schemeYs.push(schemeY);
  }

  textAdjustment = textAscent()/3; // I tweaked this to get to the right height
  push();
  // noFill();
  const innerMargin = 15;

  // draw the arrows
  for (let i = 0; i < scheme.length - 1; i++) {

    const firstPoint = schemeYs[scheme[i]];
    const secondPoint = schemeYs[scheme[i + 1]];
    const pointsSpan = abs(firstPoint - secondPoint); // middle position between start & end points
    const centre_y = Math.min(firstPoint, secondPoint) + pointsSpan/2 - textAdjustment;
    const arc_w_h = pointsSpan; // drawing circles: height == width
    const triCentre_y = secondPoint - textAdjustment; // the centre of the arrowhead

    // using modulo logic to alternate left and right arcs
    if (i % 2 == 0) { // drawing on the right
      centre_x = x + innerMargin * 2;
      // fill(255,0,0);
      // circle(centre_x, centre_y, 10);
      start = -HALF_PI;
      stop = HALF_PI;
      // draw the arrow (a triangle) pointing left
      fill(0);
      const tri_1_x = centre_x - 4;
      const tri_1_y = triCentre_y;
      const tri_2_x = centre_x;
      const tri_2_y = triCentre_y - 4;
      const tri_3_x = centre_x;
      const tri_3_y = triCentre_y + 4;
      triangle(tri_1_x, tri_1_y, tri_2_x, tri_2_y, tri_3_x, tri_3_y);
      // text(`left   ${i} ${scheme[i]} | ${firstPoint} ${secondPoint} → ${centre_y} | ${pointsSpan}`, 10, y + i * lineHeight + 200);
      noFill();
    } else { // drawing on the left
      centre_x = x - innerMargin;
      // fill(255,0,0);
      // circle(centre_x, centre_y, 10);
      start = HALF_PI;
      stop = -HALF_PI;
      // draw the arrow (a triangle) pointing right
      fill(0);
      const tri_1_x = centre_x + 4;
      const tri_1_y = triCentre_y;
      const tri_2_x = centre_x;
      const tri_2_y = triCentre_y - 4;
      const tri_3_x = centre_x;
      const tri_3_y = triCentre_y + 4;
      triangle(tri_1_x, tri_1_y, tri_2_x, tri_2_y, tri_3_x, tri_3_y);
      // text(`right ${i} ${scheme[i]} | ${firstPoint} ${secondPoint} → ${centre_y} | ${pointsSpan}`, 10, y + i * lineHeight + 200);
      noFill();
    }
    // https://p5js.org/reference/#/p5/arc
    arc(centre_x, centre_y, arc_w_h, arc_w_h, start, stop, OPEN);
  }

  pop();

}
