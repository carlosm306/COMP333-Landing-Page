<?php
    session_start();
    include 'dbconnection.php';
    
    $userid = $_SESSION["username"];
    $movie = $_POST["movie"];
    $rating = $_POST["rating"];
    $review = $_POST["review"];

    // echo "check";

        $sql = "INSERT INTO reviews (username, movie, rating, review) VALUES (?, ?, ?, ?)";
        // Construct a prepared statement.
        $stmt = mysqli_prepare($db, $sql);
        mysqli_stmt_bind_param($stmt, "ssss", $userid, $movie, $rating, $review);
        // Run the prepared statement.
        mysqli_stmt_execute($stmt);
        echo "review posted";
        header("Location: main.php");
        exit;

    // if (empty($userid)) {
    //     echo "please enter a username";
    //   } elseif (empty($password)) {
    //     echo 'please enter a password';
    //   } elseif (empty($confirm_password)) {
    //     echo 'please confirm password';
    //   }
    //     elseif ("$password" !== "$confirm_password") {
    //     echo "passwords do not match \n";
    //     // echo $password . "\n";
    //     // echo $confirm_password . "\n";
    //   } 
    //   elseif (strlen($password)<10) {
    //     echo 'your password must be at least ten characters long';
    //   } 
    //   else {
    //     $sql = "SELECT * FROM users WHERE username = ?";
    //     // Construct a prepared statement.
    //     $stmt = mysqli_prepare($db, $sql);
    //     // Bind the values for username and password that the user entered to the
    //     // statement AS STRINGS (that is what "ss" means). In other words, the
    //     // user input is strictly interpreted by the server as data and not as
    //     // porgram code part of the SQL statement.
    //     mysqli_stmt_bind_param($stmt, "s", $userid);
    //     // Run the prepared statement.
    //     mysqli_stmt_execute($stmt);
    //     $result = mysqli_stmt_get_result($stmt);
    //     $num = mysqli_num_rows($result);

    //     if ($num > 0) {
    //       echo "that username is already in use. Please enter a new one";
    //     } else {
    //         // If the password and username conform to the conditions, then record them;
    //         $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    //         // Use placeholders ? for username and password values for the time being.
    //         $sql = "INSERT INTO users VALUES(?, ?)";
    //         // Construct a prepared statement.
    //         $stmt = mysqli_prepare($db, $sql);
    //         // Bind the values for username and password that the user entered to the
    //         // statement AS STRINGS (that is what "ss" means). In other words, the
    //         // user input is strictly interpreted by the server as data and not as
    //         // porgram code part of the SQL statement.
    //         mysqli_stmt_bind_param($stmt, "ss", $userid, $hashed_password);
    //         // Run the prepared statement.
    //         mysqli_stmt_execute($stmt);
    //         echo "signup succesful";
    //         $_SESSION["loggedin"] = true;
    //         $_SESSION["username"] = $userid;
    //         header("Location: main.php");
    //         exit;
    //     }


            
    //   }
?>
