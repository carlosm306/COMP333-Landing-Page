<!DOCTYPE html>

<?php
session_start();
echo $_SESSION["username"];
$revid = $_GET["id"];
?>

<html>
  <head>
    <title>Update Review</title>
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>

  <body>
    <div id="form">
      <h1>Update Review</h1>
      <form name="review" action="update.php?id=<?= $revid ?>" method="POST">
        <p>
          <label> Movie: </label>
          <input type="text" id="movie" name="movie" />
        </p>

        <p>
          <label> Rating: </label>
          <input type="int" id="rating" name="rating" 
          maxlength="1" placeholder="Number 1-9" />
        </p>

        <p>
            <label> Review: </label>
            <input type="text" id="review" name="review" />
          </p>

        <p>
          <input type="submit" id="button" value="Submit Review" />
        </p>
      </form>
    </div>
    <form name="form" action="logout.php" method="POST">
        <p>
          <input type="submit" id="button" value="Logout" />
        </p>
    </form>
  </body>
</html>