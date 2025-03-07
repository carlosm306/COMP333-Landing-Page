<?php
session_start();
include 'dbconnection.php';
$revid = $_GET["id"];
// echo $revid;
// echo "test";
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $sql = "DELETE FROM reviews WHERE id = ?";
        // Construct a prepared statement.
        $stmt = mysqli_prepare($db, $sql);
        // Bind the values for username and password that the user entered to the
        // statement AS STRINGS (that is what "ss" means). In other words, the
        // user input is strictly interpreted by the server as data and not as
        // porgram code part of the SQL statement.
        mysqli_stmt_bind_param($stmt, "s", $revid);
        // Run the prepared statement.
        mysqli_stmt_execute($stmt);
        echo "entry deleted";
        header("Location: main.php") ; 
        exit;
    }
?>