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
	    if(areReqdArgsNull(clue)){
		return;
	    }
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
function puzzle(name, categories, solution, catRelationships, description){
    //check arguments are not null
    if(areReqdArgsNull(name, categories, solution, catRelationships)){
	return;
    }
    //type checking
    if(checkTypes({"args":name,"expectType":"string"},
		  {"args":categories,"expectType":Array},
		  {"args":solution,"expectType":Array},
		  {"args":catRelationships, "expectType":Array})){
	return;
    }
    if(description !== null && description !== undefined && 
       checkTypes({"args":description, "expectType":"string"})){
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

function clueToJSON(clue){
    var clueJSON = "{type: " + "'" + clue.type + "'" + 
	", object1: " + numListToJSON(clue.object1) +
	", object2: " + numListToJSON(clue.object2) + 
	", diff: " + clue.diff + 
	", compareCategory: " + clue.compareCategory +
	", wordyClue: " + "'" + clue.wordyClue + "'" + "}";

    return clueJSON;
}

function cluesToJSON(clues){
    var cluesJSON = "[";
    var i;
    for(i=0; i < clues.length - 1; i++){
	cluesJSON += clueToJSON(clues[i]) + ", ";
    }
    cluesJSON += clueToJSON(clues[i]) + "]";
    return cluesJSON;
}

function numListToJSON(list){
    var listJSON = "[";
    var i;
    for(i=0; i < list.length - 1; i++){
	listJSON += list[i] + ", ";
    }
    listJSON += list[i] + "]";
    return listJSON;
}

function strListToJSON(list){
    var listJSON = "[";
    var i;
    for(i=0; i < list.length - 1; i++){
	listJSON += "'" + list[i] + "', ";
    }
    listJSON += "'" + list[i] + "']";
    return listJSON;
}

function categoryToJSON(category){
    var catJSON = "{name: " + "'" + category.name + "'" + 
	", options: " +	strListToJSON(category.options) + 
	", type: " + "'" + category.type + "'" + 
	", comparable: " + category.comparable + "}";

    return catJSON;
}

function categoriesToJSON(categories){
    var catJSON = "[";
    var i;
    for(i=0; i < categories.length - 1; i++){
	catJSON += categoryToJSON(categories[i]) + ", ";
    }
    catJSON += categoryToJSON(categories[i]) + "]";
    return catJSON;
}

function solutionToJSON(solution){
    var solJSON = "[[";
    var i, j;
    for(i=0; i < solution.length - 1; i++){
	for(j=0; j < solution[i].length - 1; j++){
	    solJSON += solution[i][j] + ", ";
	}
	//DO LAST ENTRY
	solJSON += solution[i][j] + "], ["
    }
    //DO LAST ROW
    for(j=0; j < solution[i].length - 1; j++){
	solJSON += solution[i][j] + ", ";
    }
    //DO LAST ENTRY
    solJSON += solution[i][j] + "]]"

    return solJSON;
}

function puzzleToJSON(puzzle){
    var name = puzzle.name;
    var categories = puzzle.categories;
    var solution = puzzle.solution;
    var clues = puzzle.clues;
    var description = puzzle.description;

    var jsonString = "{name: " + "'" + puzzle.name + "'" + ", ";
    
    //add list of categories
    jsonString += "categories: " + categoriesToJSON(categories) + ", ";

    //add solution
    jsonString += "solution: " + solutionToJSON(solution) + ", ";

    //add list of clues
    jsonString += "clues: " + cluesToJSON(clues) + ", ";

    return jsonString + "description: " + "'" + description + "'" + "}";
}

function JSONToSolution(solution){
    var i, j;

    for(i=0; i<solution.length; i++){
	for(j=0; j<solution[i].length; j++){
	    if(solution[i][j] === "true") solution[i][j] = true;
	    else if(solution[i][j] === "false") solution[i][j] = false;
	}
    }
    return solution;
}
