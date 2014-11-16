/*USED FOR TESTING JS FILES*/

function main(){
    A = initGrid(3,5);
    B = [[2,3],[4,5],[6,7],[8,9]];
    document.write(A.length + "</br>");
    printGrid(A);

    cat = createCategory("Name", ["Emma", "Bill", "Bob", "Ashley"], "noun");
    printCategory(cat);
    
}

main();
