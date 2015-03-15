/**
 * This file contains the necessary data structures for LogiClass
 */


/*
 * This function is used to deep copy ANY array
 * @param grid = array to be copied
 * @return = reference to new array
 */
function copy(grid){
    var newGrid = [];
    for(i=0; i<grid.length; i++){
	newGrid[i] = [];
	for(j=0; j<grid[i].length; j++){
	    newGrid[i][j] = grid[i][j];
	}
    }
    return newGrid;
}

/*
 * @param name = string
 * @param optionsList = array of options (strings or numbers) - contents should reflect |type|
 * @param type = string representing category type: 
         string            
   	     noun
	     verb
	     adjective
	 number
	     sequence
	     year
	     date
	     day
	     other
 */
function category(name, optionsList, type, comparable){
//check that arguments are not null
    if(areReqdArgsNull(name, optionsList, type, comparable)){
	return;
    }

    //check argument types
    if(checkTypes({"arg":name, "expectType":"string"},
		  {"arg":optionsList, "expectType":Array},
		  {"arg":type, "expectType":"string"},
		  {"arg":comparable, "expectType": "boolean"})){
	return;
    }
    //sanity check
    if(type !== "number" && type !== "date" && type !== "month" &&
       type !== "position" && type !== "day" && type !== "year" &&
       type !== "sequence"){
	comparable = false;
    }

    return {
	"name": name,
	"options": optionsList,
	"type": type,
	"comparable": comparable,

	getNumOptions: function(){
	    return optionsList.length;
	},
	getOption: function(index){
	    return optionsList[index];
	},
	isComparable: function(){
	    return comparable;
	}
    };
}

/*
 * @param type: string describing the type of clue ('equivalence' || 'inequivalence' || 'comparative')
 * @param object1: array containing ids of object1 (object1[0] = cat id, object1[1] = opt id)
 * @param object2: array containing ids of object2
 * @param diff: number representing |object1| - |object2| (0 for equiv, undefined for inequiv, nonzero for compare)
 * @param compareCategory: id (number) of category used to make comparison (and calculate diff) (undefined for inequiv)
 */
function clue(type, object1, object2, diff, compareCategory){
    //sanity checks
    if(areReqdArgsNull(type, object1, object2)){
	return;
    }
    if(checkTypes({"args": type, "expectType": "string"},
		  {"args": object1, "expectType": Array},
		  {"args": object2, "expectType": Array})){
	return;
    }
    if(diff !== undefined && checkTypes({"args": diff, "expectType": "number"})){
	return;
    }
    if(compareCategory !== undefined && checkTypes({"args": compareCategory, "expectType": "number"})){
	return;
    }
    if(type !== "equivalence" && type !== "inequivalence" && type !== "comparison"){
	console.log("ERROR: Invalid clue type given to function clue()");
	return;
    }
    if(type === "comparison"){
	if(diff === 0){
	    console.log("ERROR: Invalid diff given to function clue()");
	    return;
	}
    }else{
	diff = undefined;
	compareCategory = undefined;
    }

    return {
	"type": type,
	"object1": object1,
	"object2": object2,
	"diff": diff,
	"compareCategory": compareCategory,
	"wordyClue": "",
	isEquiv: function(){
	    return type === "equivalence";
	},
	isInequiv: function(){
	    return type === "inequivalence";
	},
	isCompare: function(){
	    return type === "comparison";
	},
	isEqual: function(clue){
	    return ((object1 === clue.object1 && object2 === clue.object2) || 
		    (object1 === clue.object2 && object2 === clue.object1));
	}
    }
}


/*
 * Create the puzzle data structure
 * @param name = string representing name of the puzzle
 * @param categories = array of category options representing set of categories
 * @param description = string containing description of the puzzle
 * @param solution = 2D array representing solution to the puzzle
 */
function puzzle(name, categories, description, solution, catRelationships){
    //check arguments are not null
    if(areReqdArgsNull(name, categories, description, solution, catRelationships)){
	return;
    }
    //type checking
    if(checkTypes({"args":name,"expectType":"string"},
		  {"args":categories,"expectType":Array},
		  {"args":description,"expectType":"string"},
		  {"args":solution,"expectType":Array},
		  {"args":catRelationships, "expectType":Array})){
	return;
    }

    var clueList = getClueList(solution, categories);
    var i;
    var clueSens = [];
    for(i=0; i<clueList.length; i++){
	clueList[i].wordyClue = getWordyClue(clueList[i], categories, catRelationships);
    }

    return {
	"name": name,
	"categories": categories,
	"solution": solution,
	"clues": clueList,
	"description": description,
	"catRelationships": catRelationships,

	getNumCategories: function(){
	    return categories.length;
	},
	getNumOptions: function(){
	    return categories[0].getNumOptions();
	},
	getCategory: function(index){
	    return categories[index];
	},
	getCatRelationship: function(cat1, cat2){
	    return catRelationships[cat1][cat2];
	}
    };
}

