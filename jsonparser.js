const fs = require("fs");

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
    console.log('result:',result)
    if(result === undefined) {
     
      break
    }
    if (input[0] === "\\") {
      let sChar = specialCharParser(input);
      if (sChar !== null) {
        result += sChar[0];
        input = sChar[1];
        console.log(sChar[0], sChar[1]);
      }
      result = result;
      input = input.slice(6);
    }
    else {
      result += input[0];
      input = input.slice(1);
    }
  }
  return [String(result),input.slice(1)];
  }

const specialCharParser = input => {
  // console.log('hi')
  if (input[1] === "\\") {
    return ['\\', input.slice(2)];
  }
  if (input[1] === "\/") {
    return ['\/', input.slice(2)];
  }
  if (input[1] === "b") {
    return ['\b', input.slice(2)];
  }
  if (input[1] === "f") {
    return ['\f', input.slice(2)];
  }
  if (input[1] === "n") {
    return ['\n', input.slice(2)];
  }
  if (input[1] === "t") {
    return ['\t', input.slice(2)];
  }
  if (input[1] === "r") {
    return ['\r', input.slice(2)];
  }
  if (input[1] === '"') {
    return ['"', input.slice(2)];
  }
  if (input[1] === "u") {
    // console.log('u:',input[1])
   
  let hex = input.slice(2,6);
  // console.log('hex:', hex)
  if (!hex.match(/[0-9A-Fa-f]{4}/)) {
    return null;
  }

  if (parseInt(hex, 16) >= 0 && parseInt(hex, 16) <= 31) {
    // console.log((parseInt(hex, 16)));
    return null;
  }

  let char = String.fromCharCode(parseInt(hex, 16));
  // console.log('char:', char)
    return [char, input.slice(6)];
  }
}

let str = fs.readFileSync("data.json","utf8");
console.log(stringParser(str));
console.log('Json.parse:', JSON.parse(str));

//  console.log(stringParser(str)[0],stringParser(str)[0].length);
 

// const arrayParser = input => {
//   if (!input.startsWith("[")) {
//     return null;
//   }
//   let result = [];
//   input = input.slice(1);
//   while (input[0] !== ']') {

//   }
// }
// console.log(arrayParser('a[1,2]'));
