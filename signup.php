<?php

    // session_start();

    // echo 'Welcome to page #1<br />';

    // // session_id() is a built-in function used to get or set the session id for the
    // // current session (https://www.php.net/manual/en/function.session-id.php).
    // echo('PHPSESSID: ' . session_id());

    // // Set session variables.
    // // The "loggedin" session variable is used here to keep track if a user
    // // is logged in.
    // $_SESSION['animal']   = 'cat';
    // // $_SESSION["loggedin"] = false;

    // // Call page 2
    // if($_SESSION["loggedin"]){
    //     echo '<br /><a href="page_2.php">page 2</a>';
    // }

    include 'dbconnection.php';
    $userid = $_POST['userid'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm password'];

    // echo empty($userid);
    // echo empty($userid) > 0;
    // if (!empty($userid)) {
    //     echo "message";
    // } else {

    // }

    if (empty($userid)) {
        echo "please enter a username";
      } elseif (empty($password)) {
        echo 'please enter a password';}
    //   } else {
    //     echo 'please confirm password';
    //   }

    //   (empty($confirm_password)) 

        elseif (0) {
        echo 'that username is already in use. Please enter a new one';
      } elseif ('$password' !== '$confirm_password') {
        echo 'passwords do not match';
        echo '$password';
        echo $confirm_password;
      } elseif (strlen($password)<10) {
        echo 'your password must be at least ten characters long';
      } else {
        // If the password and username conform to the conditions, then record them;
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        // Use placeholders ? for username and password values for the time being.
        $sql = "INSERT INTO users VALUES(?, ?)";
        // Construct a prepared statement.
        $stmt = mysqli_prepare($db, $sql);
        // Bind the values for username and password that the user entered to the
        // statement AS STRINGS (that is what "ss" means). In other words, the
        // user input is strictly interpreted by the server as data and not as
        // porgram code part of the SQL statement.
        mysqli_stmt_bind_param($stmt, "ss", $userid, $hashed_password);
        // Run the prepared statement.
        mysqli_stmt_execute($stmt);
      }


?>