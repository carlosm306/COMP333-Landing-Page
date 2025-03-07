<?php
session_start();
include 'dbconnection.php';

$userid = $_POST['userid'];
$password = $_POST['password'];

// Use a prepared statement to prevent SQL injection
$sql = "SELECT password FROM users WHERE username = ? LIMIT 1";
$stmt = mysqli_prepare($db, $sql);
mysqli_stmt_bind_param($stmt, "s", $userid);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

// Check if a user was found
if ($row = mysqli_fetch_assoc($result)) {
    $hashed_password = $row['password'];

    // Verify the password
    if (password_verify($password, $hashed_password)) {
        echo "Login Success";

        $_SESSION["loggedin"] = true;
        $_SESSION["username"] = $userid;
        header("Location: main.php");
        exit;
    } else {
        echo "Wrong username or password";
    }
} else {
    echo "User Not Found";
}
?>
