<?php
// session_start();
// include 'dbconnection.php';
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
                $data = json_decode(file_get_contents("php://input"), true);
                if (
                    isset($data["id"])
                ) {
                    $success = $userModel->deleteReview($data);
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
                $data = json_decode(file_get_contents("php://input"), true);

                if (isset($data["username"], $data["movie"], $data["rating"], $data["review"])) {
                    $userid = $data["username"];
                    $movie = $data["movie"];
                    $rating = $data["rating"];
                    $review = $data["review"];
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

    public function editreviewAction()
    {
        $strErrorDesc = '';
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == 'POST') {
            try {
                $userModel = new UserModel();
                $data = json_decode(file_get_contents("php://input"), true);

                if (isset($data["id"], $data["movie"], $data["rating"], $data["review"])) {
                    $success = $userModel->editReview($data["id"], $data["movie"], $data["rating"], $data["review"]);
                    $responseData = json_encode([
                        "message" => $success ? "Review updated" : "Review update failed"
                    ]);
                } else {
                    $strErrorDesc = "All fields must be provided (id, movie, rating, review).";
                    $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                }
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . ' Something went wrong! Please contact support.';
                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
            }
        } else {
            $strErrorDesc = 'Method not supported';
            $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        }

        if (!$strErrorDesc) {
            $this->sendOutput($responseData, ['Content-Type: application/json', 'HTTP/1.1 200 OK']);
        } else {
            $this->sendOutput(json_encode(['error' => $strErrorDesc]), ['Content-Type: application/json', $strErrorHeader]);
        }
    }


    // public function verifyloginAction() {
    //     // so here you'll want to flip the logic -- throw 
    //     // a warning if the user DOES NOT EXIST
    //     // check sign in if the user does
    //     // now you'll need to look deep in the code
    //     // 
    //     $data = json_decode(file_get_contents("php://input"), true);
    //     $userid = $data['userid'];
    //     $password = $data['password'];
        
    //     // Use a prepared statement to prevent SQL injection
    //     $sql = "SELECT password FROM users WHERE username = ? LIMIT 1";
    //     $stmt = mysqli_prepare($db, $sql);
    //     mysqli_stmt_bind_param($stmt, "s", $userid);
    //     mysqli_stmt_execute($stmt);
    //     $result = mysqli_stmt_get_result($stmt);
        
    //     // Check if a user was found
    //     if ($row = mysqli_fetch_assoc($result)) {
    //         $hashed_password = $row['password'];
        
    //         // Verify the password
    //         if (password_verify($password, $hashed_password)) {
    //             echo "Login Success";
        
    //             $_SESSION["loggedin"] = true;
    //             $_SESSION["username"] = $userid;
    //             exit;
    //         } else {
    //             echo "Wrong username or password";
    //         }
    //     } else {
    //         echo "User Not Found";
    //     }
    //         }

    public function loginAction()
{
    $strErrorDesc = '';
    $requestMethod = $_SERVER["REQUEST_METHOD"];

    if (strtoupper($requestMethod) == 'POST') {
        try {
            $userModel = new UserModel();
            $data = json_decode(file_get_contents("php://input"), true);

            $username = $data['username'] ?? null;
            $password = $data['password'] ?? null;

            if (empty($username)) {
                echo "Please enter a username";
            } elseif (empty($password)) {
                echo "Please enter a password";
            } else {
                $result = $userModel->findUser($username);
                $num = count($result);

                if ($num === 0) {
                    echo "No user found with that username";
                } else {
                    $user = $result[0];
                    if (password_verify($password, $user['password'])) {
                        unset($user['password']);
                        $responseData = json_encode([
                            "message" => "Login successful",
                            "user" => $user
                        ]);
                    } else {
                        $responseData = json_encode("Incorrect password");
                    }
                }
            }
        } catch (Error $e) {
            $strErrorDesc = $e->getMessage() . ' Something went wrong! Please contact support.';
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



        // old version of the signup function using logic from the backend assignment
        // public function signupAction()
        // {
        //     // echo "test";
        //     $strErrorDesc = '';
        //     $requestMethod = $_SERVER["REQUEST_METHOD"];
        //     $arrQueryStringParams = $this->getQueryStringParams();
        //     if (strtoupper($requestMethod) == 'POST') {
        //         try {
        //             $userModel = new UserModel();
        //             $data = json_decode(file_get_contents("php://input"), true);
        //             $userid = $data['username'];
        //             $password = $data['password'];
        //             $confirm_password = $data["confirm_password"];
                
        //             if (empty($userid)) {
        //                 echo "please enter a username";
        //               } elseif (empty($password)) {
        //                 echo 'please enter a password';
        //               } elseif (empty($confirm_password)) {
        //                 echo 'please confirm password';
        //               }
        //                 elseif ("$password" !== "$confirm_password") {
        //                 echo "passwords do not match \n";
        //                 // echo $password . "\n";
        //                 // echo $confirm_password . "\n";
        //               } 
        //               elseif (strlen($password)<10) {
        //                 echo 'your password must be at least ten characters long';
        //               } 
        //               else {
        //                 // CHECK TO SEE IF THE USERNAME IS ALREADY IN USE
        //                 $result = $userModel->findUser($userid);
        //                 $num = mysqli_num_rows($result);
                
        //                 if ($num > 0) {
        //                   echo "that username is already in use. Please enter a new one";
        //                 } else {
        //                     // If the password and username conform to the conditions, then record them;
        //                     $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        //                     $success = $userModel->signup($userid, $hashed_password);
        //                     if ($success == true) {
        //                         $responseData = json_encode("Signup successful!");
        //                     }
        //                     else{
        //                         $responseData = json_encode("Signup unsuccessful");
        //                     }

        //                 }
        //               }
        //         } catch (Error $e) {
        //             $strErrorDesc = $e->getMessage().'Something went wrong! Please contact support.';
        //             $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        //         }
                
        //     } else {
        //         $strErrorDesc = 'Method not supported';
        //         $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        //     }
        //     // send output 
        //     if (!$strErrorDesc) {
        //         $this->sendOutput(
        //             $responseData,
        //             array('Content-Type: application/json', 'HTTP/1.1 200 OK')
        //         );
        //     } else {
        //         $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
        //             array('Content-Type: application/json', $strErrorHeader)
        //         );
        //     }
        // }

        // public function signupAction()
        // {
        //     $strErrorDesc = '';
        //     $requestMethod = $_SERVER["REQUEST_METHOD"];
        //     $arrQueryStringParams = $this->getQueryStringParams();

        //     if (strtoupper($requestMethod) == 'POST') {
        //         try {
        //             $userModel = new UserModel();
        //             $data = json_decode(file_get_contents("php://input"), true);
        //             $userid = $data['username'];
        //             $password = $data['password'];
        //             $confirm_password = $data["confirm_password"];
                
        //             if (empty($userid)) {
        //                 echo "please enter a username";
        //             } elseif (empty($password)) {
        //                 echo 'please enter a password';
        //             } elseif (empty($confirm_password)) {
        //                 echo 'please confirm password';
        //             } elseif ($password !== $confirm_password) {
        //                 echo "passwords do not match \n";
        //             } elseif (strlen($password) < 10) {
        //                 echo 'your password must be at least ten characters long';
        //             } else {
        //                 // CHECK TO SEE IF THE USERNAME IS ALREADY IN USE
        //                 $result = $userModel->findUser($userid);
        //                 $num = count($result);
        //                 if ($num > 0) {
        //                     echo "that username is already in use. Please enter a new one";
        //                 } else {
        //                     // If the password and username conform to the conditions, then record them;
        //                     $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        //                     $success = $userModel->signup($userid, $hashed_password);

        //                     if ($success == true) {
        //                         $responseData = json_encode("Signup successful!");
        //                     } else {
        //                         $responseData = json_encode("Signup unsuccessful");
        //                     }
        //                 }
        //             }
        //         } catch (Error $e) {
        //             $strErrorDesc = $e->getMessage() . ' Something went wrong! Please contact support.';
        //             $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
        //         }
        //     } else {
        //         $strErrorDesc = 'Method not supported';
        //         $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
        //     }

        //     // send output 
        //     if (!$strErrorDesc) {
        //         $this->sendOutput(
        //             $responseData,
        //             array('Content-Type: application/json', 'HTTP/1.1 200 OK')
        //         );
        //     } else {
        //         $this->sendOutput(json_encode(array('error' => $strErrorDesc)), 
        //             array('Content-Type: application/json', $strErrorHeader)
        //         );
        //     }
        // }
        public function signupAction()
        {
            $strErrorDesc = '';
            $strSuccessHeader = 'HTTP/1.1 200 OK'; 
            $requestMethod = $_SERVER["REQUEST_METHOD"];
        
            if (strtoupper($requestMethod) == 'POST') {
                try {
                    $userModel = new UserModel();
                    $data = json_decode(file_get_contents("php://input"), true);
        
                    $userid = $data['username'] ?? null;
                    $password = $data['password'] ?? null;
                    $confirm_password = $data['confirm_password'] ?? null;
        
                    if (empty($userid)) {
                        $strErrorDesc = "Please enter a username";
                        $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                    } elseif (empty($password)) {
                        $strErrorDesc = "Please enter a password";
                        $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                    } elseif (empty($confirm_password)) {
                        $strErrorDesc = "Please confirm password";
                        $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                    } elseif ($password !== $confirm_password) {
                        $strErrorDesc = "Passwords do not match";
                        $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                    } elseif (strlen($password) < 10) {
                        $strErrorDesc = "Your password must be at least ten characters long";
                        $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                    } else {
                        // Check if the username is already in use
                        $result = $userModel->findUser($userid);
                        $num = count($result);
        
                        if ($num > 0) {
                            $strErrorDesc = "That username is already in use. Please enter a new one";
                            $strErrorHeader = 'HTTP/1.1 400 Bad Request';
                        } else {
                            // If the password and username conform to the conditions, then record them
                            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                            $success = $userModel->signup($userid, $hashed_password);
        
                            if ($success === true) {
                                $responseData = json_encode(["message" => "Signup successful!"]);
                                $strSuccessHeader = 'HTTP/1.1 201 Created';
                            } else {
                                $strErrorDesc = "Signup unsuccessful";
                                $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
                            }
                        }
                    }
                } catch (Error $e) {
                    $strErrorDesc = $e->getMessage() . ' Something went wrong! Please contact support.';
                    $strErrorHeader = 'HTTP/1.1 500 Internal Server Error';
                }
            } else {
                $strErrorDesc = 'Method not supported';
                $strErrorHeader = 'HTTP/1.1 422 Unprocessable Entity';
            }
        
            // Send output
            if (!$strErrorDesc) {
                $this->sendOutput(
                    $responseData,
                    array('Content-Type: application/json', $strSuccessHeader)
                );
            } else {
                $this->sendOutput(
                    json_encode(['error' => $strErrorDesc]),
                    array('Content-Type: application/json', $strErrorHeader)
                );
            }
        }
        




}
