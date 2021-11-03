import { caseCountOutOfRangeError, dimensionOutOfRangeError } from './errors';
import { Constraints } from './constraints';
import { Element } from './element';
import { TCMatrix } from './matrix';
import { solution } from './solve';
//readFileSync - means it will fully read the file before it goes on to read any code below it
const fs = require('fs');
export function readInput(inputFile) {
    const line = fs.readFileSync(inputFile, { encoding: "utf-8" }).split("\n"); //since
    const totalCases = Number(line[0]);
}
//idk if this is ok:
//since we dont have an input file (ie input is just stdin), use a class instead of a function
//why do we need @class?
//@class
//why do we export?
//the input will be broken up into the test cases (array of test cases/interfaces) and the first input line (the number of Test Cases)
export class ParseInput {
    //set inTC = false when we get line defining the rows/columns of a new test case (AKA a line which includes ' ')
    //set inTC = true when we start adding items to our matrix
    //if inTC = true, then dont create new object, add to existing
    constructor() {
        //watch that we dont define our add data to matrix statement to be before our define casecount line (inTC wont be defined)
        //have the testCases defined as an array of TestCase types
        this.testCases = [];
        this.matrix = new Array(); //should it be var?
        ParseInput.inTC = true;
        this.colCount = this.colCount;
        this.rowCount = this.rowCount;
    }
    //should we have a separate constructor? maybe because we only want to output the test case array?
    //could just have something separate for this.... maybe break up?
    //using a line read through instead of a full read so that can save memory
    //use the line read through to:
    //a) find the number of test cases (line 0)
    //b) find all the data from a single test case, then compute that test case and output the result before moving to next
    //class functions
    //lookup function signatures (public??)
    //add return type and func name
    //do i need public OR return type?
    parseLine(line) {
        //we are referring to the line instance
        //we should be able to make caseCount static? even tho parseInput is reused for each line? 
        //why do i need to include ParseInput.
        //should i put this. instead?
        //do i have to include return type null?
        //if we do not have caseCount assigned to a value yet, this is the first line of the input (and Number(line)=caseCount)
        //if a value is defined, it will return true when it is in an if condition! (if undefined, then false)
        if (!ParseInput.caseCount) {
            //ensure that the caseCount value satisfies the constraints
            //if does, assign the caseCount value 
            //cast the value in this line to a number
            //do we have to update our function to work with Number type?
            if (Constraints.caseCountInRange(Number(line))) {
                ParseInput.caseCount = Number(line);
                //use return just to jump out ?
                return;
                //do i have to include a return null???
            }
            //if constraints not met, throw error
            //to throw, must include the ()
            throw caseCountOutOfRangeError();
        }
        //should i handle an empty line... YES! but using /n
        //if the line contains a space, this is the first line of a test case, which defines the number of rows and columns.
        //we could do this differently. could do if rows and columns are undefined, then _ (but idk if can use undefined for interface?)
        //maybe use null? 
        //and then clear any time we have a new line in our input
        //does it auto-clear? 
        //how are we gonna know which test case/interface we are on? do they have names/enumerations?
        if (line.includes(' ')) {
            //get the row and column counts by splitting via ' ' delimiter
            //ensure BOTH rows and cols meet constraints, 
            ParseInput.inTC = false; //or use .this?  //decide whether to use this before or in our if statement 
            const [numRows, numCols] = line.split(' ');
            if (Constraints.rowsInRange(Number(numRows)) && Constraints.colsInRange(Number(numCols))) {
                //if yes, create new TestCase interface, then assign row and col values  
                //we are creating an object of type interface TestCase
                //newTestCase is being overwritten everytime we have a new test case in our input
                this.rowCount = Number(numRows);
                this.colCount = Number(numCols);
                /*
                const newTestCase: TestCase = {
                    rows: Number(numRows),
                    cols: Number(numCols)
                };
                */
                //WHAT IF ONE OF OUR TC CASE COUNTS IS OUT OF RANGE?? HOW DO WE KNOW HOW MANY LINES TO SKIP??? INTC VALUE?
                //use return just to jump out ?
                return;
                //do i have to include a return null???
            }
            //if constraints not met, throw error
            throw dimensionOutOfRangeError();
        }
        if (ParseInput.caseCount && !(line.includes(' '))) {
            //if no existing TC matrix, create one
            while (!ParseInput.inTC) {
                //const matrix: number[][] = new Array(); //should it be var?
                const matrix = new Array();
                //get rid of one of the above
                ParseInput.inTC = true; //or this.? (not this because not the instance? its static)
            }
            this.matrix.push(line);
            //this is where we add to our matrix
            //is there a way to remove our old array to save space...
            //var matrix: number[][] = new Array();
            if (this.matrix.length === this.rowCount) {
                //this is where we should print to screen our result and call the solve function
                //or, instead of calling from here, can we 
                //we can make this main.ts tbh
                while (this.colCount) {
                    const TC = this.createTCMatrix(this.rowCount, this.colCount);
                    //call solution T
                    solution(TC);
                }
            }
            return null;
        }
        //else (empty/new line)
        return null;
        //when we get a new line, can we actually call to solve and output our result? Or will this write in the same terminal that we were reading and create an infinite loop?
    }
    //traverse each of the following "n" (row value) lines and insert them into the matrix for the test case
    //continue until we have an empty /n (between test cases) or nothing remaining. 
    //then we get this and get our matrix as the 
    //I MIGHT HAVE A PROBLEM WITH THIS. THHE OTHER SOLN IS CALLING THIS FUNC IN INDEX.TS
    //need a function that creates our matrix [[],[]] (an array of arrays) into a matrix of elements:
    //transform our current matrix rows (individual arrays) into individual elements.
    createTCMatrix(rows, cols) {
        const elements = [];
        //cannot use forEach if there are duplicates rows.
        //this.matrix.forEach((str) => {
        for (let i = 0; i < rows; i++) {
            //const { lineSize, columnSize, pixels: stringPixels } = bitmapDescription;
            //create an array of Element items. This is what our TCMatrix will be.
            //let str = this.matrix[i];
            for (let j = 0; j < cols; j++) {
                if (this.matrix[i].charAt(j) == '1') {
                    //setting the distance as 0 if the value is 1
                    const element = new Element(i, j, Number(this.matrix[i].charAt(j)), 0);
                    elements.push(element);
                }
                else {
                    const element = new Element(i, j, Number(this.matrix[i].charAt(j)), '');
                    elements.push(element);
                }
            }
        }
        const mat = new TCMatrix(rows, cols, elements); //should i have the other properties like row col for TCMatrix in the consutruct?
        return mat;
    }
}
function strToNumArray(str) {
    let array = str.split(""); //stringify the number, then make each digit an item in an array
    return array.map(x => parseInt(x)); //convert all the items back into numbers
}
;
function numberToArray(num) {
    let array = num.toString().split(""); //stringify the number, then make each digit an item in an array
    return array.map(x => parseInt(x)); //convert all the items back into numbers
}
;
//use the function
const myNumber = 1245;
var myArray = numberToArray(myNumber);
//const myNumber = 1245;
//var myArray = numberToArray(myNumber); //will return [1,2,4,5]
var matriix2 = new Array();
matriix2.push([1, 1]); //= [[1,1]];
console.log(matriix2);
matriix2.push([1, 2]); //= [[1,1]];
matriix2.push([1, 2]); //= [[1,1]];
console.log(matriix2);
console.log(matriix2.length); //number of rows
console.log(matriix2[0]); //first row
console.log(matriix2[0][1]); //first row, second col
//# sourceMappingURL=parseInput.js.map