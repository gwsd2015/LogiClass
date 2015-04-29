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

mysqli_query($conn, "UPDATE Puzzles SET Assigned=TRUE WHERE ID='$data';")
       or die('</br>Error with sql query. ' . mysqli_error($conn));
?>