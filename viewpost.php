<?php require('includes/config.php'); 

$stmt = $db->prepare('SELECT postID, postTitle, postCont, postDate FROM blog_posts WHERE postID = :postID');
$stmt->execute(array(':postID' => $_GET['id']));
$row = $stmt->fetch();

//if post does not exists redirect user.
if($row['postID'] == ''){
	header('Location: ./');
	exit;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Blog - <?php echo $row['postTitle'];?></title>
    <link rel="stylesheet" href="style/main.css">
</head>
<body>

	<div id="wrapper">

		<header class="top">Welcome to Mika's World</header>
		<nav id="main_menu">
			<ul>
				<li><a href="./eigen_website/website.html">Home</a></li>
				<li class="selected"><a href="index.php">Blog archive</a></li>
				<li><a href="code_index.php">Coding archive</a></li>
			</ul>
		</nav>


		<?php	
			echo '<div>';
				echo '<h1>'.$row['postTitle'].'</h1>';
				echo '<p>Posted on '.date('jS M Y', strtotime($row['postDate'])).'</p>';
				echo '<p>'.$row['postCont'].'</p>';				
			echo '</div>';
		?>

	</div>

</body>
</html>