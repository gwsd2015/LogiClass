function testCategory(n, o, t){
    var cat = category(n, o, t);
    var valid = true;
    var i;
    if(cat.name !== n){
	console.log("ERROR: category name incorrect");
	valid = false;
    }
    if(cat.options !== o){
	console.log("ERROR: optionsList incorrect");
	console.log(cat.optionsList);
	console.log(o);
	valid = false;
    }
    if(cat.type !== t){
	console.log("ERROR: type incorrect");
	valid = false;
    }
    if(cat.getNumOptions() !== o.length){
	console.log("ERROR: getNumOptions() incorrect");
	valid = false;
    }
    for(i=0; i<o.length; i++){
	if(cat.getOption(i) !== o[i]){
	    console.log("ERROR: getOption() incorrect");
	    valid = false;
	}
    }

    if(valid){
	console.log("category test: PASSED");
    }else{
	console.log("category test: FAILED");
    }
}

function testClue(t, o1, o2, d, cc){
    var testClue = clue(t, o1, o2, d, cc);
    var valid = true;
    if(testClue.type !== t){
	console.log("ERROR: type incorrect");
	valid = false;	
    }
    if(testClue.object1 !== o1){
	console.log("ERROR: object1 incorrect");
	valid = false;	
    }
    if(testClue.object2 !== o2){
	console.log("ERROR: object2 incorrect");
	valid = false;	
    }
    if(testClue.diff !== d){
	console.log("ERROR: diff incorrect");
	valid = false;	
    }
    if(testClue.compareCategory !== cc){
	console.log("ERROR: compareCategory incorrect");
	valid = false;	
    }
    if(t === "equivalence"){
	if(!testClue.isEquiv()){
	    console.log("ERROR: isEquiv() incorrect");
	    valid = false;
	}
	if(testClue.isInequiv()){
	    console.log("ERROR isInequiv() incorrect");
	    valid = false;
	}
	if(testClue.isCompare()){
	    console.log("ERROR: isCompare() incorrect");
	    valid = false;
	}
    }else if(t === "inequivalence"){
	if(testClue.isEquiv()){
	    console.log("ERROR: isEquiv() incorrect");
	    valid = false;
	}
	if(!testClue.isInequiv()){
	    console.log("ERROR isInequiv() incorrect");
	    valid = false;
	}
	if(testClue.isCompare()){
	    console.log("ERROR: isCompare() incorrect");
	    valid = false;
	}
    }else if(t === "comparative"){
	if(testClue.isEquiv()){
	    console.log("ERROR: isEquiv() incorrect");
	    valid = false;
	}
	if(testClue.isInequiv()){
	    console.log("ERROR isInequiv() incorrect");
	    valid = false;
	}
	if(!testClue.isCompare()){
	    console.log("ERROR: isCompare() incorrect");
	    valid = false;
	}
    }

    if(valid){
	console.log("clue test: PASSED");
    }else{
	console.log("clue test: FAILED");
    }
}

function testPuzzle(n, c, d, s, cr){
    var p = puzzle(n, c, d, s, cr);
    var valid = true;
    if(p.name !== n){
	console.log("ERROR: name incorrect");
	valid = false;	
    }
    if(p.categories !== c){
	console.log("ERROR: categories incorrect");
	valid = false;	
    }
    if(p.description !== d){
	console.log("ERROR: description incorrect");
	valid = false;	
    }
    if(p.solution !== s){
	console.log("ERROR: solution incorrect");
	valid = false;	
    }
    if(p.catRelationships !== cr){
	console.log("ERROR: catRelationships incorrect");
	valid = false;	
    }
    if(p.getNumCategories() !== c.length){
	console.log("ERROR: getNumCategories() incorrect");
	valid = false;	
    }
    if(p.getNumOptions() !== c[0].getNumOptions()){
	console.log("ERROR: getNumOptions incorrect");
	valid = false;	
    }
    for(i=0; i<c.length; i++){
	if(p.getCategory(i) !== c[i]){
	    console.log("ERROR getCategory incorrect");
	    valid = false;
	} 
    }
    for(i=0; i<c.length; i++){
	for(j=0; j<c.length; j++){
	    if(p.getCatRelationship(i, j) !== cr[i][j]){
		console.log("ERROR getCatRelationship incorrect");
		valid = false;
	    }
	}
    }

    if(valid){
	console.log("puzzle test: PASSED");
    }else{
	console.log("puzzle test: FAILED");
    }   
}

function factorial(n){
    if(n <= 1){
	return 1;
    }else{
	return n * factorial(n-1);
    }
}

function testPermuteSquare(numOptions){
    var list = permuteSquare(numOptions);
    var i, j;
    var valid = true;
    var totalPossibilities = factorial(numOptions);
    //check that there are enough possibilities
    if(list.length < totalPossibilities){
	console.log("ERROR not enough permutations");
	valid = false;
    }else if(list.length > totalPossibilities){
	console.log("ERROR too many permutations");
	valid = false;
    }else{
	//check for duplicates
	for(i=0; i<list.length; i++){
	    for(j=i+1; j<list.length; j++){
		//check if list[i] is the same grid as list[j]
		if(list[i] === list[j] && i !== j){
		    console.log("ERROR duplicate: list items " + i + " and " + j);
		    valid = false;
		}
	    }
	}
    }
    if(valid){
	console.log("permuteSquare test: PASSED for n=" + numOptions);
    }else{
	console.log("permuteSquare test: FAILED for n=" + numOptions);
    }
    
}

testCategory("ctest1", ["o1","o2","o3"], "noun");
testClue("equivalence", [0,1], [1,0], 0, 2);
testPuzzle("ptest1", [category("testing", ["a", "b", "c"], "verb")],
	  "hello", [true, false, false], ["is a"]);
testPermuteSquare(3);
testPermuteSquare(4);
testPermuteSquare(5);
testPermuteSquare(6);
