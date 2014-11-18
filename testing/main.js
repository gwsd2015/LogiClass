/*USED FOR TESTING JS FILES*/

function main(){
    A = initGrid(4,4);
    B = [[2,3],[4,5],[6,7],[8,9]];
    document.write(A.length + "</br>");
    printGrid(A);

    cat = createCategory("Name", ["Emma", "Bill", "Bob", "Ashley"], "noun");
    printCategory(cat);
  
    sol = [[true, false, false, false, true, false, false, true, false],
	   [false, true, false, true, false, false, false, false, true],
	   [false, false, true, false, false, true, true, false, false]];
    cat0 = createCategory("zero", ["red", "green", "blue"], "noun");
    cat1 = createCategory("one", ["apple","orange","grapefruit"], "noun");
    cat2 = createCategory("two", ["shirt", "shoes", "hat"], "noun");
    cat3 = createCategory("three", ["cookie", "cake", "pie"], "noun");
    puzz = initPuzzle("hi", [cat0, cat1, cat2, cat3], "", sol);

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
