const permutator = (inputArr) => {
  const BLACK = '\033[0;30m', GREEN = '\033[1;32m', BLUE = '\033[0;34m';
  let result = [];
  console.log('entering permutator, input array:', inputArr);
  const permute = (arr, m = [], s='  ') => {
    console.log(`${s}---`);
    console.log(`${s}arr:`, arr, `m:`, m, `${GREEN}(entering permute)${BLACK}`);
    if (arr.length === 0) {
      console.log(`${s}===`);
      console.log(`${s}${BLUE}arr length == 0, at the bottom of recursion, saving m:${BLACK}`, m);
      result.push(m)
      console.log(`${s}${BLUE}result now:${BLACK}`, result);
      console.log(`${s}===`);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        console.log();
        console.log(`${s}looping: ${i+1}/${arr.length}`);
        console.log(`${s}current:`, curr, 'm:', m, 'next:', next,  '-> m+next:', m.concat(next), '(recursing with current and m+next)');
        permute(curr.slice(), m.concat(next), `${s}  `)
        if (arr.length > 1 && i < arr.length - 1) {
          console.log(`${s}arr:`, arr, '(...back, looping!)');
        } else {
          console.log(`${s}arr:`, arr, '(...back and done!)');
        }
      }
    }
  }

  permute(inputArr)
  console.log('----------------------------------------');
  console.log('exiting permutator, result', result);

  return result;
}

permutator([1,2,3]);
