<!DOCTYPE html>

<?php
session_start();
if ($_SESSION["loggedin"]>0) {
  header("Location: main.php");
  exit;
}
?>

<html>
  <head>
    <title>Sign Up</title>
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>

  <body>
    <div id="form">
      <h1>Sign Up!</h1>
      <form name="signup" action="signup.php" method="POST">
        <p>
          <label> USER NAME: </label>
          <input type="text" id="user" name="userid" />
        </p>

        <p>
          <label> PASSWORD: </label>
          <input type="text" id="pass" name="password" />
        </p>

        <p>
            <label> CONFIRM PASSWORD: </label>
            <input type="text" id="confirmpass" name="confirm_password" />
          </p>

        <p>
          <input type="submit" id="button" value="Sign Up" />
        </p>
        <a href="form.html" target="_blank" rel="noreferrer noopener"> Already a user? Click here to log in! </a> 
      </form>
    </div>
  </body>
</html>