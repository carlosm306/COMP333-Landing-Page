<?php

require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{
    public function getUsers($limit)
    {
        return $this->select("SELECT * FROM reviews ORDER BY username ASC LIMIT ?", ["i", $limit]);
    }

    public function findUser($username)
    {
        return $this->select("SELECT * FROM users WHERE username = ?", ["s", $username]);
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

    public function editReview($id, $movie, $rating, $review)
    {
        $sql = "UPDATE reviews SET movie = ?, rating = ?, review = ? WHERE id = ?";
        return $this->execute($sql, ["sssi", $movie, $rating, $review, $id]);
    }    

    public function verifyPassword($username, $password)
    {
        // Step 1: Look up user by username
        $userResult = $this->select("SELECT * FROM users WHERE username = ?", ["s", $username]);
    
        if (count($userResult) === 0) {
            return [
                "success" => false,
                "message" => "User not found"
            ];
        }
    
        $user = $userResult[0];  // Grab the user row
    
        // Step 2: Use password_verify to compare
        if (password_verify($password, $user['password'])) {
            return [
                "success" => true,
                "message" => "Login successful",
                "user" => $user
            ];
        } else {
            return [
                "success" => false,
                "message" => "Incorrect password"
            ];
        }
    }
    

    public function signup($username, $password)
    {
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        return $this->execute($sql, ["ss", $username, $password]);
    }

    public function deleteReview($data)
    {
        $revid = $data["id"];
        $sql = "DELETE FROM reviews WHERE id = ?";
        return $this->execute($sql, ["s", $revid]);
    }

}