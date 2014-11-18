
/* This method initializes the puzzle grid. All values are false.
 * @param numCategories = number of categories
 * @param numOptions = number of options in each category
 * This may be inefficient.  A graph could be better.
*/ 
function initGrid_whole(numCategories, numOptions){
    
    //check that arguments are not null
    if(areReqdArgsNull(numCategories, numOptions)){
	return;
    }

    //check that |numCategories| & |numOptions| are numbers
    if(checkTypes({"arg":numCategories, "expectType":"number"},
		  {"arg":numOptions, "expectType":"number"})){
	return; //return undefined value
    }

    var A = [];
    
    /* there are |numCategories| - 1 groups
     * each group of rows is the same length
     * the first group of rows has (|numCategories|-1) * |numOptions| columns
     * every group of rows that follows has |numOptions| fewer columns than the previous group
     * the last group of rows has only |numOptions| columns
     * every entry is initialized as false
     */
    for(group=0; group<numCategories-1; group++){
	for(row=(group*numOptions); row<((group+1)*numOptions); row++){
	    A[row] = [];
	    for(col=0; col<((numCategories-(group+1))*numOptions); col++){
		A[row][col] = false;
	    }
	}
    }

    return A;
}

/*
 * print only non-redundant part of grid
 * @param numCategories = number of categories in puzzle
 * @param numOptions = number of options per category
 */
function initGrid(numCategories, numOptions){
    //check for null
    if(areReqdArgsNull(numCategories, numOptions)){
	return;
    }
    if(checkTypes({"arg":numCategories, "expectType":"number"},
		  {"arg":numOptions, "expectType":"number"})){
	return;
    }
    //check input types
    grid = [];
    /*grid.length (i.e. number of rows) = numOptions*/
    for(row=0; row<numOptions; row++){
	grid[row] = [];
	//number of columns = numOptions*numCategories
	for(col=0; col<(numOptions*numCategories); col++){
	    grid[row][col] = false;
	}
    }
    
    return grid;
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
    if(checkTypes({"arg":name, "expectType":"string"},
		  {"arg":optionsList, "expectType":Array},
		  {"arg":type, "expectType":"string"})){
	return;
    }

    var category = {
	"name": name,
	"options": optionsList,
	"type": type
    };
    return category;
}

/*
 * method to get all options from a list of categories
 * return 2D array
 * ith entry in the array is the list of options for category i
 */
function getAllOptions(categories){
    var i;
    var optionList;
    //check that argument is not null
    if(areReqdArgsNull(categories)){
	return;
    }
    //type checking
    if(checkTypes({"args": categories, "expectType":Array})){
	return;
    }
    for(i=0; i<categories.length; i++){
	optionList = categories[i].options;
    }
    return optionList;
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
    if(checkTypes({"args":categories,"expectType":Array})){
        return;
    }
    var numCategories = categories.length;
    var numOptions = categories[0].options.length;

    var relationship = {
	"grid": initGrid(numCategories,numOptions),
	"optionNames": getAllOptions(categories)  //indicies correspond to indicies in grid
    };
    return relationship;
}

/*
 * Create the puzzle data structure
 * @param name = string representing name of the puzzle
 * @param categories = array of category options representing set of categories
 * @param description = string containing description of the puzzle
 * @param solution = 2D array representing solution to the puzzle
 */
function initPuzzle(name, categories, description, solution){
    //check arguments are not null
    if(areReqdArgsNull(name, categories, description, solution)){
	return;
    }
    //type checking
    if(checkTypes({"args":name,"expectType":"string"},
		  {"args":categories,"expectType":Array},
		  {"args":description,"expectType":"string"},
		  {"args":solution,"expectType":Array})){
	return;
    }

    var puzzle = {
	"name": name,
	"categories": categories,
	"solution": solution,
	"clues": [],
	"description": description
    };
    return puzzle;
}

/*
 * Given 2 options, return true iff they are related in the context of |puzzle|
 * @param option1ids = array representing category id (option1ids[0]) and option id(option1ids[1])
 * @param option2ids = array representing category id (option2ids[0]) and option id(option2ids[1])
 * @param puzzle = puzzle object
 * category with id=|numCategories-1| is represented by the rows of the puzzle grid
 */
function isRelated(option1ids, option2ids, puzzle){
    //check for null
    if(areReqdArgsNull(option1ids, option2ids, puzzle)){
	return;
    }
    //check types
    if(checkTypes({"arg": option1ids, "expectType": Array},
		  {"arg": option2ids, "expectType": Array},
		  {"arg": puzzle, "expectType": Object})){
	return;
    }
    //check option ids are valid in |puzzle| context
    
    catid1 = option1ids[0];
    catid2 = option2ids[0];
    optid1 = option1ids[1];
    optid2 = option2ids[1];
    numCategories = puzzle.categories.length;
    numOptions = puzzle.categories[0].options.length;
    grid = puzzle.solution;
    var i, pivot;

    //case 1: options are in the samem category --> false
    if(catid1 === catid2)     return false;
    //case 2: catid1 is |numCategories|-1 --> directly compare option1 (rows) and option2 (cols)
    if(catid1 === numCategories - 1){
	//DOES THIS WORK???????????
	return grid[optid1][optid2 + catid2 * numOptions];
    }
    //case 3: catid2 is |numCategories|-1 --> switch the options (recurssive call)
    if(catid2 === numCategories - 1){
	return isRelated(option2ids, option1ids, puzzle);
    }
    //case 4: both option1 and option2 are represented by the columns of the grid
    //     --> find the option in category |numCategories|-1 s.t. it is related to option1 (call this |pivot|)
    //     --> compare |pivot| to option2 (recurssive call)
    
    for(i=0; i<numOptions; i++){
	opt1Column = optid1 + catid1 * numOptions;
	if(grid[i][opt1Column]){
	    pivot = [numCategories-1, i];
	    return isRelated(pivot, option2ids, puzzle);
	}
    }
}

