<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{
    public function getUsers($limit)
    {
        return $this->select("SELECT * FROM reviews ORDER BY username ASC LIMIT ?", ["i", $limit]);
    }

    // public function writeReview($userid, $movie, $rating, $review)
    // {
    //     $sql = "INSERT INTO reviews (username, movie, rating, review) VALUES (?, ?, ?, ?)";
    //     $stmt = mysqli_prepare($this->conn, $sql);
    //     if (!$stmt) {
    //         throw new Exception("Statement preparation failed: " . mysqli_error($this->conn));
    //     }
    //     mysqli_stmt_bind_param($stmt, "ssss", $userid, $movie, $rating, $review);

    //     if (!mysqli_stmt_execute($stmt)) {
    //         throw new Exception("Statement execution failed: " . mysqli_stmt_error($stmt));
    //     }

    //     return "Review submitted";
    // }

    public function writeReview($username, $movie, $rating, $review)
    {
        $sql = "INSERT INTO reviews (username, movie, rating, review) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE
        rating = VALUES(rating),
        review = VALUES(review)";
        return $this->execute($sql, ["ssss", $username, $movie, $rating, $review]);
    }



}