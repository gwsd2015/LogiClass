
/* This method initializes the puzzle grid. All values are false.
 * @param c = number of categories
 * @param v = number of values in each category
 * This may be inefficient.  A graph could be better.
*/ 
function initGrid(c, v){
    //check that c & v are integers
    if((typeof c !== 'number') || (typeof v !== 'number')){
	document.write("INVALID ARGUMENT TYPES: initGrid requires two integers");
	return; //return undefined value
    }

    var A = [];
    
    /* each group of rows is the same length
     * the first group of rows has (c-1) * v columns
     * every group of rows that follows has v fewer columns than the previous group
     * the last group of rows has only v columns
     * every entry is initialized as false
     */
    for(i=0; i<c; i++){
	for(j=(i*v); j<((i+1)*v); j++){
	    A[j] = []
	    for(k=0; k<((c-(i+1))*v); k++){
		A[j][k] = false;
	    }
	}
    }

    return A;
}

function printGrid(A){
    for(i=0; i<A.length; i++){
        for(j=0; j<A[i].length; j++){
            document.write(A[i][j] + "|");
        }
        document.write("</br>");
    }
}

/*
 * Creates an object to store relationships
 * Object has two attributes: 
 *    1. String array containing names of all of the values
 *    2. Grid representing relationships between the values 
 * @param categories = number of categories (integer)
 * @param v = number of values per category (integer)
 * @param values = String Array of value names
 */
function initRelationships(c, v, values){
    var relationship = {
	"grid": initGrid(c,v),
	"valueNames": values  //indicies correspond to indicies in grid
    };
}

function main(){
    document.write("hello</br>");
    A = initGrid(5,5);
    printGrid(A);
}

main();
