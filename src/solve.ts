
import { whitePixelNotFoundError } from './errors';
import { TCMatrix } from './matrix';
import { Element } from './element';
/*
Breadth First Search (BFS) 
BFS is an algorithm for searching a tree data structure for a node that satisfies a given property. 
It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level.
Extra memory, usually a queue, is needed to keep track of the child nodes that were encountered but not yet explored.
*/


export function solution(matrix: TCMatrix)  {
    //Array.prototype.filter()
    //The filter() method creates a new array with all elements that pass the test implemented by the provided function.  
    const queue: Element[] = matrix.elements.filter(el => el.val === 1);

    if(queue.length==0){
        throw whitePixelNotFoundError();
    }

    while (queue.length !== 0){
        const e = queue.shift(); 
        if(e){ 
            //get RIGHT neighbour ( = e.col + 1, must be <matrix.cols)
            //ensure there exists a right neighbour. (we are not subtracting, because matrix.cols starts at 1, whereas e.col )
            if(e.col < matrix.cols-1){
                //check whether neighbour value has already been assigned
                const eR = matrix.elements.find(el => el.row === e.row && el.col === e.col+1 && el.val!==1);
                if(eR){
                    if(eR.dist==''){  
                        //this includes if the dist was already defined as being 0 because it is a white element (and already in the queue)
                        eR.dist = e.dist + 1;
                        queue.push(eR);
                    }
                }
            }

            //LEFT
            //( e.col-1, must be 0 <= e.col < matrix.cols-1)
            if(e.col > 0){
                //check whether neighbour value has already been assigned
                const eL = matrix.elements.find(el => el.row === e.row && el.col === e.col-1 && el.val!==1);
                if(eL){
                    if(eL.dist==''){  
                        //this includes if the dist was already defined as being 0 because it is a white element (and already in the queue)
                        eL.dist = e.dist + 1;
                        queue.push(eL); 
                    }
                }
            }

            //UP
            //( e.row+1, must be 0 <= e.row < matrix.rows-1)
            if(e.row>0){
                //check whether neighbour value has already been assigned
                const eU = matrix.elements.find(el => el.row === e.row+1 && el.col === e.col && el.val!==1);
                if(eU){
                    if(eU.dist==''){  
                        //this includes if the dist was already defined as being 0 because it is a white element (and already in the queue)
                        eU.dist = e.dist + 1;
                        queue.push(eU); 
                    }
                }
            }

            //DOWN
            if(e.row < matrix.rows-1){
                //check whether neighbour value has already been assigned
                const eD = matrix.elements.find(el => el.row === e.row-1 && el.col === e.col && el.val!==1);
                if(eD){
                    if(eD.dist==''){  
                        //this includes if the dist was already defined as being 0 because it is a white element (and already in the queue)
                        eD.dist = e.dist + 1;
                        queue.push(eD); 
                    }
                }
            }
        }
    }
    printOutput(matrix);
}


export function printOutput(matrix: TCMatrix) {
    
    for (let i = 0; i < matrix.rows; i++){
        const arr: string[] = [];
        for (let j = 0; j < matrix.cols; j++) {            
            const r = matrix.elements.find(e => e.row==i && e.col==j);            
            if(r){
                let d = String(r.dist);
                arr.push(d);
            }
        }
        const pr = arr.toString();
        if(pr.includes(',')){
            console.log(pr.split(',').join(' '));
        }
        else{
            console.log(pr);
        }
    }
};


