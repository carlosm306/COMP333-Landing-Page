<!DOCTYPE html>
<?php
session_start();
include 'dbconnection.php';

?>

<html>
  <head>
    <title>Review Database</title>
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>

  <body>
    <?php 
      echo $_SESSION["username"];
    ?>
    <div>
    <?php 
        echo '<a href="writereview.php"> Add a new review</a>';
        echo "<br>";

        $sql = "SELECT * FROM reviews";
        $stmt = mysqli_prepare($db, $sql);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($result) > 0) {
          // output data of each row
          while($row = mysqli_fetch_assoc($result)) {
            echo "id: " . $row["id"]. " - User: " . $row["username"]. " - Movie: " . $row["movie"]. 
            " - Rating: " . $row["rating"]. " - Review: " . $row["review"];

            echo '<a href="readreview.php?id=' . $row["id"] . '"> Read</a>';


            if ($row["username"] == $_SESSION["username"]){
              echo '<a href="updatereview.php?id=' . $row["id"] . '"> Update</a>';
              echo '<a href="deletereview.php?id=' . $row["id"] . '"> Delete</a>';
            }
            echo "<br>";

          }
        } else {
          echo "write our first review";
        }
    ?>
    </div>
    <form name="form" action="logout.php" method="POST">
        <p>
          <input type="submit" id="button" value="Logout" />
        </p>
    </form>
  </body>
</html>