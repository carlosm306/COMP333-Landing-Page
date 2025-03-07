<?php

include 'dbconnection.php';
    $username = $_GET['username'];

    if (empty($username)) {
        echo "please enter a username";
    }

      else {
        $sql = "SELECT * FROM movie_ratings WHERE username = $username";
        // Construct a prepared statement.
        $stmt = mysqli_prepare($db, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $userid);
        // Run the prepared statement.
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $r = mysqli_query($db, $sql)
        while($row = mysqli_fetch_assoc($r))
    
        {
        ?>
        <tr>
            <td>
                <?php echo $row["username"] ?>
            </td>
        </tr>   
<?php 
        }

        
        }
   
?>