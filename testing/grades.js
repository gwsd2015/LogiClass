function grade(solution, response){
    var numCorrect = 0;
    var size = 0;
    var i, j;

    //check sizes are same
    if(solution.length !== response.length){
	console.log("ERROR: getNumErrors: lengths of" + 
		    "|solution| and |response| are not equal");
	return;
    }
    
    for(i=0; i<solution.length; i++){
	//check sizes are same
	if(solution[i].length !== response[i].length){
	    console.log("ERROR: getNumErrors: lengths of" + 
			"|solution| and |response| are not equal");
	    return;
	}

	for(j=0; j<solution[i].length; j++){
	    size++;
	    if(solution[i][j] === response[i][j]){
		numCorrect++;
	    }
	}
    }

    return (numCorrect/size) * 100;
}
