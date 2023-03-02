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
  const result = input.match()
}