/*USED FOR TESTING JS FILES*/

//testClueList();

function testClueList(){
    catRels = []; //not necessary, for now
    cat0 = category("Neighborhoods", ["Angelus Oaks", "Capitola", "Delano", "Gilman"], "noun");
    cat1 = category("Rents", [750, 950, 1250, 1600], "number");
    cat2 = category("Square Footage", [1100, 1225, 1350, 1475], "number");
    cats = [cat0, cat1, cat2];
    sol = [[false, true, false, false, true, false, false, false],
	   [false, false, true, false, false, false, false, true],
	   [false, false, false, true, false, true, false, false],
	   [true, false, false, false, false, false, true, false]];

    sol2 = [[true, false, false, false, true, false, false, false],
	   [false, true, false, false, false, true, false, false],
	   [false, false, true, false, false, false, true, false],
	   [false, false, false, true, false, false, false, true]];

    puzzle1 = puzzle("Rent", cats, "", sol, catRels);
    puzzle2 = puzzle("Rent", cats, "", sol2, catRels);

    //Angelus Oaks - 950/mo = 125 on square footage
    clue0 = clue("comparative", [0,0], [1,1], 125, 2);
    //950/mo != Delano
    clue1 = clue("inequivalence", [1,1], [0,2], 0, -1);
    //950/mo != Capitola
    clue2 = clue("inequivalence", [1,1], [0,1], 0, -1);
    //Delano == 1225 sqft
    clue3 = clue("equivalence", [0,2], [2,1], 0, -1);
    //950/mo - 750/mo = 250 on square footage
    clue4 = clue("comparative", [1,1], [1,0], 250, 2);
    //1225 sq ft == 1600/mo
    clue5 = clue("equivalence", [2,1], [1,3], 0, -1);
    clueList = [clue0, clue1, clue2, clue3, clue4, clue5];

    sols = getAllSolutions(puzzle1.getNumCategories(), puzzle1.getNumOptions());
    for(i=0; i<sols.length; i++){
	puzz = puzzle("Rent", cats, "", sols[i], catRels);
	document.write(doClueListSolAgree(clueList, puzz) + "</br>");
    }
    //document.write(doClueListSolAgree(clueList, puzzle1) + "</br>");
//    document.write(doClueListSolAgree(clueList, puzzle2) + "</br>");
}


function main(){  
    sol = [[true, false, false, false, true, false, false, true, false],
	   [false, true, false, true, false, false, false, false, true],
	   [false, false, true, false, false, true, true, false, false]];
    cat0 = category("person", ["Leila", "Martha", "Vanessa"], "noun");
    cat1 = category("house", ["blue","red","green"], "adjective");
    cat2 = category("position", [1,2,3], "sequence");
    cat3 = category("drink", ["milk", "orange juice", "tea"], "noun");
    catRelations = [[0,"lives in the","has a house in the","drinks"],
		    ["is owned by",0,"is in the","is owned by the person who drinks"],
		    ["is position of the house owned by","is the position of the",0,"is the position of the house owned by the person who drinks"],
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

   generateAllClues(puzz);

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
