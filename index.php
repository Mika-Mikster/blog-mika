<?php require('includes/config.php'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Mika's World</title>
    <link rel="stylesheet" href="style/main.css">
</head>
<body>
<div id="wrapper">
    <header class="top">Welcome to Mika's World</header>
    <nav id="main_menu">
        <ul>
            <li><a href="homepage.html">Home</a></li>
            <li class="selected"><a href="index.php">Blog archive</a></li>
            <li><a href="code_index.php">Coding archive</a></li>
        </ul>
    </nav>

    <?php
    try {

        $stmt = $db->query('SELECT postID, postTitle, postDesc, postDate FROM blog_posts ORDER BY postID DESC');
        while($row = $stmt->fetch()){

            echo '<div id="space">';
            echo '<h1><a href="viewpost.php?id='.$row['postID'].'">'.$row['postTitle'].'</a></h1>';
            echo '<p>Posted on '.date('jS M Y H:i:s', strtotime($row['postDate'])).'</p>';
            echo '<p>'.$row['postDesc'].'</p>';
            echo '<p><a href="viewpost.php?id='.$row['postID'].'">Read More</a></p>';
            echo '</div>';

        }

    } catch(PDOException $e) {
        echo $e->getMessage();
    }
    ?>

</div>


</body>
</html>