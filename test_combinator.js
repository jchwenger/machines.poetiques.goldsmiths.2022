function k_combinator(set, k) {
  console.log('entering k_combinator, k', k, 'set', set);
  let i, j, combs, head, tailcombs;
  if (k > set.length || k <= 0) {
    console.log('invalid k', k, 'returning []');
    return [];
  }
  if (k == set.length) {
    console.log();
    console.log('===');
    console.log('at bottom of recursion & handling last element in array, returning', [set]);
    console.log('===');
    console.log();
    return [set];
  }
  if (k == 1) {
    combs = [];
    console.log();
    console.log('===');
    console.log('k == 1: at bottom of recursion, preparing combs with', set);
    for (i = 0; i < set.length; i++) {
      console.log(' ', i,'pushing',[set[i]]);
      combs.push([set[i]]);
    }
    console.log('combs now', combs);
    console.log('===');
    console.log();
    return combs;
  }
  combs = [];
  console.log('heads:', set);
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i+1);
    console.log('head',i, ':', head, 'about to recurse...');
    console.log('-');
    tailcombs = k_combinator(set.slice(i + 1), k - 1);
    console.log('-');
    console.log('...back!, i:',i,'head',head, 'tailcombs', tailcombs);
    for (let j = 0; j < tailcombs.length; j++) {
      console.log(' ', j, 'new comb:', head.concat(tailcombs[j]));
      combs.push(head.concat(tailcombs[j]));
    }
    console.log('combs now:', combs);
    console.log('---');
  }
  console.log('ending k_combinator, combs:', combs);
  return combs;
}

function combinator(set) {
  var k, i, combs, k_combs;
  combs = [];
  for (k = 1; k <= set.length; k++) {
    console.log('----------------------------------------------------');
    console.log('combinator about to invoke k_combinator with k', k, '...');
    console.log();
    console.log('***');
    console.log();
    k_combs = k_combinator(set, k);
    console.log();
    console.log('***');
    console.log();
    console.log('...back to combinator!', 'k:', k, 'k combs', k_combs);
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

// k_combinator([1,2,3,4], 2);
combinator([1,2,3,4]);
