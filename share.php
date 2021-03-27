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
 <div id="shareWork1" >
          <form id="shareform" action="upload.php" method="post" enctype="multipart/form-data">
            Attach a photo of your work as well as a short description!
			
            <div id="shareDescription">
              <textarea form="shareform" id="sharebody" name="shareform" rows="4" style="width: 700px;"></textarea>
              <div id="help-block-share-description" hidden>Please enter your name and/or the name of your puppet.</div>
               <div id="help-block-share-description2" hidden></div>

            </div>
			
            <div id="shareAgreement"><div id="help-block-share-agreement" hidden>Check the box to upload the picture.</div>
              <input type="checkbox" id="bx"  > By submitting this picture, I agree to grant Puppetry Arts New York full rights to use and publish this picture on the websites of Puppetry Arts New York and other publications related to Puppetry Arts New York.  The full rights granted to Puppetry Arts include, but are not limited to, the right to use and publish any and all persons’ portraits or images shown in the picture on the websites of Puppetry Arts New York and other publications related to Puppetry Arts New York, and a permanent, irrevocable, non-exclusive, worldwide license for any and all copyrights in the picture lasting for the full terms of any such copyrights.  I represent and warrant that I have the legal right to grant the rights I am hereby granting. </input> 
              
            </div>

            <div id="attachment">
				<br>
              Select image to upload:
              <input type="file" name="fileToUpload" id="fileToUpload">
              <div id="help-block-share-file" hidden>Please select a file to upload.</div>
            </div>  
				
                <input type="submit" value="Upload" id="ide" name="submit" class="closebtn">
          </form>
</div>
          <script type="text/javascript">

                          var shareError = 0;
                //share key press for description
                  $("#sharebody").keypress(function() {
                    var description = $("#sharebody").val();
                    if (description.length > 100) {
                      shareError = 1;
                      $("#shareDescription").addClass("has-error");
                      $("#sharebody").addClass("form-control");
                      $("#help-block-share-description2").addClass("help-block");
                      var total = 100 - letter.length;
                      $("#help-block-share-description2").text("Letter can only be 100 characters or less. You are " + total + " characters over.");
                      $("#help-block-share-description").removeClass("help-block");
                    }  else if(description.length < 100) {
                      shareError = 0;
                      $("#help-block-share-description").removeClass("help-block");
                      $("#sharebody").removeClass("form-control");
                      $("#shareDescription").removeClass("has-error");
                      $("#help-block-share-description2").removeClass("help-block");

                    }
                  });                   

                //submit the work
                $("#ide").click(function(e){
                        //check for text length in text field limit to 500
                        var description = $("#sharebody").val();
                        if(description.length == 0) {
                          shareError = 1;
                          $("#sharebody").addClass("form-control");
                          $("#shareDescription").addClass("has-error");
                          $("#help-block-share-description").addClass("help-block");
                        } 
                        //check for checkbox
                        if(document.getElementById("bx").checked) {
                          $("#bx").removeClass("form-control");
                          $("#shareAgreement").removeClass("has-error");
                          $("#help-block-share-agreement").removeClass("help-block");
                          shareError = 0;
                        } else {
                          shareError = 1;
                          $("#bx").addClass("form-control");
                          $("#shareAgreement").addClass("has-error");
                          $("#help-block-share-agreement").addClass("help-block");

                        }

                        if($("#fileToUpload").val() != "") {
                          shareError = 0;
                          $("#attachment").removeClass("has-error");
                          $("#help-block-share-file").removeClass("help-block");

                        } else {
                          shareError = 1;
                          $("#attachment").addClass("has-error");
                          $("#help-block-share-file").addClass("help-block");


                        }
                        if(shareError != 0) {
                              e.preventDefault();


                        } 
                   });//end of share code


          </script>
   </body>





    </html>

