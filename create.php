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
    $username = $_POST['username'];
    $movie = $_POST['movie'];
    $rating = $_POST["rating"];

    if (empty($username)) {
        echo "please enter a username";
      } elseif (empty($movie)) {
        echo 'please enter the name of a movie';
      } elseif (empty($rating)) or (!is_numeric($rating)) or (int($rating) > 10) {
        echo 'please enter a number from 1-10';
      }

      else {
        $sql = "SELECT * FROM movie_ratings WHERE username = $username";
        // Construct a prepared statement.
        $stmt = mysqli_prepare($db, $sql);
        // Bind the values for username and password that the user entered to the
        // statement AS STRINGS (that is what "ss" means). In other words, the
        // user input is strictly interpreted by the server as data and not as
        // porgram code part of the SQL statement.
        mysqli_stmt_bind_param($stmt, "ss", $userid);
        // Run the prepared statement.
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $num = mysqli_num_rows($result);

        
        } else {
            $sql = "INSERT INTO movie_ratings VALUES($username, $movie, $rating)";
            // Construct a prepared statement.
            $stmt = mysqli_prepare($db, $sql);
            // Bind the values for username and password that the user entered to the
            // statement AS STRINGS (that is what "ss" means). In other words, the
            // user input is strictly interpreted by the server as data and not as
            // porgram code part of the SQL statement.
            mysqli_stmt_bind_param($stmt, "ss", $userid, $hashed_password);
            // Run the prepared statement.
            mysqli_stmt_execute($stmt);
            echo "signup succesful";
        }


          
?>