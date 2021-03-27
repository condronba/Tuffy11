<?php
$t =  time();
$today = date("m_d_Y",$t) . "_" . "Letter_To_" . test_input($_POST["character"]) . "_" .test_input($_POST["signOff"]) .$t;
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}


$myfile = fopen("comments/" . $today. ".txt", "w") or die("Unable to create file!");
$txt = "Letter to " . $_POST["character"];
fwrite($myfile, $txt);
$txt = "\nName: " . $_POST["signOff"];
fwrite($myfile, $txt);
$txt = "\nEmail: " . $_POST["email"];
fwrite($myfile, $txt);
$txt = "\nLetter: " .$_POST["letterbody"] ;
fwrite($myfile, $txt);
fclose($myfile);

?> 
