<?php
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
date_default_timezone_set('UTC');
$t =  time();
$today = date("m_d_Y",$t); 
$target_dir = getcwd() . "/comments/" ."shareWork_" . $today . "_" . $t . "/";
// create directory
mkdir($target_dir, 0755); 

$myfile = fopen($target_dir . $today. ".txt", "w") or die("Unable to create file!");
$txt = "Puppet Description: " .$_POST["shareform"] ;
fwrite($myfile, $txt);
fclose($myfile);

$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

$uploadOk = 1;


$success = "";
// Check file size
if ($_FILES["fileToUpload"]["size"] > 2097152) {
   $success = $success . "Sorry, your file is too large. Need to be 2M or less.\n";

    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    $success = $success. "Sorry, only JPG, JPEG, PNG & GIF files are allowed.<br/>\n";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
   $success = $success . "Sorry, your file was not uploaded.<br/>\n";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        $success =  "Thank you! Tuffy is reviewing your submission.";
    } else {
        $success = $success .  "Sorry, there was an error uploading your file.<br/>\n";
    }
}
?>

  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Tuffy The Tiger</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link href='http://fonts.googleapis.com/css?family=Noticia+Text:700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/share.css" /> 
<style>
html {
    background-image: url('../backgrounds/bg_pa_or.png');
    height: 100px;
}

html > * {
    background-color: transparent;
    z-index: 500;
}
</style>
  </head> 

   <body>

        <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>


        
        <div class="container upload" style="padding-left: 0px; padding-right: 0px; margin-left: -140px; text-align: center; margin-right: 0px;">
          <h2>
                    <?php 
                    echo $success;
                    ?>
          </h2>
           <h3><a type="button" class="closebtn" href="share.php" >Upload Another?</a></h3>
          <div class="row">
               
          </div>
        </div>

   </body>

    </html>

