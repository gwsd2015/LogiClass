<!DOCTYPE html>
<html>
<head>

    <title>Instructor</title>
    <link rel="stylesheet" type="text/css" href="http://w2ui.com/src/w2ui-1.4.2.min.css" />
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
    <script type="text/javascript" src="http://w2ui.com/src/w2ui-1.4.2.min.js"></script>
</head>
<body>

<div id="main" style="width: 100%; height: 1000px;"></div>
</br>
  <script src="../testing/error.js"></script>
  <script src="../testing/nlg.js"></script>
  <script src="../testing/datastructs.js"></script>
  <script src="../testing/print.js"></script>
  <script src="../testing/LCinterface.js"></script>
  <script src="../testing/clues.js"></script>
<script type="text/javascript">
var info;
var plainStyle = 'background-color: white; border: 1px solid silver; border-top: 0px; padding: 10px;';
var config = {
    layout: {
        name: 'layout',
	padding: 0,
	panels: [
                { type: 'left', size: 200, resizable: false},
		{ type: 'main', overflow: 'hidden', style: plainStyle}
        ]
    },
    layoutInner: {
        name: 'layoutInner',
        padding: 0,
        panels: [
                { type: 'main', resizable: false, style: plainStyle},
                { type: 'right', size: 500, resizable: false, style: plainStyle}
        ]
    },

    allPuzzles: {
        name: 'allPuzzles',
        url: 'data/list.json',
        show: {
            header: true,
            footer: true
        },
        style: 'padding: 0px',
        columns: [
            { field: 'name', caption: 'Name', size: '33%', sortable: true, searchable: true },
            { field: 'description', caption: 'Description', size: '33%', sortable: true, searchable: true },
        ],
        onClick: function(event){
            w2ui.layout.content('main', w2ui.layoutInner);
            w2ui.layoutInner.html('main', generateGrid())
            w2ui.layoutInner.content('right', 'right');
        }
    },
    sidebar: {
	name: 'sidebar',
	nodes: [ 
		{ id: 'general', text: 'General', group: true, expanded: true, nodes: [
			{ id: 'view', text: 'View Puzzles', img: 'icon-page' },
			{ id: 'create', text: 'Create Puzzles', img: 'icon-page' },
			{ id: 'assign', text: 'Assign Puzzles', img: 'icon-page' },
			{ id: 'grade', text: 'View Grades', img: 'icon-page' }
		   ]
                }
	],
	onClick: function (event) {
                    if ( event.target == "view" ){
                       w2ui.layout.html('main', w2ui.allPuzzles);                       
                    }
                    else if ( event.target == "create" ){
                       w2ui.layout.html('main', w2ui.createForm);
                    }
                    else if ( event.target == "assign" ){

                    }
                    else if ( event.target == "grade" ){

                    }
	}
    },
    createForm: {
        name: 'createForm',
        url: 'JSONHandler.php',
        fields: [
            { field: 'numCats', type: 'int', min: 3, max: 5, required: true, html: {caption: 'Number Categories'}},
            { field: 'numOpts', type: 'int', min: 3, max: 5, required: true, html: {caption: 'Number Options'}}
        ],
        actions: {
            'Save': function(event){
                console.log('save', event);
                this.save();
            },
            'Clear': function(event){
                this.clear;
            },
        }
    }
}

$(function () {
	// initialization
	$('#main').w2layout(config.layout);
        $().w2layout(config.layoutInner);
	$().w2grid(config.allPuzzles);
        $().w2form(config.createForm);
	w2ui.layout.content('left', $().w2sidebar(config.sidebar));
});

function generateGrid(){
    //document.write(info);
    var numOptions = 4;
    var numCategories = 4; 
    var nameWidth = 100;
    var boxWidth = 50;
    var i=0, j=0, k=0, l=0;
    var html = "<table cellspacing='0' cellpadding='0' border='0'>";
    html += "<tbody>";

    //top category and option names
    html += "<tr><td width='" + nameWidth*2 + "' height='" + nameWidth*2 + "'></td>";
    for(i=0; i<numCategories-1; i++){
        html += "<td>";
	html += "<table cellspacing='0' cellpadding='0' border='1'><tbody><tr>";
	//categories
	for(j=0; j<numOptions; j++){
	    html += "<td class='box' width='" + boxWidth + "' height='" + nameWidth + 
			"'>" + i + "</td>";
	}

//	html += "<th class='box' height='" + nameWidth + "colspan'" + numOptions + "'>" + i + "</th>"

	html += "</tr><tr>";
	//options
	for(j=0; j<numOptions; j++){
	    //option
	    html += "<td class='box' width='" + boxWidth + "' height='" + nameWidth + 
			"'>" + j + "</td>";
	}

	html += "</tr></tbody></table></td>";
    }
    html += "</tr>";

    //the rest of the blocks
    for(i=numCategories-1; i>0; i--){
	html += "<tr>";

	//side category and option names
	html += "<td><table cellspacing='0' cellpadding'0' border='1'><tbody>";
	for(j=0; j<numOptions; j++){
	    //category
	    html += "<tr><td class='box' width='" + nameWidth + "'height='" + 
		boxWidth + "'>" + i + "</td>";
	    //option
	    html += "<td class='box' width='" + nameWidth + "'height='" + 
		boxWidth + "'>" + j + "</td></tr>";
        }
	html += "</tbody></table></td>";
	//blocks
	for(j=0; j<i; j++){
	    html += "<td><table cellspacing='0' cellpadding='0' border='1'><tbody>";
	    for(k=0; k<numOptions; k++){
	        html += "<tr>";
		    for(l=0; l<numOptions; l++){
			html += "<td class='box' width='" + boxWidth + "' height='" +
				boxWidth + "'></td>";
		    }
		html += "</tr>";
	    }
	    html += "</tbody></table></td>";
	}
	html += "</tr>";
    }


    return html + "</tbody></table>";
}

function letsTryThis(){
    catRels = [[0,"apartments are","apartments are"],["apartments are in",1,"are"],["apartments are in","are",2]];
    cat0 = category("Neighborhood", ["Angelus Oaks", "Capitola", "Delano", "Gilman"], "noun", false);
    cat1 = category("Rent", [750, 950, 1250, 1600], "number", true);
    cat2 = category("Square Feet", [1100, 1225, 1350, 1475], "number", true);
    cats = [cat0, cat1, cat2];
    sol = [[false, true, false, false, true, false, false, false],
	   [false, false, true, false, false, false, false, true],
	   [false, false, false, true, false, true, false, false],
	   [true, false, false, false, false, false, true, false]];

    var puzzle1 = puzzle("Rent", cats, sol, catRels);

    $.post('JSONHandler.php', puzzle1, function(data){
	//show the response
	$('#response').html(data);
    }).fail(function() {
	alert("Posting failed");
    });
    return false;

}

</script>


</body>
</html>
