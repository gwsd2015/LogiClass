/*USED FOR TESTING JS FILES*/

function main(){
//    A = initGrid(4,4);
  //  B = [[2,3],[4,5],[6,7],[8,9]];
    //document.write(A.length + "</br>");
//    printGrid(A);

  //  cat = createCategory("Name", ["Emma", "Bill", "Bob", "Ashley"], "noun");
    //printCategory(cat);
  
    sol = [[true, false, false, false, true, false, false, true, false],
	   [false, true, false, true, false, false, false, false, true],
	   [false, false, true, false, false, true, true, false, false]];
    cat0 = createCategory("person", ["Leila", "Martha", "Vanessa"], "noun");
    cat1 = createCategory("house", ["blue","red","green"], "adjective");
    cat2 = createCategory("position", [1,2,3], "sequence");
    cat3 = createCategory("drink", ["milk", "orange juice", "tea"], "noun");
    catRelations = [[0,"lives in the","has a house in the","drinks"],
		    ["is owned by",0,"is in the","is owned by the person who drinks"],
		    ["is position of the house owned by","is the position of the",0,"is the position of the house owned by the person who drinks"],
		    ["is drunk by","is drunk by the person who lives in the","is drunk by the person who lives in the house in the",0]];
    puzz = initPuzzle("Projects", [cat0, cat1, cat2, cat3], "", sol, catRelations);
    printGrid(sol);
    document.write("</br>");
    printCategory(cat0);
    printCategory(cat1);
    printCategory(cat2);
    printCategory(cat3);
    document.write("</br>");

    //document.write((puzz instanceof Object) + "</br>");
  //  document.write("blah: " + isRelated([0,0],[1,2],puzz));
    document.write(generatePositiveDirectClue([0,2], 2, puzz) + "</br>");
    document.write(generatePositiveDirectClue([3,2], 1, puzz) + "</br>");

//    document.write(Object.getPrototypeOf(puzz) + "</br>");
   generateAllClues(puzz);
/*    for(firstCat=0; firstCat<4; firstCat++){
	for(firstOpt=0; firstOpt<3; firstOpt++){
	    for(secondCat=0; secondCat<4; secondCat++){
		for(secondOpt=0; secondOpt<3; secondOpt++){
		    document.write("[" + firstCat + ", " + firstOpt +
				   "] is related to [" + secondCat + ", " +
				   secondOpt + "]: " +
				   isRelated([firstCat,firstOpt],[secondCat,secondOpt],puzz) +
				   "</br>");
		}
	    }
	}
    }*/
}

main();
