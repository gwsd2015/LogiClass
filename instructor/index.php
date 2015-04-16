<!DOCTYPE html>
<html>
<head>
    <style>
      .vertical-text {
	transform: rotate(90deg);
	transform-origin: left top 0;
      }
    </style>
    <title>Instructor</title>
    <link rel="stylesheet" type="text/css" href="http://w2ui.com/src/w2ui-1.4.2.min.css" />
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
    <script type="text/javascript" src="http://w2ui.com/src/w2ui-1.4.2.min.js"></script>
</head>
<body>
<?php

    $servername = "localhost";
    $username = "logiclass";
    $password = "logiclasspwd";
    $dbname = "logiclass";
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname)
    	    or die('Error connecting to MySQL server.');
	    
    mysqli_select_db("logiclass", $conn);
	    
    //get all puzzles
    $result = mysqli_query($conn, "SELECT PuzzleData FROM Puzzles;")
           or die('Error with sql query. ' . mysqli_error($conn));
    //store all puzzles in array 
    $arr = array();
    $i=0;

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $arr[$i] = $row["PuzzleData"];
            $i = $i +1;
        }
    } 

    //get 'Assigned' value of all puzzles
    $result = mysqli_query($conn, "SELECT Assigned FROM Puzzles;")
           or die('Error with sql query. ' . mysqli_error($conn));
    //store all puzzles in array 
    $assignArr = array();
    $i=0;

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $assignArr[$i] = $row["Assigned"];
            $i = $i +1;
        }
    } 
?>


<div id="main" style="width: 100%; height: 1600px;"></div>
</br>
  <script src="../testing/error.js"></script>
  <script src="../testing/nlg.js"></script>
  <script src="../testing/datastructs.js"></script>
  <script src="../testing/print.js"></script>
  <script src="../testing/LCinterface.js"></script>
  <script src="../testing/clues.js"></script>
  <script src="../testing/JSONdatastructs.js"></script>
<script type="text/javascript">
var numC, numO, puzzName, categories, catRels, description, puzz;
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
                { type: 'main', resizable: true, style: plainStyle},
                { type: 'right', size: 500, resizable: true, style: plainStyle}
        ]
    },

    allPuzzles: {
        name: 'allPuzzles',
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
            var puzzle = this.get(event.recid);
            w2ui.layoutInner.html('main', generateGrid(puzzle));
            var i, html = "<ol>";
            for(i=0; i<puzzle.clues.length; i++){
                html += "<li>" + puzzle.clues[i].wordyClue + "</li>";
            }
            html += "</ol>";
            w2ui.layoutInner.content('right', html);
        }
    },

    assignPuzzles: {
        name: 'assignPuzzles',
        show: {
            header: true,
            footer: true
        },
        style: 'padding: 0px',
        columns: [
            { field: 'name', caption: 'Name', size: '33%', sortable: true, searchable: true },
            { field: 'description', caption: 'Description', size: '33%', sortable: true, searchable: true },
            { field: 'assigned', caption: 'Assigned?', size: '33%', sortable: false, searchable: false },
        ],
        onClick: function(event){
            
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
                       w2ui.layout.html('main', createForm1());
                       $('input[type=list]').w2field('list', { items: ['3','4','5'] });
                    }
                    else if ( event.target == "assign" ){
                        w2ui.layout.html('main', w2ui.assignPuzzles);
                    }
                    else if ( event.target == "grade" ){

                    }
	}
    }
}

$(function () {
	// initialization
	$('#main').w2layout(config.layout);
        $().w2layout(config.layoutInner);
	$().w2grid(config.allPuzzles);
        $().w2grid(config.assignPuzzles);

        //add records to grid
        var numRecordsAll = w2ui['allPuzzles'].records.length; 
        var numRecordsAssi = w2ui['assignPuzzles'].records.length;
        var puzzles = <?php print json_encode($arr); ?>;
        var assigned = <?php print json_encode($assignArr); ?>;
        var i;
        for(i=0; i<puzzles.length; i++){
	    var entry = JSON.parse(puzzles[i]);
            entry.recid = numRecordsAll + i + 1;
            w2ui['allPuzzles'].add(entry);
            entry.recid = numRecordsAssi + i + 1;
            if(JSON.parse(assigned[i]) === 1) entry.assigned = 'true';
            else entry.assigned = 'false';
            
            w2ui['assignPuzzles'].add(entry);
        }

	w2ui.layout.content('left', $().w2sidebar(config.sidebar));
});

function generateGrid(){
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

function createForm1(){
    return    "Number of Categories:" +
              "<select id='numCats'><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select>" +
              "</br>Number of Opts:" +
              "<select id='numOpts'><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select>" +
              "</br><button onclick='createForm2()'>Next</button>";
}

function createForm2(){
    numC = document.getElementById('numCats').value;
    numO = document.getElementById('numOpts').value;
    var i, j;
    var html = "Puzzle Name: <input id='puzzName' type='text'></br>Description: " + 
        "<input id='puzzDesc' type='textarea' rows='4' cols='50'></br>";

    for(i=0; i<numC; i++){
        html += "<h2>Definition of Category " + i + ":</h2></br>" +
             "Name: <input id='cat" + i + "Name' type='text'></br>" +
             "Type: <select id='cat" + i + "Type'>" +
                   "<option value='noun'>Noun</option>" +
                   "<option value='adjective'>Adjective</option>" +
                   "<option value='verb'>Verb</option>" +
                   "<option value='day'>Day</option>" +
                   "<option value='month'>Month</option>" +
                   "<option value='year'>Year</option>" +
                   "<option value='date'>Date</option>" +
                   "<option value='sequence'>Sequence/Position</option>" +
                   "<option value='other'>Other number</option>" +
                   "</select></br>" +
             "Comparable? <select id='cat" + i + "Comp'><option value=false>False</option>" +
                   "<option value=true>True</option></select></br>";
         for(j=i+1; j<numC; j++){
             html += "Relationship with Category" + j + ":<input id='catRel" + i + "." + j + "' type='text'></br>";
         }
         for(j=0; j<numO; j++){
             html += "Option Name: <input id='opt" + i + "." + j + "Name' type='text'></br>";
         }

    }
    html += "<button onclick='createForm3()'>Submit</button>";
    w2ui.layout.html('main', "");
    w2ui.layout.html('main', html);
}

function createForm3(){
    var i, j;
    puzzName = document.getElementById('puzzName').value;
    description = document.getElementById('puzzDesc').value;
    categories = [];
    catRels = [];
    for(i=0; i<numC; i++){
        var catName = document.getElementById('cat'+i+'Name').value;
        var options = [];
        for(j=0; j<numO; j++){
            options[j] = document.getElementById('opt'+ i + "." +j+'Name').value;
        }
        var comp;
        document.getElementById('cat'+i+'Comp').checked ? comp=true : comp=false;
        categories[i] = category(catName, options, 
                        document.getElementById('cat'+i+'Type').value, comp);
    } 

    for(i=0; i<numC; i++){
        catRels[i] = [];
        for(j=0; j<numC; j++){
            if(i>=j) catRels[i][j] = 0;
            else     catRels[i][j] = document.getElementById("catRel"+i+"."+j).value;
        }
    }   
    getSolution();
}

function getSolution(){
    var nameWidth = 100;
    var boxWidth = 65;
    var i=0, j=0, k=0, l=0;
    var html = "<table cellspacing='0' cellpadding='0' border='0'>";
    html += "<tbody>";

    //top category and option names
    html += "<tr><td width='" + nameWidth*2 + "' height='" + nameWidth*2 + "'></td>";
    for(i=0; i<numC-1; i++){
        html += "<td>";
	html += "<table cellspacing='0' cellpadding='0' border='1''><tbody><tr>";
	//categories
	for(j=0; j<numO; j++){
	    html += "<td class='box' width='" + boxWidth + "' height='" + nameWidth + 
			"'>" + categories[i].name + "</td>";
	}

//	html += "<th class='box' height='" + nameWidth + "colspan'" + numO + "'>" + i + "</th>"

	html += "</tr><tr>";
	//options
	for(j=0; j<numO; j++){
	    //option
	    html += "<td class='box' nowrap='true' width='" + boxWidth + "' height='" + nameWidth + 
			"'>" + categories[i].options[j] + "</td>";
	}

	html += "</tr></tbody></table></td>";
    }
    html += "</tr>";

    //the rest of the blocks
    i=numC-1;
    html += "<tr>";

    //side category and option names
    html += "<td><table cellspacing='0' cellpadding'0' border='1'><tbody>";
    for(j=0; j<numO; j++){
        //category
        html += "<tr><td class='box' width='" + nameWidth + "'height='" + 
        	boxWidth + "'>" + categories[i].name + "</td>";
	//option
	html += "<td class='box' width='" + nameWidth + "'height='" + 
		boxWidth + "'>" + categories[i].options[j] + "</td></tr>";
    }
    html += "</tbody></table></td>";
    //blocks
    for(j=0; j<i; j++){
        html += "<td><table cellspacing='0' cellpadding='0' border='1'><tbody>";
        for(k=0; k<numO; k++){
            html += "<tr>";
	    for(l=0; l<numO; l++){
		html += "<td class='box' width='" + boxWidth + "' height='" +
			boxWidth + "'><input type='radio' id='sol" + k + "." + (l + numO*j) + "'>";// + 
//                        "<option value=false>False</option><option value=true>True</option></select></td>";
	    }
	    html += "</tr>";
	}
	html += "</tbody></table></td>";
    }
    html += "</tr>";
    
    html += "</tbody></table></br><button onclick='getSolution2()'>Generate Clues</button>";
    //w2ui.layout.html('main', html);
    w2ui.layout.content('main', w2ui.layoutInner);
    w2ui.layoutInner.html('main', html);    
}

function getSolution2(){
    var i, j;
    var sol = [];
    for(i=0; i<numO; i++){
        sol[i] = [];
        for(j=0; j<numO*(numC-1); j++){
            if(document.getElementById("sol" + i + "." + j).checked){
                sol[i][j] = true;
            }
            else{
                sol[i][j] = false;
            }
        }
    }

    puzz = puzzle(puzzName, categories, sol, catRels, description);
    var html = "<ol>";
    for(i=0; i<puzz.clues.length; i++){
        html += "<li>" + puzz.clues[i].wordyClue + "</li>";
    }
    html += "</ol></br><button onclick='savePuzzle()'>Accept</button>";
    w2ui.layoutInner.html('right', html);
}

function savePuzzle(){ 
    $.post('savePuzzle.php', JSONPuzzle(puzz), function(data){
        w2ui.layout.content('main', "");	  
    });
}

</script>


</body>
</html>

