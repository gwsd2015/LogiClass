function getClueList(puzzle){
    //get all solutions here, so we only have to do it once
    var allsols = getAllSolutions(puzzle.getNumCats, puzzle.getNumOpts);
    var clueList = [];
    var done = checkClueList(allsols, clueList, puzzle);
}

function generateAllClues(puzzle){
    var categories = puzzle.categories;
    var catid0, optid0, catid1, optid1;
    var catid, i, diff;
    var list = [];
    //all combinations in same category
    for(catid=0; catid<categories.length; catid++){
	var options = categories[catid].options;
	for(optid0=0; optid0<options.length; optid0++){
	    for(optid1=optid0+1; optid1<options.length; optid1++){
		for(i=0; i<categories.length; i++){
		    if(categories[i].isComparable() && i !== catid){
			option0 = [catid, optid0];
			option1 = [catid, optid1];
			diff = getDiff(option0, option1, i, puzzle);
			list.push(clue("comparison", option0, option1, diff, i));
			//document.write("Compare (" + catid + "," + optid0 + ") and (" + catid + "," + optid1 + ") on " + i + "</br>");
		    }
		}
	    }
	}
    }
    
    //loop through all remianing combinations of options in puzzle
    for(catid0 = 0; catid0 < categories.length; catid0++){
	var options0 = categories[catid0].options;
	for(catid1 = catid0+1; catid1 < categories.length; catid1++){
	    var options1 = categories[catid1].options;
	    for(optid0 = 0; optid0 < options0.length; optid0++){
		for(optid1 = 0; optid1 < options1.length; optid1++){
		    //if the two items are related, generate an equivalence clue
		    if(isRelated([catid0,optid0],[catid1,optid1],puzzle)){
			list.push(clue("equivalence", option0, option1));
/*			document.write("Equiv (" + catid0 + "," + optid0 + 
				       ") and (" + catid1 + "," + optid1 + ")</br>");*/
		    }else{ //otherwise, generate BOTH an equivalence clues and all comparison clues
			list.push(clue("inequivalence", option0, option1));
/*			document.write("Inequiv (" + catid0 + "," + optid0 + 
				       ") and (" + catid1 + "," + optid1 + ")</br>");*/
			//generate all potential comparison clues (for all comparable categories)
			for(i=0; i<categories.length; i++){
			    if(categories[i].isComparable()){
				diff = getDiff(option0, option1, i, puzzle);
				list.push(clue("comparison", option0, option1, diff, i));
/*				document.write("Compare (" + catid0 + "," + optid0 + ") and (" + 
					       catid1 + "," + optid1 + ") on " + i + "</br>");*/
			    }
			}
		    }
		}
	    }
	}
    }
    return list;
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
