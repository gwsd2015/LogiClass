/**
 * This file is responsible for converting from the 
 * clue datastructure to English sentences
 */

/*
 * Depending on the type of clue, this function passes the info
 * to the appropriate function to create the English sentence
 */
function getWordyClue(clue, categories, catRelationships){
    /*return type + ": " + object1 + " and " + object2 + 
	" diff = " + diff + " compareCat = " + compareCategory;*/
    //check arguments are not null
    if(areReqdArgsNull(clue, categories, catRelationships)){
	return;
    }
    //check types
    if(checkTypes({"arg": clue, "expectType": "Object"}, 
		  {"arg": categories, "expectType": Array}, 
		  {"arg": catRelationships, "expectType": Array})){
	return;
    }
    var clueSen;
    if(clue.type === "equivalence"){
	clueSen = getEquivalenceSen(clue, categories, catRelationships);
    }else if(clue.type === "inequivalence"){
	clueSen = getInequivalenceSen(clue, categories, catRelationships);
    }else if(clue.type === "comparison"){
	clueSen = getComparisonSen(clue, categories, catRelationships);
    }else{
	console.log("ERROR: Invalid clue type for getWordyClue");
	return;
    }
    return clueSen;
}


/**
 * This function generates a setence for equivalence clues
 * @param object1
 */
function getEquivalenceSen(clue, categories, catRelationships){
    





    return  clue.type + ": " + clue.object1 + " and " + clue.object2 +
	" diff = " + clue.diff + " compareCat = " + clue.compareCategory;
}

function getInequivalenceSen(clue, categories, catRelationships){
    return  clue.type + ": " + clue.object1 + " and " + clue.object2 +
	" diff = " + clue.diff + " compareCat = " + clue.compareCategory;
}

function getComparisonSen(clue, categories, catRelationships){
    return clue.type + ": " + clue.object1 + " and " + clue.object2 +
	" diff = " + clue.diff + " compareCat = " + clue.compareCategory;
}
