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
    var cat1 = categories[clue.object1[0]];
    var cat2 = categories[clue.object2[0]];
    var opt1Name = cat1.options[clue.object1[1]];
    var opt2Name = cat2.options[clue.object2[1]];
    if(cat1.type === "noun"){
	if(cat2.type === "noun"){
	    return opt1Name + " " + 
		catRelationships[clue.object1[0]][clue.object2[0]] +
		" " + opt2Name + ".";
	}
	return opt1Name + " " + 
		catRelationships[clue.object1[0]][clue.object2[0]] +
		" " + opt2Name + " " + cat2.name + ".";
    }
    if(cat2.type === "noun"){
	return "The" + opt1Name + " " + cat1.name + " " + 
		catRelationships[clue.object1[0]][clue.object2[0]] +
		" " + opt2Name + ".";
    }
    return "The " + opt1Name + " " + cat1.name + " " +
	catRelationships[clue.object1[0]][clue.object2[0]] +
	" " + opt2Name + " " + cat2.name + ".";

    /*return  clue.type + ": " + clue.object1 + " and " + clue.object2 +
	" diff = " + clue.diff + " compareCat = " + clue.compareCategory;*/
}

function getInequivalenceSen(clue, categories, catRelationships){
    /*return  clue.type + ": " + clue.object1 + " and " + clue.object2 +
	" diff = " + clue.diff + " compareCat = " + clue.compareCategory;*/
    var cat1 = categories[clue.object1[0]];
    var cat2 = categories[clue.object2[0]];
    var opt1Name = cat1.options[clue.object1[1]];
    var opt2Name = cat2.options[clue.object2[1]];

    return "The " + opt1Name + " " + cat1.name + " " +
	catRelationships[clue.object1[0]][clue.object2[0]] +
	" not " + opt2Name + " " + cat2.name + ".";
}

function getComparisonSen(clue, categories, catRelationships){
  /*  return clue.type + ": " + clue.object1 + " and " + clue.object2 +
	" diff = " + clue.diff + " compareCat = " + clue.compareCategory;*/
    var cat1 = categories[clue.object1[0]];
    var cat2 = categories[clue.object2[0]];
    var opt1Name = cat1.options[clue.object1[1]];
    var opt2Name = cat2.options[clue.object2[1]];
    var compareCatName = categories[clue.compareCategory].name;

    if(clue.diff < 0){
	return "The " + compareCatName + " for the "+ opt1Name + " " + cat1.name + 
	    " is " + (clue.diff * -1) + " less than the " + compareCatName + 
	    " for " + opt2Name + " " + cat2.name + ".";
    }else{
	return "The " + compareCatName + " for the " + opt1Name + " " + cat1.name + 
	    " is " + clue.diff + " more than the " + compareCatName + 
	    " for " + opt2Name + " " + cat2.name + ".";
    }

}
