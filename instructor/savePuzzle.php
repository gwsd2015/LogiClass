<?php 

$data=$_POST;
print_r($data);
$servername = "localhost";
$username = "logiclass";
$password = "logiclasspwd";
$dbname = "logiclass";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname)
      or die('Error connecting to MySQL server.');

mysqli_select_db("logiclass", $conn);

$phpData = json_decode($phpData, true);

mysqli_query($conn, "INSERT INTO Puzzles (PuzzleData, Assigned) VALUES ($data, FALSE);")
       or die('Error with sql query. ' . mysqli_error($conn));

?>