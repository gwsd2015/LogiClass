/*
 * Generate an English sentence for the given clue
 */
function getClueSentence(clue){

}

/*
 * This function will generate all of the possible POSITIVE DIRECT clues (for now...expand later) for a given puzzle
 */
function generateAllClues(puzzle){
    var cat1, cat2, opt1, opt2, optionsIndex;
    var categories = puzzle.categories;
    var allOptions = [];
    //get all options (list of lists)
    for(optionsIndex = 0; optionsIndex < categories.length; optionsIndex++){
	allOptions[optionsIndex] = categories[optionsIndex].options;
    }
    //loop through all combinations of options
    for(cat1 = 0; cat1 < allOptions.length; cat1++){
	for(opt1 = 0; opt1 < allOptions[cat1].length; opt1++){
	    //(cat1, opt1) are the ids for the first option to compare
	    for(cat2 = (cat1 + 1); cat2 < allOptions.length; cat2++){
		for(opt2 = 0; opt2 < allOptions[cat2].length; opt2++){
		    //(cat2, opt2) care the ids for the second option to compare
		    //check if they are related
		    if(isRelated([cat1,opt1],[cat2,opt2],puzzle)){
			document.write(generatePositiveDirectClue([cat1,opt1],cat2,puzzle) + "</br>");
		    }else{
//			document.write(cat1 + "." + opt1 + " and " 
//				       + cat2 + "." + opt2 + ": false</br>"); 
		    }
		}
	    }
	}
    }
}

/*
 * Generate a clue using the given option |option1| and category |category2|
 * The clue will be a description of a direct relationship between two options
 * i.e. "|option1| is related to |option2|
 * Find the option in |category2| that is related to |option1| and 
 * return a description of the relationship
 * @param option1ids: array, 1st entry=category id, 2nd entry = option id
 * @param category2id: number, id of category2 
 * @param puzzle: puzzle object
 */
function generatePositiveDirectClue(option1ids, category2id, puzzle){
    var i, curOption, option1, option2;
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

    //loop through options in category2 until |curOption| is related to option1
    for(i=0; i<category2.getNumOptions(); i++){
	curOption = category2.getOption(i);
	if(isRelated([category2id, i], option1ids, puzzle)){
	    break;
	}
    }
    //sanity checks
    category1 = puzzle.getCategory(option1ids[0]);
    option1 = category1.getOption(option1ids[1]);
    return "The " + option1 + " " + category1.name + " " + 
	puzzle.getCatRelationship(option1ids[0], category2id) + " " +
	curOption + " " + category2.name + ".";
}

/*
 * Generate a clue using the given option2 |option1| and |option2|
 * The clue will be a 
 * i.e. "|option1| is not related to |option2|
 * @param option1ids: array, 1st entry=category id, 2nd entry = option id
 * @param option2ids: array, 1st entry=category id, 2nd entry = option id
 * @param puzzle: puzzle object
 */
function generateNegativeDirectClue(option1ids, option2ids, puzzle){
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
    var category1id = option1ids[0];
    var option1id = option1ids[1];
    var category2id = option2ids[0];
    var option2id = option2ids[1];
    var category1 = puzzle.getCategory(category1id);
    var category2 = puzzle.getCategory(category2id);
    var option1 = category1.getOption(option1id);
    var option2 = category2.getOption(option2id);

    if(isRelated(option1ids, option2ids, puzzle)){
	return "The " + option1 + " " + category1.name + " " +
            puzzle.getCatRelationship(category1id, category2id) + " " +
            option2 + " " + category2.name + ".";
    }
}

function getClueList(puzzle){
    //get all solutions here, so we only have to do it once
    var allsols = getAllSolutions(puzzle.getNumCats, puzzle.getNumOpts);
    var clueList = [];
    var done = checkClueList(allsols, clueList, puzzle);
}

/*
 * @return: true iff the clueList is correct and unambiguous in puzzle context
 */
function checkClueList(allsols, clueList, puzz){
    var i, counter;

    //check for null
    
    //check arg types

    counter = 0;
    for(i=0; i<allsols.length; i++){
	puzz2 = puzzle(puzz.name, puzz.categories, puzz.description, 
		       allsols[i], puzz.catRelationships);
	if(!doClueListSolAgree(clueList, puzz2)){
	    //remove solution from list
//	    allsols.splice(i, 1);
	}else {
	    counter++;
	}
    }

    //the clue list in unamiguous iff allSols has exactly one element
//    if(allsols.length === 1){
    if(counter === 1){
	return true;
//    }else if(allsols.length > 1){
    }else if(counter > 1){
	return false;
    }else{
	//ERROR
    }
}

/*
 *
 */
function doClueListSolAgree(clueList, puzz){
    var i;

    //check for null

    //check arg types

    for(i=0; i<clueList.length; i++){
	if(!doClueSolAgree(clueList[i], puzz)){
	    return false;
	}
    }
    return true;
}

/*
 * Given a clue and a puzzle context, return true iff
 * the clue does not contradict the puzzle solution
 */
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
