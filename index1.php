<!DOCTYPE html>
<html>
<head>
    <title>LOGIN </title>
</head>
<body>
    <form action="verifyLogin.php" method="post">
        <?php if(isset($_GET["error"])){ ?>
            <p> <?php echo $_GET["error"] ; ?> </p>
        <?php } ?>
        <label> Username <label>
        <input type="text" name="username" placeholder="Username"><br>
        <label> Password <label>
        <input type="text" name="password" placeholder="Password"><br>

        <button type="submit"> Login </button>
    </form>
</body>
</html>

        