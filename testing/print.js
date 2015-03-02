/* This method is used to print the grid for debugging
 * @param A = 2 dimensional array (grid to be printed)
 */
function printGrid(A){
    //check A is not null
    if(areReqdArgsNull(A)){
        return;
    }
    for(i=0; i<A.length; i++){
        for(j=0; j<A[i].length; j++){
	    val = A[i][j];
	    if(val) document.write(A[i][j] + " |");
	    else document.write(A[i][j] + "|");
        }
        document.write("</br>");
    }
}

/*
 * This method is used to print a category for debugging
 * @param cat = category object
 */
function printCategory(cat){
    var i;
    //check that |cat| is not null
    if(areReqdArgsNull(cat)){
	return;
    }
    document.write("Category: name = " + cat.name + "; Options: [" +cat.options[0]);
    for(i=1; i<cat.options.length; i++){
	document.write(", " + cat.options[i]);
    }

    document.write("]; Type: " + cat.type + "</br>");
}
