<?php
    session_start();

include 'dbconnection.php';
class UserController extends BaseController

{
    /** 
* "/user/list" Endpoint - Get list of users 
*/
    public function listAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'GET') {
            try {
                $userModel = new UserModel();
                $intLimit = 10;
                if (isset($arrQueryStringParams['limit']) && $arrQueryStringParams['limit']) {
                    $intLimit = $arrQueryStringParams['limit'];
                }
                $arrUsers = $userModel->getUsers($intLimit);
                $responseData = json_encode($arrUsers);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    public function deleteAction()
    {
        // echo "test";
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();
                if (
                    isset($_POST["id"])
                ) {
                    $success = $userModel->deleteReview();
                    if ($success == true) {
                        $responseData = json_encode("Review deleted");
                    }
                    else{
                        $responseData = json_encode("Review not deleted");
                    }
                } else {
                    echo json_encode(["error" => "All fields must be provided."]);
                }
                
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    public function writereviewAction()
    {
        // echo "test";
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];
        $arrQueryStringParams = $this->getQueryStringParams();
        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();
                if (
                    isset($_POST["username"], $_POST["movie"], $_POST["rating"], $_POST["review"])
                ) {
                    $userid = $_POST["username"];
                    $movie = $_POST["movie"];
                    $rating = $_POST["rating"];
                    $review = $_POST["review"];
                    $success = $userModel->writeReview($userid, $movie, $rating, $review);
                    if ($success == true) {
                        $responseData = json_encode("Review received");
                    }
                    else{
                        $responseData = json_encode("Review not received");
                    }
                } else {
                    echo json_encode(["error" => "All fields must be provided."]);
                }
                
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }
        // send output 
        if (!$strErrorDesc) {
            $this->sendOutput(
                $responseData,
                array('Content-Type: application/json', 'HTTP/1.1 200 OK')
            );
        } else {
            $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
                array('Content-Type: application/json', $strErrorHeader)
            );
        }
    }

    public function verifyloginAction() {
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
                exit;
            } else {
                echo "Wrong username or password";
            }
        } else {
            echo "User Not Found";
        }
            }

    public function signupAction() {
        $userid = $_POST['userid'];
        $password = $_POST['password'];
        $confirm_password = $_POST["confirm_password"];
    
        if (empty($userid)) {
            echo "please enter a username";
          } elseif (empty($password)) {
            echo 'please enter a password';
          } elseif (empty($confirm_password)) {
            echo 'please confirm password';
          }
            elseif ("$password" !== "$confirm_password") {
            echo "passwords do not match \n";
            // echo $password . "\n";
            // echo $confirm_password . "\n";
          } 
          elseif (strlen($password)<10) {
            echo 'your password must be at least ten characters long';
          } 
          else {
            $sql = "SELECT * FROM users WHERE username = ?";
            // Construct a prepared statement.
            $stmt = mysqli_prepare($db, $sql);
            // Bind the values for username and password that the user entered to the
            // statement AS STRINGS (that is what "ss" means). In other words, the
            // user input is strictly interpreted by the server as data and not as
            // program code part of the SQL statement.
            mysqli_stmt_bind_param($stmt, "s", $userid);
            // Run the prepared statement.
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $num = mysqli_num_rows($result);
    
            if ($num > 0) {
              echo "that username is already in use. Please enter a new one";
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
                echo "signup succesful";
                $_SESSION["loggedin"] = true;
                $_SESSION["username"] = $userid;
                exit;
            }
          }
    }




}
