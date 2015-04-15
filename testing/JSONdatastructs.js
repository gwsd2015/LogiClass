/*
 * This file is used to convert the JavaScript datastructures into JSON-friendly ones
 * i.e. It copies only the fields (and not the methods) of the object into a new object
 */

function JSONPuzzle(puzzle){
    return {
	name: puzzle.name,
	categories: JSONCategories(puzzle.categories),
	solution: puzzle.solution,
	clues: JSONClues(puzzle.clues),
	description: puzzle.description,
	catRelationships: puzzle.catRelationships
    }
}

function JSONCategories(categories){
    var i;
    var list = [];
    for(i=0; i<categories.length; i++){
	list[i] = JSONCategory(categories[i]);
    }
    return list;
}

function JSONCategory(category){
    return {
	name: category.name,
	options: category.options,
	type: category.type,
	comparable: category.comparable
    }
}

function JSONClues(clues){
    var i;
    var list = [];
    for(i=0; i<clues.length; i++){
	list[i] = JSONClue(clues[i]);
    }
    return list;
}

function JSONClue(clue){
    return {
	type: clue.type,
	object1: clue.object1,
	object2: clue.object2,
	diff: clue.diff,
	compareCategory: clue.compareCategory,
	wordyClue: clue.wordyClue
    }
}
