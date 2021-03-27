
<?php
$t =  time();
$today = date("m_d_Y",$t) . "__" . test_input($_POST["name"]) . "_" .test_input($_POST["email"]) .$t;
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}


$myfile = fopen("comments/" . $today. ".txt", "w") or die("Unable to create file!");
$txt = "Name: " . $_POST["name"];
fwrite($myfile, $txt);
$txt = "\nEmail: " . $_POST["email"];
fwrite($myfile, $txt);
$txt = "\nComments/Question: " .$_POST["comment"] ;
fwrite($myfile, $txt);
fclose($myfile);

?> 
