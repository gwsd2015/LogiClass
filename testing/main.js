/*USED FOR TESTING JS FILES*/

testClueList();

function testClueList(){
    catRels = [[0,"apartments are","apartments are"],["are in",1,"are"],["are in","are",2]];
    cat0 = category("Neighborhood", ["Angelus Oaks", "Capitola", "Delano", "Gilman"], "noun", false);
    cat1 = category("Rent", [750, 950, 1250, 1600], "number", true);
    cat2 = category("Square Feet", [1100, 1225, 1350, 1475], "number", true);
    cats = [cat0, cat1, cat2];
    sol = [[false, true, false, false, true, false, false, false],
	   [false, false, true, false, false, false, false, true],
	   [false, false, false, true, false, true, false, false],
	   [true, false, false, false, false, false, true, false]];

    var puzzle1 = puzzle("Rent", cats, "", sol, catRels);

    document.write("Category Definitions:</br>0th ");
    printCategory(cat0);
    document.write("1st ");
    printCategory(cat1);
    document.write("2nd ");
    printCategory(cat2);
    
    document.write("</br>Solution:</br>");
    printGrid(sol);

    document.write("</br></br>Clues:</br>");

   // var clues = getClueList(puzzle1.solution, puzzle1.categories);
    var clues = puzzle1.clues;
    for(i=0; i<clues.length; i++){
	document.write(clues[i].wordyClue + "</br>");
    }
}

function main(){  
    sol = [[true, false, false, false, true, false, false, true, false],
	   [false, true, false, true, false, false, false, false, true],
	   [false, false, true, false, false, true, true, false, false]];
    cat0 = category("person", ["Leila", "Martha", "Vanessa"], "noun", false);
    cat1 = category("house", ["blue","red","green"], "adjective", false);
    cat2 = category("position", [1,2,3], "sequence", true);
    cat3 = category("drink", ["milk", "orange juice", "tea"], "noun", false);
    catRelations = [[0,"lives in the","has a house in the","drinks"],
		    ["is owned by",0,"is in the","is owned by the person who drinks"],
		    ["is the position of the house owned by","is the position of the",0,"is the position of the house owned by the person who drinks"],
		    ["is drunk by","is drunk by the person who lives in the","is drunk by the person who lives in the house in the",0]];
    puzz = puzzle("Projects", [cat0, cat1, cat2, cat3], "", sol, catRelations);
    printGrid(sol);
    document.write("</br>");
    printCategory(cat0);
    printCategory(cat1);
    printCategory(cat2);
    printCategory(cat3);
    document.write("</br>");

//    document.write(generatePositiveDirectClue([0,2], 2, puzz) + "</br>");
//    document.write(generatePositiveDirectClue([3,2], 1, puzz) + "</br>");

    var list = generateAllClues(puzz);
    for(i=0; i<list.length; i++){
	document.write(list[i].toString() + "</br>");
    }

//    document.write(getRelatedOpt([0, 1], 0, puzz) + "</br>");
    document.write( "</br>Difference between Leila and green based on position is: " + getDiff([0,0], [1,2], 2, puzz) + "</br>");
    document.write( "</br>Difference between Martha and Vanessa based on position is: " + getDiff([0,1], [0,2], 2, puzz) + "</br>");

}

function printer(grid){
    for(z = 0; z<grid.length; z++){
	document.write(grid[z] + "</br>");
    }
}

function testAllSols(){
    /*var i=0;
      grid = [[0,0,0,1],[0,0,1,0],[0,1,0,0],[1,0,0,0]];
      printer(grid);
      list = shiftGridTimes(grid, grid.length);
      for(i=0; i<list.length; i++){
      document.write("shifted </br>");
      printer(list[i]);
      }
    */
    document.write("hello</br>");
    list = getAllSolutions(3,4);
    document.write("done1");
    /*for(i=0; i<list.length; i++){
      printer(list[i]);
      document.write("</br></br>")
      }*/
}
