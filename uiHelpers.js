var solution;

function generateGrid(puzzle, isInput){
    var numCategories = puzzle.categories.length; 
    var numOptions = puzzle.categories[0].options.length;
    solution = JSONToSolution(puzzle.solution);
    var nameWidth = 100;
    var boxWidth = 80;
    var i=0, j=0, k=0, l=0;
    var html = "";

    //hide #cats & #opts in webpage for future use
    html += "<div hidden='true' id='numC' value='" + numCategories + "'></div>";
    html += "<div hidden='true' id='numO' value='" + numOptions + "'></div>";

    html += "<table cellspacing='0' cellpadding='0' border='0'>";
    html += "<tbody>";
    //top category and option names
    html += "<tr><td width='" + nameWidth*2 + "' height='" + nameWidth*2 + "'></td>";
    for(i=0; i<numCategories-1; i++){
        html += "<td>";
	html += "<table cellspacing='0' cellpadding='0' border='1'><tbody><tr>";
	//categories
	for(j=0; j<numOptions; j++){
	    html += "<td class='box' width='" + boxWidth + "' height='" + nameWidth + 
		"'>" + puzzle.categories[i].name + "</td>";
	}
	//	html += "<th class='box' height='" + nameWidth + "colspan'" + numOptions + "'>" + i + "</th>"
	html += "</tr><tr>";
	//options
	for(j=0; j<numOptions; j++){
	    //option
	    html += "<td class='box' width='" + boxWidth + "' height='" + nameWidth + 
		"'>" + puzzle.categories[i].options[j] + "</td>";
	}
	html += "</tr></tbody></table></td>";
    }
    html += "</tr>";
    //the rest of the blocks
    for(i=numCategories-1; i>0; i--){
	// i = catid for horizontal axis
	html += "<tr>";
	//side category and option names
	html += "<td><table cellspacing='0' cellpadding'0' border='1'><tbody>";
	for(j=0; j<numOptions; j++){
	    //category
	    html += "<tr><td class='box' width='" + nameWidth + "'height='" + 
		boxWidth + "'>" + puzzle.categories[i].name + "</td>";
	    //option
	    html += "<td class='box' width='" + nameWidth + "'height='" + 
		boxWidth + "'>" + puzzle.categories[i].options[j] + "</td></tr>";
        }
	html += "</tbody></table></td>";

	//blocks
	for(j=0; j<i; j++){
	    // j = catid for vertical axis
	    html += "<td><table cellspacing='0' cellpadding='0' border='1'><tbody>";
	    for(k=0; k<numOptions; k++){
		// k = optid for horizontal axis
	        html += "<tr>";
		for(l=0; l<numOptions; l++){
		    // l = optid for vertical axis
		    html += "<td class='box' width='" + boxWidth + "' height='" +
			boxWidth + "'>";
                    if(isInput){
			if(i === numCategories-1){
                            html += "<input type='radio' id='sol" + k + "." + (l + numOptions*j) + "'>";
			}else{
			    html += "<input type='radio'>";
			}
		    }else{
			//display solution to puzzle
			//TODO: fix retrieval of puzzle from database to convert from string to boolean
			//TODO: FIX BUG FOR SECOND (REDUNDANT) SET OF BLOCKS (displays |true| in !1 column
			if(isRelated([i,k], [j,l], solution, numCategories, numOptions) === "true"){
			    html += "true";
			}
			else{
			    html += "false";
			}
		    }
                    html += "</td>";
		}
		html += "</tr>";
	    }
	    html += "</tbody></table></td>";
	}
	html += "</tr>";
    }
    return html + "</tbody></table>";
}
