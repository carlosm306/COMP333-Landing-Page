<?php
header("Access-Control-Allow-Origin: *"); // use of * for educational website
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");

require __DIR__ . "/inc/bootstrap.php";
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
// var_dump($_POST["username"]);

// var_dump($uri); exit();

if ((isset($uri[3]) && $uri[3] != 'user') || !isset($uri[4])) {
    // echo "case 1";

    header("HTTP/1.1 404 Not Found");
    exit();
}

// require PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";

require __DIR__ . "/Controller/Api/UserController.php";


// var_dump(PROJECT_ROOT_PATH);
// echo PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
// echo "\n";
// echo "\n";

// echo __DIR__ . "/Controller/Api/UserController.php";
// echo "test";
$objFeedController = new UserController();
$strMethodName = $uri[4] . 'Action';
// var_dump($strMethodName);

$objFeedController->{$strMethodName}();

?>
