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
  </body>
</html>