<!DOCTYPE html>
<?php
session_start();
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
        Database here
    </div>
    <form name="form" action="logout.php" method="POST">
        <p>
          <input type="submit" id="button" value="Logout" />
        </p>
    </form>
  </body>
</html>