function main(){
    document.write("hello</br>");
    A = initGrid(3,8);
    printGrid(A);
    document.write(A instanceof Array);
}

main();