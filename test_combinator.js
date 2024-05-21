const BLACK = '\033[0;30m', GREEN = '\033[1;32m', BLUE = '\033[0;34m', RED = '\033[0;31m'; 

function k_combinator(set, k, s='') {
  console.log(`${s}entering k_combinator, k:`, k, 'set:', set);
  let i, j, combs, head, tailcombs;
  if (k > set.length || k <= 0) {
    console.log(`${s}invalid k:`, k, 'returning []');
    return [];
  }
  if (k == set.length) {
    console.log();
    console.log(`${s}===`);
    console.log(`${s}${BLUE}at bottom of recursion & handling last element in array, returning single tail:${BLACK}`, [set]);
    console.log(`${s}===`);
    console.log();
    return [set];
  }
  if (k == 1) {
    combs = [];
    console.log();
    console.log(`${s}===`);
    console.log(`${s}${BLUE}k == 1: at bottom of recursion, preparing tails with${BLACK}`, set);
    for (i = 0; i < set.length; i++) {
      console.log(`${s}`, i,'pushing',[set[i]]);
      combs.push([set[i]]);
    }
    console.log(`${s}combs now:`, combs);
    console.log(`${s}===`);
    console.log();
    return combs;
  }
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i+1);
    console.log(`${s}head ${i+1}/${set.length}:`, head,` | heads:`, set, `${GREEN}(recursing)${BLACK}`);
    console.log(`${s}-`);
    tailcombs = k_combinator(set.slice(i + 1), k - 1, `${s}  `);
    console.log(`${s}-`);
    console.log(`${s}...back!, at head ${i+1}:`,head, 'tails from below:', tailcombs);
    for (let j = 0; j < tailcombs.length; j++) {
      console.log(`${s}`, j, 'new comb:', head.concat(tailcombs[j]));
      combs.push(head.concat(tailcombs[j]));
    }
    console.log(`${s}combs now:`, combs);
    console.log(`${s}---`);
  }
  console.log(`${s}ending k_combinator, combs:`, combs);
  return combs;
}

function combinator(set) {
  var k, i, combs, k_combs;
  combs = [];
  for (k = 1; k <= set.length; k++) {
    console.log(`${RED}combinator about to invoke k_combinator with k: ${k}...${BLACK}`);
    console.log(`${RED}----------------------------------------------------${BLACK}`);
    console.log();
    k_combs = k_combinator(set, k, '  ');
    console.log();
    console.log(`${RED}----------------------------------------------------${BLACK}`);
    console.log(`${RED}...back to combinator!${BLACK}`);
    console.log();
    console.log(`${k}/${set.length} |`, 'k-combs:', k_combs);
    console.log('gathering in final array');
    for (i = 0; i < k_combs.length; i++) {
      combs.push(k_combs[i]);
    }
    console.log('combs now:', combs);
    console.log();
  }
  console.log('ending, combs:', combs);
  return combs;
}

combinator([1,2,3,4]);
