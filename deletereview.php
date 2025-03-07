<!DOCTYPE html>

<?php
session_start();
echo $_SESSION["username"];
$revid = $_GET["id"];
?>

<html>
  <head>
    <title>Delete Review</title>
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>

  <body>
    <div id="form">
      <h1>Are you sure you want to delete your review?</h1>
      <form name="review" action="deleteop.php?id=<?= $revid ?>" method="POST">
      <p>
          <input type="submit" id="button" value="DELETE REVIEW" />
          <a href="main.php" target="_blank" rel="noreferrer noopener"> Cancel </a> 
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