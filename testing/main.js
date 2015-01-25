/*USED FOR TESTING JS FILES*/

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

//main();

function printer(grid){
    for(z = 0; z<grid.length; z++){
	document.write(grid[z] + "</br>");
    }
}
/*var i=0;
grid = [[0,0,0,1],[0,0,1,0],[0,1,0,0],[1,0,0,0]];
printer(grid);
list = shiftGridTimes(grid, grid.length);
for(i=0; i<list.length; i++){
    document.write("shifted </br>");
    printer(list[i]);
}
*/

list = permuteSquare(4);
//printer(list);
for(i=0; i<list.length; i++){
    printer(list[i]);
    document.write("</br></br>")
}
