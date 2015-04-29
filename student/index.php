<!DOCTYPE html>
<html>
<head>
    <style>
      .vertical-text {
	transform: rotate(90deg);
	transform-origin: left top 0;
      }
    </style>
    <title>Student</title>
    <link rel="stylesheet" type="text/css" href="http://w2ui.com/src/w2ui-1.4.2.min.css" />
    <script src="../uiHelpers.js"></script>
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
	    
	    $result = mysqli_query($conn, "SELECT ID, PuzzleData, Grade FROM Puzzles;")
	           or die('Error with sql query. ' . mysqli_error($conn));
    //store all puzzles in array 
    $arr = array();
    $IDArr = array();
    $gradeArr = array();
    $i=0;

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $arr[$i] = $row["PuzzleData"];
            $IDArr[$i] = $row["ID"];
            $gradeArr[$i] = $row["Grade"];
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
  <script src="../testing/grades.js"></script>

<script type="text/javascript">
/*var stuff = document.getElementById('queryrow0').value;
console.log(stuff);*/


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
            { field: 'description', caption: 'Description', size: '33%', sortable: true, searchable: true }
        ],
        onClick: function(event){
            w2ui.layout.content('main', w2ui.layoutInner);
            var puzzle = this.get(event.recid);
            w2ui.layoutInner.html('main', generateGrid(puzzle, true) + "<div id='puzzid' value='" + event.recid + 
                      "'></div>" + event.recid + "<div id='response'>place holder</div><button onclick='submitSol()'>Submit</button>");
            var i, html = "<ol>";
            for(i=0; i<puzzle.clues.length; i++){
                html += "<li>" + puzzle.clues[i].wordyClue + "</li>";
            }
            html += "</ol>";
            w2ui.layoutInner.content('right', html);
        }
    },
    gradedPuzzles: {
        name: 'gradedPuzzles',
        show: {
            header: true,
            footer: true
        },
        style: 'padding: 0px',
        columns: [
            { field: 'name', caption: 'Name', size: '33%', sortable: true, searchable: true },
            { field: 'description', caption: 'Description', size: '33%', sortable: true, searchable: true },
            { field: 'grade', caption: 'Grade', size: '33%', sortable: true, searchable: true }
        ]    
    },
    sidebar: {
	name: 'sidebar',
	nodes: [ 
		{ id: 'general', text: 'General', group: true, expanded: true, nodes: [
			{ id: 'view', text: 'View Assignments', img: 'icon-page' },
			{ id: 'grade', text: 'View Grades', img: 'icon-page' }
		   ]
                }
	],
	onClick: function (event) {
                    if ( event.target == "view" ){
                       w2ui.layout.html('main', w2ui.allPuzzles);                       
                    }
                    else if ( event.target == "grade" ){
                       w2ui.layout.html('main', w2ui.gradedPuzzles);                       
                    }
	}
    }
}

$(function () {
	// initialization
	$('#main').w2layout(config.layout);
        $().w2layout(config.layoutInner);
	$().w2grid(config.allPuzzles);
        $().w2grid(config.gradedPuzzles);

        //add records to grid
        var numRecords = w2ui['allPuzzles'].records.length;
        var puzzles = <?php print json_encode($arr); ?>;
        var i;
        var ids = <?php print json_encode($IDArr); ?>;
        var grades = <?php print json_encode($gradeArr); ?>;
        for(i=0; i<puzzles.length; i++){
	    var entry = JSON.parse(puzzles[i]);
            entry.recid = ids[i];
            w2ui['allPuzzles'].add(entry);
            entry.grade = grades[i];
            w2ui['gradedPuzzles'].add(entry);
        }

	w2ui.layout.content('left', $().w2sidebar(config.sidebar));
});

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
			boxWidth + "'><input type='radio' id='sol" + k + "." + (l + numO*j) + "'>";
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
    html += "</ol></br><button onclick='savePuzzle()'>Accept</button><div id='response'>place holder</div>";
    w2ui.layoutInner.html('right', html);
}
/*function savePuzzle(){
    console.log(JSONPuzzle(puzz));
    $.post('savePuzzle.php', JSONPuzzle(puzz), function(data){
	//show the response
	$('#response').html(data);
    });
 / *   var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "savePuzzle.php", true);
    xmlhttp.send(JSON.stringify(JSONPuzzle(puzz)));* /
}*/

function submitSol(){
    var submission = [];
    var puzzid = document.getElementById("puzzid").getAttribute("value");
    var i, j;
    numC = document.getElementById("numC").getAttribute("value");
    numO = document.getElementById("numO").getAttribute("value");
    
    for(i=0; i<numO; i++){
        submission[i] = [];
        for(j=0; j<((numC-1)*numO); j++){
            submission[i][j] = document.getElementById("sol" + i + "." + j).checked;
        }
    }
    var g = grade(solution, submission);
    
 /*   var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "saveResponse.php", true);
    xmlhttp.send(32);*/
    $.post('saveResponse.php', {id: puzzid, grade: g}, function(data){
        $('#response').html(data);
    });
}
</script>


</body>
</html>
