const nullParser = input => {
  if (!input.startsWith('null')) return null
  return [null, input.slice(4)]
}
// console.log(nullParser('nullabcd'));
// console.log(nullParser('abcdnull'));

const booleanParser = input => {
  if (input.startsWith('true')) {
    return [true, input.slice(4)];
  }
  if (input.startsWith('false')) {
   return [false, input.slice(5)];
  }
return null;
}
// console.log(booleanParser('abcdtrue'));

const numParser = input => {
  const result = input.match(/^-?([1-9]\d*|0)(\.\d+)?([Ee][+-]?\d+)?/);
  if (result) {
    return [Number(result[0]), input.slice(result[0].length)];
  }
  return null;
}
// console.log(numParser('1e-2'));


const stringParser = input => {
  if (!input.startsWith('"')) return null;
  input = input.slice(1);
  let result = '';
  while (input[0] !== '"') {
    if (input[0] === "\\" && input[1] !== "u") {
      result += input[0];
      input = input.slice(2);
    // } else if (input[0] === "\\" && input[1] === '"') {
    //   result += input[0];
    //   input = input.slice(2);
    // 
    } else {
      result += input[0];
      input = input.slice(1);
    }
  }
  return [String(result),input.slice(1)];
  }
console.log(stringParser('"hi\b\"t\"s1"2ddfdg'));
