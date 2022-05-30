const permutator = (inputArr) => {
  let result = [];
  console.log('entering permutator', inputArr);
  const permute = (arr, m = []) => {
    console.log('---');
    console.log('entering permute with arr', arr, 'm', m);
    if (arr.length === 0) {
      console.log();
      console.log('===');
      console.log('arr length == 0, at the bottom of recursion, saving m:', m);
      result.push(m)
      console.log('result now', result);
      console.log('===');
      console.log();
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        console.log('arr/curr', arr, 'i', i, '-> next', next,  'm', m, '-> m+next', m.concat(next));
        console.log('about to recurse with curr and m+next');
        permute(curr.slice(), m.concat(next))
        console.log('...back!');
      }
    }
  }

  permute(inputArr)
  console.log();
  console.log('exiting permutator, result', result);

  return result;
}

permutator([1,2,3]);
