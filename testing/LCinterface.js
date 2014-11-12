
/* This method initializes the puzzle grid. All values are false.
 * @param numCategories = number of categories
 * @param numOptions = number of options in each category
 * This may be inefficient.  A graph could be better.
*/ 
function initGrid(numCategories, numOptions){
    
    //check that arguments are not null
    if(areReqdArgsNull(numCategories, numOptions)){
	return;
    }

    //check that numCategories & numOptions are numbers
    if(checkTypes({"arg":numCategories, "expectType":"number"},
		  {"arg":numOptions, "expectType":"number"})){
	return; //return undefined value
    }

    var A = [];
    
    /* each group of rows is the same length
     * the first group of rows has (numCategories-1) * numOptions columns
     * every group of rows that follows has numOptions fewer columns than the previous group
     * the last group of rows has only numOptions columns
     * every entry is initialized as false
     */
    for(i=0; i<numCategories; i++){
	for(j=(i*numOptions); j<((i+1)*numOptions); j++){
	    A[j] = []
	    for(k=0; k<((numCategories-(i+1))*numOptions); k++){
		A[j][k] = false;
	    }
	}
    }

    return A;
}

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
            document.write(A[i][j] + "|");
        }
        document.write("</br>");
    }
}

/*
 * @param name = string
 * @param optionsList = array of options - contents should reflect type
 * @param type = string representing category type: 
         string            
   	     noun
	     verb
	     adjective
	 number
	     sequence
	     year
	     date
	     day
	     other
 */
function createCategory(name, optionsList, type){
    //check that arguments are not null
    if(areReqdArgsNull(name, optionsList, type)){
	return;
    }

    //check argument types
    if((typeof name !== "string") && !(optionsList instanceof Array) && (typeof type !== "string")){
	console.log("INVALID ARGUMENT TYPES for createCategory: name=string, optionsList=array");
	return;
    }

    var category = {
	"name": name,
	"options": options,
	"type": type
    };
    return category;
}


/*
 * Creates an object to store relationships
 * Object has two attributes: 
 *    1. String array containing names of all of the options
 *    2. Grid representing relationships between the options 
 * @param categories = number of categories (integer)
 */
function initRelationships(categories){
    //check that argument is not null
    if(areReqdArgsNull(categories)){
	return;
    }
    //type checking 
    if(!(categories instanceof Array)){
	console.log("INVALID ARGUMENT TYPES for categories=array");
        return;
    }
    var numCategories = categories.length;
    var numOptions = categories[0].options.length;

    var relationship = {
	"grid": initGrid(numCategories,numOptions),
	//TODO: IMPLEMENT GETTING OPTIONS FROM CATEGORIES
	"optionNames": []  //indicies correspond to indicies in grid
    };

    return relationship;
}

function initPuzzle(name, categories, description){
    //check arguments are not null
    if(areReqdArgsNull(name, categories, description)){
	return;
    }
    //type checking
    if((typeof name !== "string") && !(categories instanceof Array) && (typeof descripion !== "string")){
	console.log("INVALID ARGUMENT TYPES for initPuzzle: name=string, categories=array, description=string");
        return;
    }

    var puzzle = {
	"name": name,
	"categories": categories,
	"solution": initRelationships(categories),
	"clues": [],
	"description": description
    };
    return puzzle;
}

