import { whitePixelNotFoundError } from './errors';
/*
Breadth First Search (BFS)
BFS is an algorithm for searching a tree data structure for a node that satisfies a given property.
It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level.
Extra memory, usually a queue, is needed to keep track of the child nodes that were encountered but not yet explored.
*/
// if there is no white pixel (1) in the test case, then everything is 0 
//We only throw an exception for that given test case, not the entire input
export function solution(matrix) {
    //COULD HAVE ARRAY/QUEUE OF WHITE ELEMENTS AS A SECOND INPUT (WOULD GET THIS IN PARSEINPUT IN OUR CREATE MATRIX FUNC)
    //use a queue and BFS - this guarantees we only need to go through each each pixel once.
    //Use an array as our queue representation for which elements we have and havent traversed
    //NEWW----------------------------------------------------------------------------------------------
    //the output matrix contains the distance from the closest white (1-value) element in the input TC matrix
    //to start, set the distance of each element to ____ (max_value/inf/variable? i think it might have to be a number) in the output matrix, 
    //set the distance to the 
    //create a queue of all the white (1-valued) element coordinates/indices in the TCmatrix
    //the distance for each white element is 0.
    //Array.prototype.filter()
    //The filter() method creates a new array with all elements that pass the test implemented by the provided function.  
    const queue = matrix.elements.filter(el => el.val === 1);
    if (queue.length == 0) {
        throw whitePixelNotFoundError();
    }
    //Array.prototype.find()
    //Returns the value of the first element in the array where predicate is true, and undefined otherwise.
    //this only returns the first value.
    matrix.elements.find(el => el.row === 1);
    //why does the other solution decrememnt queuesize?
    while (queue.length !== 0) {
        const e = queue.shift();
        //set the distance to 0 for the white pixel
        if (e) {
            //get RIGHT neighbour ( = e.col + 1, must be <matrix.cols)
            //ensure there exists a right neighbour. (we are not subtracting, because matrix.cols starts at 1, whereas e.col )
            if (e.col < matrix.cols - 1) {
                //check whether neighbour value has already been assigned
                const eR = matrix.elements.find(el => el.row === e.row && el.col === e.col + 1);
                if (eR) {
                    if (eR.dist == '') {
                        //this includes if the dist was already defined as being 0 because it is a white element (and already in the queue)
                        eR.dist = e.dist + 1;
                        queue.push(eR);
                    }
                }
            }
            //LEFT
            //( e.col-1, must be 0 <= e.col < matrix.cols-1)
            if (e.col > 0) {
                //check whether neighbour value has already been assigned
                const eL = matrix.elements.find(el => el.row === e.row && el.col === e.col + 1);
                if (eL) {
                    if (eL.dist == '') {
                        //this includes if the dist was already defined as being 0 because it is a white element (and already in the queue)
                        eL.dist = e.dist + 1;
                        queue.push(eL);
                    }
                }
            }
            //UP
            //( e.row+1, must be 0 <= e.row < matrix.rows-1)
            if (e.row > 0) {
                //check whether neighbour value has already been assigned
                const eU = matrix.elements.find(el => el.row === e.row && el.col === e.col + 1);
                if (eU) {
                    if (eU.dist == '') {
                        //this includes if the dist was already defined as being 0 because it is a white element (and already in the queue)
                        eU.dist = e.dist + 1;
                        queue.push(eU);
                    }
                }
            }
            //DOWN
            if (e.row < matrix.rows - 1) {
                //check whether neighbour value has already been assigned
                const eD = matrix.elements.find(el => el.row === e.row && el.col === e.col + 1);
                if (eD) {
                    if (eD.dist == '') {
                        //this includes if the dist was already defined as being 0 because it is a white element (and already in the queue)
                        eD.dist = e.dist + 1;
                        queue.push(eD);
                    }
                }
            }
            ///SHOULD WE RETURN SOMETHING:??
        }
    }
}
//i think this will print all of them on the same line somehow.
export function printOutput(matrix) {
    for (let i = 0; i < matrix.rows; i++) {
        const arr = "";
        for (let j = 0; j < matrix.cols; j++) {
            const r = matrix.elements.find(e => e.row == i && e.col == j);
            arr.concat(String(r === null || r === void 0 ? void 0 : r.dist));
            arr.concat(" ");
        }
        console.log(arr);
    }
}
;
//# sourceMappingURL=solve.js.map