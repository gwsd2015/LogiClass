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
    //sanity type checks

    //loop through options in category2 until |curOption| is related to option1
    for(i=0; i<category2.getNumOptions(); i++){
	curOption = category2.getOption(i);
	if(isRelated([category2id, curOption], option1ids, puzzle)){
	    break;
	}
    }
    //sanity checks
    category1 = puzzle.getCategory(option1ids[0]);
    option1 = category1.getOption(option1ids[1]);
    return option1 + " in " + category1.name + " is related to " + curOption + 
	" in " + category2.name + "</br>";
}
