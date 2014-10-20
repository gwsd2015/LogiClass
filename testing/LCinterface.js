
/* This method initializes the puzzle grid
 * @param c = number of categories
 * @param v = number of values in each category
*/ 
function initGrid(c, v){
    //check that c & v are integers
    if((typeof c !== 'number') || (typeof v !== 'number')){
	document.write("INVALID ARGUMENT TYPES: initGrid requires two integers");
	return; //return undefined value
    }
    //STUPID IMPLEMENTATION: CREATE 2D CxV ARRAY
    //TO DO: MAKE TRIANGULAR MATRIX
    var A = [];
    
    for(i=0; i<(c-1); i++){
	for(j=0; j<o; j++){
	    
	}
    }

    return A;
}

function main(){
    document.write("hello</br>");
    A = initGrid(3,3);
    document.write("[");
    for(i=0; i<A.length; i++){
	document.write("[");
	for(j=0; j<A[i].length; j++){
	    document.write(A[i][j] + ",");
	}
	document.write("],");
    }
    document.write("]");
}

main();
