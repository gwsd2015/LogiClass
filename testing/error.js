/*
 * method to tell whether a variable is a valid LogiClass 'type'
 */
function isValidType(type){
    var numericalTypes = ["sequence", "day", "month", "year", "date", "other"];
    var stringTypes = ["noun", "verb", "adjective"];
    var i;
    var j;

    //check that 'type' has type 'string'
    if(typeof type !== "string"){
	return false;
    }

    for(i=0; i<numericalTypes.length; i++){
	if(numericalTypes[i] === type){
	    return true;
	}
    }
    for(j=0; j<stringTypes.length; j++){
	if(stringTypes[j] === type){
	    return true;
	}
    }
    return false;
}

/*
 * method to check whether arguments are null
 * if any are null log error message and return true
 * This method is used to report an error if a funcion is 
 * passed any null arguments.
 */
function areReqdArgsNull(){
    var i;
    var callingFunc = arguments.callee.caller.name;
    var ret = false;
    var errorMsg = "ERROR - NULL ARGUMENT(s) for " + callingFunc + 
	" Argument numbers: ";

    for(i=0; i<arguments.length; i++){
	if(arguments[i] === null){
	    errorMsg = errorMsg + i + "  ";
	    ret = true;
	}
    }
    if(ret){
	console.log(errorMsg);
    }
    return ret;
}

/*
 * method to check whether something is of the expected type
 * This method is used to check the types of arguments for a function.
 * It will return true and report an error iff any of the arguments do not 
 * have the expected type.
 */
function checkTypes(){
    var i;
    var ret = false;
    var callingFunc = arguments.callee.caller.name;
    var errorMsg = "ERROR - INVALID ARGUMENT TYPES for " + callingFunc + ": ";
    var arg;
    var expectType;
    for(i=0; i<arguments.length; i++){
	//check that |arguments[i]| is an object w/ fields |arg| and |expectType|
	if((typeof arguments[i] === "Object") && 
	   (arguments[i].hasOwnProperty("arg")) && 
	   (arguments[i].hasOwnProperty("expectType"))){
	    arg = arguments[i].arg;
	    expectType = arguments[i].expectType;

	    if(typeof arg !== expectType){
		errorMsg = errorMsg + " argument #" + i + " should be " + 
		    expectType;
		ret = true;
	    }
	}
    }
    if(ret){
	console.log(errorMsg);
    }
    return ret;
}
