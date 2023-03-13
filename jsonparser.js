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
    if (input[0] === "\\") {
      let sChar = specialCharParser(input);
      if (sChar !== null) {
        result += sChar[0];
        input = sChar[1];
      } else return null;
    } else {
      result += input[0];
      input = input.slice(1);
    }
  }
  return [result, input.slice(1)];
}

const specialCharParser = input => {
  let escChar = input[1];
  let sChar = '';
  switch (escChar) {
    case "\\":
      sChar = '\\';
      break;
    case "\/":
      sChar = '\/';
      break;
    case "b":
      sChar = '\b';
      break;
    case "f":
      sChar = '\f';
      break;
    case "n":
      sChar = '\n';
      break;
    case "t":
      sChar = '\t';
      break;
    case "r":
      sChar = '\r';
      break;
    case '"':
      sChar = '"';
      break;
    case "u":
      let hex = input.slice(2, 6);
      if (!hex.match(/[0-9A-Fa-f]{4}/)) {
        break;
      }
      if (parseInt(hex, 16) >= 0 && parseInt(hex, 16) <= 31) {
        break;
      }
      sChar = String.fromCharCode(parseInt(hex, 16));
      break;
  }
  if (sChar.length === 0) return null;
  if (escChar === "u") {
    return [sChar, input.slice(6)];
  } else {
    return [sChar, input.slice(2)];
  }
}

let str = fs.readFileSync("data.json", "utf8");
// console.log(stringParser(str));
// console.log('Json.parse:', JSON.parse(str));

const valueParser = input => {
  input = input.trim();
  return (nullParser(input) || booleanParser(input) || numParser(input) ||
    stringParser(input) || arrayParser(input));
}
// console.log(valueParser(str));


const arrayParser = input => {
  if (!input.startsWith("[")) {
    return null;
  }
  input = input.slice(1);
  input = input.trim();
  let result = [];
  while (input[0] !== ']') {
    input = input.trim();
    let parsedValue = valueParser(input);
    if (parsedValue === null) {
      return null;
    }
    result.push(parsedValue[0]);
    input = parsedValue[1];
    input = input.trim();
    if (input[0] === ',') {
      input = input.slice(1);
      continue;
    }
  }
  return [result, input.slice(1)];
}
// console.log(arrayParser('[ 1 , 2 ]abc'));


const objectParser = input => {
  if (!input.startsWith('{')) {
    return null;
  }
  input = input.slice(1);
  input = input.trim();
  let result = {};
  // if (input[0] === '}') {
  //   return [result, input.slice(1)];
  // }
  while (input[0] !== '}') {
    let parsedString = stringParser(input);
    if (parsedString === null) {
      return null;
    }
    let key = parsedString[0];
    input = parsedString[1];
    if (input[0] !== ':') {
      return null;
    }
    input = input.slice(1);
    input = input.trim();
    let parsedValue = valueParser(input);
    if (parsedValue !== null) {
      let value = parsedValue[0];
      input = parsedValue[1];
      result[key] = value;
    }
    // if (input[0] === '}') {
    //   return [result, input.slice(1)];
    // }
    if (input[0] === ',') {
      continue;
    }
    return [result, input.slice(1)];
  }
}
console.log(objectParser('{ "a" : 1 ,"b" : 2 }abc'));
