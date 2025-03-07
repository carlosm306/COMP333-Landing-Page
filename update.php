<?php
    session_start();
    include 'dbconnection.php';
    $revid = $_GET["id"];
    $userid = $_SESSION["username"];
    $movie = $_POST["movie"];
    $rating = $_POST["rating"];
    $review = $_POST["review"];

        $sql = "UPDATE reviews SET username = ?, movie = ?, rating = ?, review = ? WHERE id = $revid";
        // Construct a prepared statement.
        $stmt = mysqli_prepare($db, $sql);
        mysqli_stmt_bind_param($stmt, "ssss", $userid, $movie, $rating, $review);
        // Run the prepared statement.
        mysqli_stmt_execute($stmt);
        echo "review posted";
        header("Location: main.php");
        exit;

?>
