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

function generateNounPhrase(isAtStart, isProperNoun, noun, adjective, infNumAdj){
    var str = "";
    if(isAtStart && !isProperNoun){
	str += "The ";
    }
    if(!isAtStart && !isProperNoun){
	str += " the ";
    }
    str += adjective;
    if(infNumAdj && adjective !== ""){
	if(adjective == 1){
	    str += "st";
	}else if(adjective == 2){
	    str += "nd";
	}else if(adjective == 3){
	    str += "rd";
	}else{
	    str += "th";
	}
    }
    return str + " " + noun;
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
    var str = "";

    var nounPhrase1, nounPhrase2;
    if(cat1.type === "noun"){
	nounPhrase1 = generateNounPhrase(true, true, opt1Name, "", false);
    }else if(cat1.type === "sequence"){
	nounPhrase1 = generateNounPhrase(true, false, cat1.name, opt1Name, true);
    }else{
	nounPhrase1 = generateNounPhrase(true, false, cat1.name, opt1Name, false);
    }

    if(cat2.type === "noun"){
	nounPhrase2 = generateNounPhrase(false, true, opt2Name, "", false);
    }else if(cat2.type === "sequence"){
	nounPhrase2 = generateNounPhrase(false, false, cat2.name, opt2Name, true);
    }else{
	nounPhrase2 = generateNounPhrase(false, false, cat2.name, opt2Name, false);
    }

    return nounPhrase1 + " " + catRelationships[clue.object1[0]][clue.object2[0]] +
	" " + nounPhrase2 + ".";
}

function negatePhrase(phrase){
    var sA, verb;
    if(phrase.indexOf("is") !== -1) {
	sA = phrase.split("is");
	verb = "is";
    }else{
	return phrase + " not";
    }

    return sA[0] + " " + verb + " not " + sA[1];
}

function getInequivalenceSen(clue, categories, catRelationships){
    /*return  clue.type + ": " + clue.object1 + " and " + clue.object2 +
	" diff = " + clue.diff + " compareCat = " + clue.compareCategory;*/
    var cat1 = categories[clue.object1[0]];
    var cat2 = categories[clue.object2[0]];
    var opt1Name = cat1.options[clue.object1[1]];
    var opt2Name = cat2.options[clue.object2[1]];

    var nounPhrase1, nounPhrase2;
    if(cat1.type === "noun"){
	nounPhrase1 = generateNounPhrase(true, true, opt1Name, "", false);
    }else if(cat1.type === "sequence"){
	nounPhrase1 = generateNounPhrase(true, false, cat1.name, opt1Name, true);
    }else{
	nounPhrase1 = generateNounPhrase(true, false, cat1.name, opt1Name, false);
    }

    if(cat2.type === "noun"){
	nounPhrase2 = generateNounPhrase(false, true, opt2Name, "", false);
    }else if(cat2.type === "sequence"){
	nounPhrase2 = generateNounPhrase(false, false, cat2.name, opt2Name, true);
    }else{
	nounPhrase2 = generateNounPhrase(false, false, cat2.name, opt2Name, false);
    }

    return nounPhrase1 + " " + negatePhrase(catRelationships[clue.object1[0]][clue.object2[0]]) +
	nounPhrase2 + ".";

/*    return nounPhrase1 + " " + catRelationships[clue.object1[0]][clue.object2[0]] +
	" not " + nounPhrase2 + ".";*/
}

function getComparisonSen(clue, categories, catRelationships){
/*    return clue.type + ": " + clue.object1 + " and " + clue.object2 +
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
