<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Roll a Dice</title>
  <link rel="stylesheet" href="dice.css">
  <link rel="stylesheet" href="../style/main.css">
</head>
<body>
<div id="wrapper">
  <header class="top">Roll a die</header>
  <hr />

  <form action="" method="post">
    <button id="submit" type="submit" type="button" name="roll" class="btn">Roll!</button>
    <br>
  </form>

  <?php

  if (isset($_POST['roll'])){
    $rollcount = 0;
    do {
      $roll = rand(1,6);
      $rollcount ++;
      switch ($roll){
        case 1: echo '<div class="dice">1</div>'; break;
        case 2: echo '<div class="dice">2</div>'; break;
        case 3: echo '<div class="dice">3</div>'; break;
        case 4: echo '<div class="dice">4</div>'; break;
        case 5: echo '<div class="dice">5</div>'; break;
        case 6: echo '<div class="dice">6</div>'; break;
      }
    } while ($roll <= 5);
    echo "<p>You win!!</p>";
    if ($rollcount == 1){
      $verb = "took";
      $last = "roll";
    } else {
      $verb = "takes";
      $last = "rolls";
    };
    echo "<p>It {$verb} you {$rollcount} {$last} to win</p>";
  }
  ?>

    <p><a href="../code_index.php">Return to code archive</a></p>
</div>
</body>
</html>
