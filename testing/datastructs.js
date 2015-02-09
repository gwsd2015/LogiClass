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
function category(name, optionsList, type){
//check that arguments are not null
    if(areReqdArgsNull(name, optionsList, type)){
	return;
    }

    //check argument types
    if(checkTypes({"arg":name, "expectType":"string"},
		  {"arg":optionsList, "expectType":Array},
		  {"arg":type, "expectType":"string"})){
	return;
    }

    return {
	"name": name,
	"options": optionsList,
	"type": type,

	getNumOptions: function(){
	    return optionsList.length;
	},
	getOption: function(index){
	    return optionsList[index];
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
    if(areReqdArgsNull(type, object1, object2, diff, compareCategory)){
	return;
    }
    if(checkTypes({"args": type, "expectType": "string"},
		  {"args": object1, "expectType": Array},
		  {"args": object2, "expectType": Array},
		  {"args": diff, "expectType": "number"},
		  {"args": compareCategory, "expectType": "number"})){
	return;
    }
    if(type === "equivalence"){
	diff = 0;
	if(object1[0] === object2[0]){
	    compareCategory = object1[0];
	}else {
	    //ERROR INVALID COMPARECATEGORY
	    //^^^^ does this make sense?
	}
    }else if(type === "inequivalence"){
	diff = undefined;
	compareCategory = undefined;
    }else if(type === "comparison"){
	if(diff === 0){
	    //ERROR INVALID DIFF
	}
    }else {
	//ERROR INVALID CLUE TYPE
    }
    return {
	"type": type,
	"object1": object1,
	"object2": object2,
	"diff": diff,
	"compareCategory": compareCategory,
//	"wordyClue": getClueSentence(this),
	isEquiv: function(){
	    return type === "equivalence";
	},
	isInequiv: function(){
	    return type === "inequivalence";
	},
	isCompare: function(){
	    return type === "comparative";
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

    return {
	"name": name,
	"categories": categories,
	"solution": solution,
	"clues": [],
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
