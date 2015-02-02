function doClueSolAgree(clue, puzzle){
    //check for null

    //check arg types

    if(clue.isEquiv()){
	return isRelated(clue.object1, clue.object2, puzzle);
    }else if(clue.isInequiv()){
	return !isRelated(clue.object1, clue.object2, puzzle);
    }else if(clue.isCompare()){
	return clue.diff === getDiff(clue.object1, clue.object2, 
				     clue.compareCategory, puzzle);
    }else{
	//ERROR
    }
}

/*
 * calculate the difference between two objects |option1| 
 * and |option2| using |compareCategory| and a puzzle context
 * @param option1ids: 2-entry array containing ids for |option1|
 * @param option2ids: 2-entry array containing ids for |option2|
 * @param compareCategory: number representing the id of the 
 *        category used for comparison
 * @param puzzle: puzzle object
 * @return: |option1| - |option2|
 */
function getDiff(option1ids, option2ids, compareCategory, puzzle){
    //check for null
    if(areReqdArgsNull(option1ids, option2ids, compareCategory, puzzle)){
	return;
    }
    //check arg types
    if(checkTypes({"arg": option1ids, "expectType": Array},
		  {"arg": option2ids, "expectType": Array},
		  {"arg": compareCategory, "expectType": "number"},
		  {"arg": puzzle, "expectType": Object})){
	
    }    
    
    //check that |compareCategory| is a comparable category

    var solution = puzzle.solution;
    var relatedOption1ids = getRelatedOpt(option1ids, compareCategory, puzzle);
    var relatedOption2ids = getRelatedOpt(option2ids, compareCategory, puzzle);
    var relatedOption1 = puzzle.getCategory(relatedOption1ids[0]).getOption(relatedOption1ids[1]);
    var relatedOption2 = puzzle.getCategory(relatedOption2ids[0]).getOption(relatedOption2ids[1]);
    if((typeof relatedOption1 !== "number") || (typeof relatedOption2 !== "number")){
	//ERROR
	console.log("ERROR getDiff: options provided are not numbers");
	return;
    }
    return relatedOption1 - relatedOption2;
}

/*
 * Given an object |option1| and a category |category2|, return
 * another object |option2| that is in |category2| and related to
 * |option1| in a particular context |puzzle|
 * @param option1ids: 2-entry array; 1st entry=category id; 2nd=option id
 * @param category2id: id of a category
 * @param puzzle: puzzle object 
 * @return: Array of ids representing |option2|
 */
function getRelatedOpt(option1ids, category2id, puzzle){
    var option2id, option1;
    var category2 = puzzle.getCategory(category2id);
    //check for null
    if(areReqdArgsNull(option1ids, category2id, puzzle)){
	return;
    }
    //sanity type checks
    if(checkTypes({"arg": option1ids, "expectType": Array},
		  {"arg": category2id, "expectType": "number"},
		  {"arg": puzzle, "expectType": Object})){
	return;
    }
    //case 1: |option1| belongs to |category2|
    if(option1ids[0] === category2id){
	return option1ids;
    }
    
    //case 2: |option1| does not belong to |category2|
    //loop through options in category2 until |curOption| is related to option1
    for(option2id=0; option2id<category2.getNumOptions(); option2id++){
	if(isRelated([category2id, option2id], option1ids, puzzle)){
	    break;
	}
    }
    //sanity checks
    return [category2id, option2id];
}

function getClueSentence(clue){

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
    //ERROR CONDITION: option1ids===option2ids --> true BUT redundant
    catid1 = option1ids[0];
    catid2 = option2ids[0];
    optid1 = option1ids[1];
    optid2 = option2ids[1];
    grid = puzzle.solution;
    var i, pivot;
//    document.write(" asjfweieo " + puzzle.getNumCategories + " " + puzzle.getNumOptions());
    //case 1: options are in the same category --> false
    if(catid1 === catid2)     return false;
    //case 2: catid1 is |numCategories|-1 --> directly compare option1 (rows) and option2 (cols) (recurssive call)
    if(catid1 === puzzle.getNumCategories() - 1){
	if(grid[optid1] === undefined) document.write("UNDEFINED: optid1 " + optid1);
	return grid[optid1][optid2 + catid2 * puzzle.getNumOptions()];
    }
    //case 3: catid2 is |numCategories|-1 --> switch the options (recurssive call)
    if(catid2 === puzzle.getNumCategories() - 1){
	return isRelated(option2ids, option1ids, puzzle);
    }
    //case 4: both option1 and option2 are represented by the columns of the grid
    //     --> find the option in category |numCategories|-1 s.t. it is related to option1 (call this |pivot|)
    //     --> compare |pivot| to option2 (recurssive call)
    for(i=0; i<puzzle.getNumOptions(); i++){
	opt1Column = optid1 + catid1 * puzzle.getNumOptions();
	if(grid[i][opt1Column]){
	    pivot = [puzzle.getNumCategories()-1, i];
	    return isRelated(pivot, option2ids, puzzle);
	}
    }
}

/**
 * Generates a list of all possible solutions for 
 * given numbers of categories and options
 * too slow for anything larger than:
 *     c=3 x o=6 (#possibilities = 518,400)
 *     c=4 x o=4 (#possibilities = 13,824)
 *     c=5..8 x o=3 (#possibilities = 7,776..1,679,616)
 */
function getAllSolutions(numCategories,numOptions){
    var allSquares = permuteSquare(numOptions);
    return getAllSolutions_recurssive(numCategories, allSquares, []);
}

function getAllSolutions_recurssive(c, allSquares, acc){
    var i;
    var list = [];
    var tmp = [];
    //stop at 2 because there are c-1 boxes
    if(c === 2){
	for(i=0; i<allSquares.length; i++){
	    tmp = horizConcat(acc, allSquares[i]);
	    list.push(tmp);
	}
    }else{
	for(i=0; i<allSquares.length; i++){
	    tmp = horizConcat(acc, allSquares[i]);
	    list = list.concat(getAllSolutions_recurssive(c-1, allSquares, tmp));
	}
    }

    return list;
}

function horizConcat(a1, a2){
    var tmp = [];
    if(a1.length === 0)  return a2;
    if(a2.length === 0) return a1;
    if(a1.length !== a2.length){
	return;
    }
    for(i=0; i<a1.length; i++){
	tmp[i] = a1[i].concat(a2[i]);
    }
    return tmp;
}

function permuteSquare(numOptions){
    var list = [];
    var grid = [];
    var i,j;
    //check for null
    //check param types

    //initialize grid (true on right-to-left diagonal)
    for(i=0; i<numOptions; i++){
	grid[i] = [];
	for(j=0; j<numOptions; j++){
	    if(j === (numOptions - i - 1)){
		grid[i][j] = 1;
	    }else{
		grid[i][j] = 0;
	    }
	}
    }

    //add original grid
    list.push(copy(grid));
    
    //first shift
    var x = shiftGridTimes(grid, numOptions-1);
    list = list.concat(x);
    list = list.concat(recurssiveSwaps(grid, numOptions));

    return list;
}

function recurssiveSwaps(grid, x){
    var i;
    var list = [];
    var n = grid.length;
    //check for null
    //check param types
    if(x === 1){
	for(i=2; i<n; i++){
	    list.push(copy(swapRows(grid,x,i)));
	    list = list.concat(shiftGridTimes(grid, grid.length-1));
	}

    }else{
	list = list.concat(recurssiveSwaps(grid, x-1));
	for(i=x+1; i<n; i++){
	    list.push(copy(swapRows(grid,x,i)));
	    list = list.concat(shiftGridTimes(grid, grid.length-1));
	    list = list.concat(recurssiveSwaps(grid, x-1));
	}
    }
    return list;
}

/*
 * Helper function for getAllSolutions
 * swaps given rows of grid
 */
function swapRows(grid, r1, r2){
    var tmp = [];
    //check for null
    //check param types
    
    tmp = grid[r1];
    grid[r1] = grid[r2];
    grid[r2] = tmp;
    return grid;
}

/*
 * Helper function for getAllSolutions
 * Shifts a square grid a number of times
 * Returns a list containing the state of the grid after each 
 * individual shift
 */
function shiftGridTimes(grid, times){
    var i;
    var list = [];
    //check for null
    //check param types  

    for(i=0; i<times; i++){
	//shift grid and add a copy to the list
	grid = shiftGridOnce(grid);
	list[i] = copy(grid);
    }
    return list;
}

/*
 * Helper function for shiftGridTimes
 * Shifts a grid one time
 */
function shiftGridOnce(grid){
    var i, row;
    var save = [];
    //check for null
    //check param types

    //save the first column of grid before shift
    for(i=0; i<grid.length; i++){
	save[i] = grid[i][0];
    }

    //shift each row and append saved column
    for(row=0; row<grid.length; row++){
	grid[row].shift();
	grid[row][grid.length-1] = save[row];
    }
    return grid;
}
