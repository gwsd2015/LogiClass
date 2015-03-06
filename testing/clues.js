function getClueList(solution, categories){
    if(areReqdArgsNull(solution, categories)){
	return;
    }
    if(checkTypes({"arg": solution, "expectType": Object},
		  {"arg": categories, "expectType": Array})){
	return;
    }

    //get all solutions here, so we only have to do it once
    var allsols = getAllSolutions(categories.length, categories[0].options.length);
    var clueList = [];
    var done = false;
    var MIN_CLUES = 4;

    var allClues = generateAllClues(solution, categories);
    //potential for optimization? :
/*    for(i=0; i<MIN_CLUES; i++){
	//generate random # btwn 0 & allClues.length
	var rand = Math.floor(Math.random() * allClues.length);
	//add clue to clueList
	clueList.push(allClues[rand]);
	//remove clue from allClues
	allClues.splice(rand, 1);
    }*/
    done = checkClueList(allsols, clueList, categories);
    while(!done){
	//generate random # btwn 0 & allClues.length
	var rand = Math.floor(Math.random() * allClues.length);
	//add clue to clueList
	clueList.push(allClues[rand]);
	//remove clue from allClues
	allClues.splice(rand, 1);
	done = checkClueList(allsols, clueList, categories);
    }
    return clueList;
}

function generateAllClues(solution, categories){
    if(areReqdArgsNull(solution, categories)){
	return;
    }
    if(checkTypes({"arg": solution, "expectType": Array},
		 {"arg": categories, "expectType": Array})){
	return;
    }

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
			diff = getDiff(option0, option1, i, solution, categories);
			list.push(clue("comparison", option0, option1, diff, i));
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
		    option0 = [catid0, optid0];
		    option1 = [catid1, optid1];
		    if(isRelated(option0, option1, solution, 
				 categories.length, categories[0].options.length)){
			list.push(clue("equivalence", option0, option1));
		    }else{ //otherwise, generate BOTH an equivalence clues and all comparison clues
			list.push(clue("inequivalence", option0, option1));
			//generate all potential comparison clues (for all comparable categories)
			for(i=0; i<categories.length; i++){
			    if(categories[i].isComparable()){
				diff = getDiff(option0, option1, i, solution, categories);
				list.push(clue("comparison", option0, option1, diff, i));
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
 * TODO: try to optimize by removing solutions that don't work
 */
function checkClueList(allsols, clueList, categories){
    //check for null
    if(areReqdArgsNull(allsols, clueList, categories)){
	return;
    }
    //check arg types
    if(checkTypes({"arg": allsols, "expectType": Array},
		  {"arg": clueList, "expectType": Array},
		  {"arg": categories, "expectType": Array})){
	return;
    }

    var i, counter = 0, allsols2 = [];
    for(i=0; i<allsols.length; i++){
	if(doClueListSolAgree(clueList, allsols[i], categories)){
	    counter++;
	    allsols2.push(allsols[i]);
	}
    }
    allsols = allsols2;
    //the clue list in unambiguous iff allSols has exactly one element
    if(counter === 1){
	return true;
    }else if(counter > 1){
	return false;
    }else{
	//ERROR
	console.log("ERROR checkClueList() counter is: " + counter);
    }
}

/*
 *
 */
function doClueListSolAgree(clueList, solution, categories){
    var i;

    //check for null
    if(areReqdArgsNull(clueList, solution, categories)){
	return;
    }
    //check arg types
    if(checkTypes({"arg": clueList, "expectType": Array},
		  {"arg": solution, "expectType": Array},
		  {"arg": categories, "expectType": Array})){
	return;
    }

    for(i=0; i<clueList.length; i++){
	if(!doClueSolAgree(clueList[i], solution, categories)){
	    return false;
	}
    }
    return true;
}

/*
 * Given a clue and a puzzle context, return true iff
 * the clue does not contradict the puzzle solution
 */
function doClueSolAgree(clue, solution, categories){
    //check for null
    if(areReqdArgsNull(clue, solution, categories)){
	return;
    }
    //check arg types
    if(checkTypes({"arg": clue, "expectType": Object},
		  {"arg": solution, "expectType": Array},
		  {"arg": categories, "expectType": Array})){
	return;
    }

    if(clue.isEquiv()){
	return isRelated(clue.object1, clue.object2, solution, 
			 categories.length, categories[0].options.length);
    }else if(clue.isInequiv()){
	return !isRelated(clue.object1, clue.object2, solution, 
			  categories.length, categories[0].options.length);
    }else if(clue.isCompare()){
	return clue.diff === getDiff(clue.object1, clue.object2, 
				     clue.compareCategory, solution, categories);
    }else{
	//ERROR
	console.log("ERROR: CLUE HAS INVALID TYPE IN doClueSolAgree()");
    }
}
