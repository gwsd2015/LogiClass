<!DOCTYPE html>
<html>
<head>
    <style>
	h1 {
	   color: blue;
	   font-size: 100px;
	   font-family: "Arial";
	}
    </style>
    <title>LogiClass</title>
    <link rel="stylesheet" type="text/css" href="http://w2ui.com/src/w2ui-1.4.min.css" />
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="http://w2ui.com/src/w2ui-1.4.min.js"></script>
</head>
<body>
    <div id="myLayout" style="height: 850px"></div>
</body>
<script>
$(function () {
    var pstyle = 'background-color: white; text-align: center';
    var instructorLink = "<a href='instructor/index.php'><img src='instructor.png' alt='Instructor' style='width:350px;height:450px;'></a>";
    var studentLink = "<a href='student/index.php'><img src='student.jpg' alt='Instructor' style='width:430px;height:430px;'></a>";

    $('#myLayout').w2layout({
        name: 'myLayout',
	style: 'background-color: white',
        panels: [
            { type: 'main', style: pstyle, content: "<h1>LogiClass</h1>"},
	    { type: 'bottom', size: 600, style: pstyle, content: instructorLink + studentLink},
        ]
    });
});
</script>
</html>
