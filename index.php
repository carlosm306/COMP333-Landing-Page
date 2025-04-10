<?php
require __DIR__ . "/inc/bootstrap.php";
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
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

$objFeedController = new UserController();
$strMethodName = $uri[4] . 'Action';
// echo "case 2";
$objFeedController->{$strMethodName}();
// echo "case 1";

?>
