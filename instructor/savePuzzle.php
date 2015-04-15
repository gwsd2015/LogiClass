<?php 

$data=$_POST;

$servername = "localhost";
$username = "logiclass";
$password = "logiclasspwd";
$dbname = "logiclass";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname)
      or die('Error connecting to MySQL server.');

mysql_select_db("logiclass", $conn);

mysqli_query($conn, "INSERT INTO Puzzles (PuzzleData, Assigned) VALUES ('hi', FALSE);")
       or die('Error with sql query.' . mysqli_error($conn));

?>