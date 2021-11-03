import { caseCountOutOfRangeError, dimensionOutOfRangeError } from './errors';
import { Constraints } from './constraints';
import { Element } from './element';
import { TCMatrix } from './matrix';
import { solution } from './solve';

//readFileSync - means it will fully read the file before it goes on to read any code below it
const fs = require('fs');

export function readInput(inputFile: string): String[] {
    const line = fs.readFileSync(inputFile, { encoding: "utf-8" }).split("\n");
    return line;
}


export function parseInputv(inputFile: string) {
    const lines = readInput(inputFile);
    const len = lines.length;
    let caseCount: number | undefined; 
    let matrix: String[] = [];
    let inTC = false; 
    let rowCount: number | undefined;
    let colCount: number | undefined;
    for(let i = 0; i < len; i++){
        const line = String(lines[i]);
        //if we do not have caseCount assigned to a value yet, this is the first line of the input (and Number(line)=caseCount)
        //if a value is defined, it will return true when it is in an if condition! (if undefined, then false)
        if(!caseCount){
            //ensure that the caseCount value satisfies the constraints
            //if does, assign the caseCount value (the number value)
            if(Constraints.caseCountInRange(Number(line))){
                caseCount = Number(line);
                continue;
            }
            //if constraints not met, throw error
            throw caseCountOutOfRangeError();
        }

        if(line.includes(' ')){
            //get the row and column counts by splitting via ' ' delimiter
            //ensure BOTH rows and cols meet constraints, 
            inTC = false; 
            const [numRows, numCols] = line.split(' ');
            if(Constraints.rowsInRange(Number(numRows)) && Constraints.colsInRange(Number(numCols))){
                rowCount = Number(numRows);
                colCount = Number(numCols);
                console.log('Test Case Details: Row Count: '+ rowCount + ', Column Count: '+ colCount);
                continue;
            }
            //if constraints not met, throw error
            throw dimensionOutOfRangeError();
        }

        if(caseCount && !(line.includes(' '))){
            if(!inTC) {
                matrix = [];
                inTC = true;
            }
            matrix.push(line);
            
            if(matrix.length === rowCount && colCount){
                //this is where we call the solve function
                    const TC: TCMatrix = createTCMatrix(rowCount, colCount, matrix); 
                    //call solution:
                    solution(TC);
            }
            continue;
        }
    }
}

//transform our current matrix rows (individual arrays) into individual elements.
    function createTCMatrix(rows: number, cols: number, matrix: String[]): TCMatrix {
        const elements: Element[] = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if(matrix[i].charAt(j) == '1'){
                    //setting the distance as 0 if the value is 1
                    const element = new Element(i, j, Number(matrix[i].charAt(j)),0);
                    elements.push(element);
                }
                else{
                    const element = new Element(i, j, Number(matrix[i].charAt(j)),'');
                    elements.push(element);
                }
        }
    }
    const mat = new TCMatrix(rows, cols, elements); //should i have the other properties like row col for TCMatrix in the consutruct?
    return mat;
}



