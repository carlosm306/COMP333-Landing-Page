<!DOCTYPE html>
<?php
session_start();
include 'dbconnection.php';

?>

<html>
  <head>
    <title>Read Review</title>
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>

  <body>
    <?php 
      echo $_SESSION["username"];
    ?>
    <div>
    <?php 
        $revid = $_GET["id"];
        $sql = "SELECT * FROM reviews WHERE id = $revid";
        $stmt = mysqli_prepare($db, $sql);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
          while($row = mysqli_fetch_assoc($result)) {
            echo "id: " . "<br>" . $row["id"]. "<br>" . "<br>" . "User: " . "<br>" . $row["username"]. "<br>" . "<br>" . "Movie: " . "<br>" . $row["movie"]. 
            "<br>" . "<br>" . "Rating: " . "<br>" . $row["rating"]. "<br>" . "<br>" . "Review: " . "<br>" . $row["review"] ; }
    ?>
    </div>
    <form name="form" action="logout.php" method="POST">
        <p>
          <input type="submit" id="button" value="Logout" />
        </p>
    </form>
  </body>
</html>