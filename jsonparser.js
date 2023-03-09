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
    console.log(result,input,input.slice(result[0].length))
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
    if (input[0] === "\\") {
      let sChar = specialCharParser(input);
      if (sChar[0] !== null) {
        result += sChar[0];
        input = sChar[1];
      }
      result = result;
      input = sChar[1];
    }
    else {
      result += input[0];
      input = input.slice(1);
    }
  }
  return [String(result),input.slice(1)];
  }

const specialCharParser = input => {
  switch (input[1]) {
    case "\\":
        return ['\\', input.slice(2)];
        break;
    case "\/":
        return ['\/', input.slice(2)];
        break;
    case "b":
        return ['\b', input.slice(2)];
        break;
    case "f":
        return ['\f', input.slice(2)];
        break;
    case "n":
        return ['\n', input.slice(2)];
        break;
    case "t":
        return ['\t', input.slice(2)];
        break;
    case "r":
        return ['\r', input.slice(2)];
        break;
    case '"':
        return ['"', input.slice(2)];
        break;
}

  if (input[1] === "u") {
  let hex = input.slice(2,6);
  if (!hex.match(/[0-9A-Fa-f]{4}/)) {
    return null;
  }
  if (parseInt(hex, 16) >= 0 && parseInt(hex, 16) <= 31) {
    return [null, input.slice(6)];
  }

  let char = String.fromCharCode(parseInt(hex, 16));
    return [char, input.slice(6)];
  }
}

let str = fs.readFileSync("data.json","utf8");
// console.log(stringParser(str)[0]);
// console.log('Json.parse:', JSON.parse(str));

const valueParser = input => {
  return (nullParser(input) || booleanParser(input) || numParser(input) || stringParser(input)); 
}
// console.log(valueParser(str));
 

const arrayParser = input => {
  let result = [];
  if (!input.startsWith("[")) {
    return null;
  }
  input = input.slice(1);
  if (input[0] == ']') {
    return [result, input.slice(1)];
  }
  // console.log(result);
  while (input[0]) {
    // console.log(input[0]);
    let parsedValue = valueParser(input);
    // console.log(parsedValue);
    if (parsedValue === null) {
      return null;
    }
    // console.log(result);
    result.push(parsedValue[0]);
    console.log(parsedValue[1],parsedValue[0]);
    input = parsedValue[1];
    // console.log(input);
    if (input[0] === ']') {
      return [result, input.slice(1)];
    }
    if (input[0] !== ',') {
      return null;
    }
    input = input.slice(1);
    }
  }
console.log(arrayParser('[1,2]abcd'));
// console.log('Json.parse:', JSON.parse(str));
