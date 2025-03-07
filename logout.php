<?php
session_start();
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        session_destroy();
        echo "signed out";
        header("Location: landing_page.html") ; 
        exit;
    }
?>