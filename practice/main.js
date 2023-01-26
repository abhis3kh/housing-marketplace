// const traditionalFunction = (name) => `Hello Developer, ${name} !!!`;

// console.log(traditionalFunction('Abhisekh'));
const spreadFuntion = (...args) =>
  'You have passed ' + args.length + ' arguments.';

console.log(spreadFuntion(0, 1, 2));
console.log(spreadFuntion('string', null, [1, 2, 3], {}));
