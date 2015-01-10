
function doClueSolAgree(clue, solution){
    if(clue.isEquiv()){
	return isRelated(clue.object1, clue.object2);
    }else if(clue.isInequiv()){
	return !isRelated(clue.object1, clue.object2);
    }else if(clue.isCompare()){
	//do stuff
    }else{
	//ERROR
    }
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
