//maybe use lightweight version for import?
//To use lightweight, number only implementations of all functions: e.g. import { sqrt } from 'mathjs/number'
import * as math from 'mathjs';
//also works:
//import { sqrt,ones,matrix } from 'mathjs';
const array = [[2, 0], [-1, 3]]; // Array
const matriix = math.matrix([[7, 1], [-2, 3]]); // Matrix
const arrrr = math.sqrt(2);
const ar = math.ones(2, 3); // Matrix, [[1, 1, 1], [1, 1, 1]]
//const arr = [([0] * 9) for x in range(9)];
const arrr = Array(9).fill(0).map(() => Array(9).fill(0));
console.log(arrr);
ar.valueOf();
ar.forEach;
//# sourceMappingURL=test.js.map