$(document).ready(function() {
    //removes the # from url after click on links //TODO: Need to make it change based on page and content
    $(window).on('hashchange', function(e){
    	history.replaceState ("", document.title, e.originalEvent.oldURL);
    });

    function isValidEmailAddress(emailAddress) {
    	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    	return pattern.test(emailAddress);
    };


    /**
    We have an issue where the right col of the bottom nav won't align with the left column, so I am using a interval 
    */
    var pullDown = function () {
		//for each element that is classed as 'pull-down', set its margin-top to the difference between its own height and the height of its parent
		var now_tab = $(".main.tab-content div.main.tab-pane.active").height();
		var count = 0;
		var myVar = setInterval(function () {
			var newHeight = $(".main.tab-content div.main.tab-pane.active").height();
			if((now_tab !== newHeight) && newHeight !== 0) {
				now_tab = newHeight;
				var sideBar = $("#sidebargroup").height();
				var mainContent = now_tab;
				var homeNav = $(".home-nav").height();
				var total = mainContent + homeNav;
				var height = 0;
				if(sideBar > total) {
					height =  sideBar - total;
				} else {
					height = 0;
				}
				$('.pull-down').css('margin-top', height);
			} else{
				var sideBar = $("#sidebargroup").height();
				var mainContent = $(".main.tab-content div.main.tab-pane.active").height();
				var homeNav = $(".home-nav").height();
				var total = mainContent + homeNav;
				var height = 0;
				if(sideBar > total) {
					height =  sideBar - total;
				} else {
					height = 0;
				}
				$('.pull-down').css('margin-top', height);
			} 
		}, 1000);    		
	};

	//calling the pull down
	//pullDown();

	//Function to remove the active class from the tabs and tab content for the non tabs that are not part of bootstrap
	var removeActive= function (){
		$("#mainTabs li.active").removeClass("active");
		$(".main.tab-content .main.tab-pane.active").removeClass("active");
	};

	//When a different page needs to be loaded, we change the background. Also, the header as well. We also kill the resources (e.g. music, games) when
	//we change pages
	var changeBackground = function(backgroundFile){
		$( "html").css( {backgroundImage : 'url("'+backgroundFile+'")'});
		$( "body").css( {backgroundImage : 'url("'+backgroundFile+'")'});
		changeTuffyHeader();
		if(audioElement != null) {
			audioElement.pause();
			audioElement.remove();
		}
		if(songElement != null) {
			songElement.removeClass("active");
		}
		$("#music-cover").attr("src",'music/cd_cover.png');
	};

//slider variables
var makeTakeSlider;
var makeTakeActivitySlider;
var gamesListSlider;
var videosListSlider;
var gallerySlider;
var galleryActivitySlider;

//audio
var audioElement = null;
var songElement = null;

//all backgrounds
var gamesBackground = 'backgrounds/bg_bl1.png';
var musicBackground = 'backgrounds/bg_go.png';
var videosBackground = 'backgrounds/bg_gr2.png';
var galleryBackground = 'backgrounds/bg_re1.png';
var cdBackground = 'backgrounds/bg_re2.png';
var makentakesBackground = 'backgrounds/bg_go2.png';
var communityBackground = 'backgrounds/bg_bl2.png';
var parentsTeachersBackground = 'backgrounds/bg_pu2.png';
var aboutBackground = 'backgrounds/bg_re3.png';
var contactBackground = 'backgrounds/bg_gr1.png';
var homeBackground ='backgrounds/bg_bl.png';
var appBackground =  'backgrounds/bg_pi1.png';
var tuffyBackground= 'backgrounds/bg_gr2.png';
var poedyBackground= 'backgrounds/bg_go2.png';
var pamBackground= 'backgrounds/bg_or2.png';
var arleeBackground= 'backgrounds/bg_re2.png';
var timBackground= 'backgrounds/bg_bl1.png';
var tootsBackground= 'backgrounds/bg_vi1.png';
var mikeBackground= 'backgrounds/bg_pu1.png';

var backgroundArray = [gamesBackground, musicBackground, videosBackground, galleryBackground, cdBackground, makentakesBackground, communityBackground, parentsTeachersBackground, 
aboutBackground, contactBackground, homeBackground, appBackground, tuffyBackground, poedyBackground, pamBackground, arleeBackground, timBackground, tootsBackground, mikeBackground       
];


//global value to hold random number for changing header, so we would always change for a unique Tuffy
var globalRandom = 0;
//Change the Tuffy header
var changeTuffyHeader = function () {
	var tuffyImages = ["header/tuffy_header.png","header/tuffyheader_2.png","header/tuffyheader_3.png","header/tuffyheader_4.png", "header/tuffyheader_5.png"];
	var random = Math.floor((Math.random() * tuffyImages.length));
	while(globalRandom === random) {
		random = Math.floor((Math.random() * tuffyImages.length));
	}
	globalRandom = random;
	$(".tuffy-header").attr("src",tuffyImages[random]);
};

//app page 
var appBanner = function () {
	$("a#tuffy-app").click(function() {
		removeActive();
		$("li.app-nav").addClass("active");
		$("#app").addClass("active");
		changeBackground(appBackground);
	});
}

	//Loads the pages and the event listeners  after the load 
	$( "#home" ).load( "home.html" , function () {
		$("a#home-games-icon").on("click",function() {
			removeActive();
			$("li.games-nav").addClass("active");
			$("#games").addClass("active");
			changeBackground(gamesBackground);
			gamesListSlider.reloadSlider();
		});

		$("a#home-music-icon").on("click",function() {
			removeActive();
			$("li.music-nav").addClass("active");
			$("#music").addClass("active");
			changeBackground(musicBackground);
		});

		$("a#home-videos-icon").on("click",function() {
			removeActive();
			$("li.videos-nav").addClass("active");
			$("#videos").addClass("active");
			changeBackground(videosBackground);
			videosListSlider.reloadSlider();
		});
		$("a#home-makentakes-icon").on("click",function() {
			removeActive();
			$("li.makentakes-nav").addClass("active");
			$("#makentakes").addClass("active");
			changeBackground(makentakesBackground);
			makeTakeSlider.reloadSlider();
			makeTakeActivitySlider.reloadSlider();

		});
		$("a#home-cd-icon").on("click",function() {
			removeActive();
			$("#cd").addClass("active");
			changeBackground(cdBackground);
		});


		$("#tuffyprofile" ).load("tuffyprofile.html", function () {
			$("#poedyprofile" ).load("poedyprofile.html", function () {
				$("#pamprofile" ).load("pamprofile.html", function () {
					$("#arleeprofile" ).load("arleeprofile.html", function () {
						$("#timprofile" ).load("timprofile.html", function () {
							$("#tootsprofile").load("tootsprofile.html", function () {
								$("#mikeprofile" ).load( "mikeprofile.html", function (){
									var letterErrors = 0;
									$("#letterbody").keypress(function() {
										var letter = $("#letterbody").val();
										if (letter.length > 500) {
											letterErrors = 1;
											$("#emailLetter").addClass("has-error");
											$("#letterbody").addClass("form-control");
											$("#help-block-letter-2").addClass("help-block");
											var total = 500 - letter.length;
											$("#help-block-letter-2").text("Letter can only be 500 characters or less. You are " + total + " characters over.");
											$("#help-block-letter-1").removeClass("help-block");
										}  else if(letter.length < 500) {
											$("#help-block-letter-1").removeClass("help-block");
											$("#letterbody").removeClass("form-control");
											$("#emailLetter").removeClass("has-error");
											$("#help-block-letter-2").removeClass("help-block");

										}
									});
								//send letter
								var charGlobal = "";
								$(".sendLetter").click(function(){
									//clean up
								 	$( "#mailform" ).trigger("reset");
				                 	$("#hide").hide();
				                 	$(".nameLetter").removeClass("has-error");
				              		$("#help-block-name").removeClass("help-block");
				              		$("#signOff.input").removeClass("form-control");
				              		$("#help-block-name2").removeClass("help-block");
				              		$("#emailLetter").removeClass("has-error");
				              		$("#help-block-letter-2").removeClass("help-block");
				              		$("#help-block-letter-1").removeClass("help-block");
				              		$("#letterbody").removeClass("form-control");
				              		$("#help-block-email").removeClass("help-block");

									var selection = $(this).attr('char');
									charGlobal = selection; 
									$(".WriteTo").text("Write a Letter to "+ selection +"!");
									$(".LetterTo").text("Dear " + selection + ",");
									$(".closebtn.send").text("Send to " + selection);
									$("#characterLetter").val(selection);
									$(".anotherLetter").text("Write another letter to " + selection);
									$("#emailLabel").text("Have an Email so "+selection+" can reply back? (Optional)");
								});
								//submit the the letter
								$(".closebtn.send").click(function(e){
				              	//check for valid email if checked
				              	if(document.getElementById("box").checked) {
				              		var email = $("#hide").val();
				              		if(!isValidEmailAddress(email)) {
				              			letterErrors = 1;
				              			//add validation error
				              			$("#hide").addClass("form-control");
				              			$("#emailParent").addClass("has-error");
				              			$("#help-block-email").addClass("help-block");
				              		} else {
				              			$("#help-block-email").removeClass("help-block");
				              			letterErrors = 0;
				              		}
				              	} else {
				              		$("#hide").hide();
				              		$("#emailParent").removeClass("has-error");
				              		$("#help-block-email").removeClass("help-block");
				              		$("#hide").removeClass("form-control");
				              		letterErrors = 0;
				              		$("#hide").text("");
				              	}
				              	//check for text length in text field limit to 500
				              	var letter = $("#letterbody").val();
				              	if(letter.length == 0) {
				              		letterErrors = 1;
				              		$("#letterbody").addClass("form-control");
				              		$("#emailLetter").addClass("has-error");
				              		$("#help-block-letter-2").addClass("help-block");
				              		$("#help-block-letter-1").removeClass("help-block");
				              	} else if (letter.length < 500){
				              		$("#emailLetter").removeClass("has-error");
				              		$("#help-block-letter-2").removeClass("help-block");
				              		$("#help-block-letter-1").removeClass("help-block");
				              		$("#letterbody").removeClass("form-control");
				              	}
				              	//check for name
				              	var name = $("#signOff.input").val();
				              	if(name == 0) {
				              		letterErrors = 1;
				              		$(".nameLetter").addClass("has-error");
				              		$("#help-block-name").addClass("help-block");
				              		$("#signOff.input").addClass("form-control");
				              	} else if(name > 40) {
				              		letterErrors = 1;
				              		$(".nameLetter").addClass("has-error");
				              		$("#help-block-name2").addClass("help-block");
				              		$("#signOff.input").addClass("form-control");
				              	} else {
				              		$(".nameLetter").removeClass("has-error");
				              		$("#help-block-name").removeClass("help-block");
				              		$("#signOff.input").removeClass("form-control");
				              		$("#help-block-name2").removeClass("help-block");
				              	}
				              	if(letterErrors == 0) {
				              		$.post("letterSubmit.php",$( "#mailform" ).serialize(),
				              			function(data,status){
				              			});
				                      //clear the fields for the next letter
				                      $( "#mailform" ).trigger("reset");
				                      $("#hide").hide();
				                      $(".anotherLetter").attr("char", charGlobal);
				                    } else {
				                    	e.preventDefault();
				                    }
				           });//end of submit letter code

							$(".closebtn.close").click(function (){
								 $( "#mailform" ).trigger("reset");
				                 $("#hide").hide();

							});//reset form if writing letter is closed

$( "#games" ).load( "games.html", function(){
	gamesListSlider = $('.gamesChooserSlider').bxSlider({
		minSlides: 3,
		maxSlides: 3,
		slideWidth: 400,
		slideMargin: 5,
		touchEnabled: false
	});
	$(".gamesChooserSlider img").click(function(){
		var selection = $(this).attr('id'); 
												//$("#games #activity").load("games/"+selection+".html");	
												window.open("games/"+selection+".html",'_blank');	
											});
											//default game to be shown
											$("#games #activity").load("games/game1.html", function () {
											});	

										//when click, this reloads the slider and changes to games background
										$(".games-nav").click(function() {
											$('[data-toggle="tab"][href="#games"]').on('shown.bs.tab', function() {
												gamesListSlider.reloadSlider();
												changeBackground(gamesBackground); 
											});
										});	

										$( "#music" ).load( "music.html", function (){

											//controls the music
											$(".music-list a").click(function() {
												var selection = $(this).attr('id');
												if($(this).attr("class") === "active") {
													audioElement.pause();
													audioElement.remove();
													$(this).removeClass("active");
													songElement = null;
													$("#music-cover").attr("src",'music/cd_cover.png');
												} else {
													var before = $(".music-list a.active"); 
													before.removeClass("active");
													if(audioElement != null) {
														audioElement.pause();
														audioElement.remove();
													}
													songElement = $(this);
													$(this).addClass("active");
													$("#music-cover").attr("src",'music/' + selection +'.png');
													audioElement = document.createElement('audio');
													audioElement.setAttribute('src', 'music/' + selection +'.m4a');
													audioElement.setAttribute('autoplay', 'autoplay');
													audioElement.play();			
												}

											});
											

											$( "#videos" ).load( "videos.html", function() {
												videosListSlider = $('.videosChooserSlider').bxSlider({
													minSlides: 3,
													maxSlides: 3,
													slideWidth: 300,
													slideHeight: 125,
													slideMargin: 10,
													// touchEnabled: false
													touchEnabled: false
												});
												// $( "#videos").on('click', '.videosChooserSlider img', function(){
												// 	                                                debugger
												// 	                                                var selection = $(this).attr('id'); 
												// 	                                                $("#videos #activity").empty();
												// 	                                                $("#videos #activity").load("videos/"+selection+".html");   
												// 	                                            });
												$(".videosChooserSlider img").click(function(){
													var selection = $(this).attr('id'); 
													$("#videos #activity").empty();
													$("#videos #activity").load("videos/"+selection+".html");	
												});

													// 	//default video to be shown
													$("#videos #activity").load("videos/mommy.html", function () {
													});	

												//when click, this reloads the slider and changes to games background
												$(".videos-nav").click(function() {
													$('[data-toggle="tab"][href="#videos"]').on('shown.bs.tab', function() {
														changeBackground(videosBackground); 
														videosListSlider.reloadSlider();
													});
												});
											$( "#cd" ).load( "cd.html", function () {
												$( "#makentakes" ).load( "makesNtakes.html", function () {
													makeTakeSlider = $('.makentakeChooserSlider').bxSlider({
														minSlides: 4,
														maxSlides: 4,
														slideWidth: 200,
														slideMargin: 10
													});
													$(".makentakeChooserSlider img").click(function(){
														var selection = $(this).attr('id'); 
														makeTakeActivitySlider.destroySlider();
														$("#makentakes #activity").empty();
														$("#makentakes #activity").load("makentakes/"+selection+".html", function () {
															makeTakeActivitySlider = $('#makentakes .activity-set').bxSlider({
																infiniteLoop: false,
																hideControlOnEnd: true,
																minSlides: 1,
																maxSlides: 1,
																slideWidth: 941,
																touchEnabled: false
															});
														});		
													});
													//default activity to be shown
													$("#makentakes #activity").load("makentakes/instructions.html", function () {
														makeTakeActivitySlider = $('#makentakes .activity-set').bxSlider({
															infiniteLoop: false,
															hideControlOnEnd: true,
															minSlides: 1,
															maxSlides: 1,
															slideWidth: 941,
															touchEnabled: false
														});
													});	


													$(".makentakes-nav").click(function() {
														$('[data-toggle="tab"][href="#makentakes"]').on('shown.bs.tab', function() {
															changeBackground(makentakesBackground); 
															makeTakeActivitySlider.reloadSlider();
															makeTakeSlider.reloadSlider();
														});
													});	

													$( "#gallery" ).load( "gallery.html", function () {
														gallerySlider = $('.albumsChooserSlider').bxSlider({
															minSlides: 3,
															maxSlides: 3,
															slideWidth: 400,
															slideMargin: 5,
															touchEnabled: false
														});
														$(".albumsChooserSlider img").click(function(){
															var selection = $(this).attr('id'); 
															galleryActivitySlider.destroySlider();
															$("#gallery #activity").empty();
															$("#gallery #activity").load("gallery/"+selection+".html", function () {
																galleryActivitySlider = $('#gallery .activity-set-gallery').bxSlider({
																	infiniteLoop: true,
																	hideControlOnEnd: false,
																	minSlides: 1,
																	maxSlides: 1,
																	slideWidth: 600,
																	touchEnabled: false
																	
																});
															});		
														});
														//default album to be shown
														$("#gallery #activity").load("gallery/intro.html", function () {
															galleryActivitySlider = $('#gallery .activity-set-gallery').bxSlider({
																infiniteLoop: true,
																hideControlOnEnd: false,
																minSlides: 1,
																maxSlides: 1,
																slideWidth: 600,
																touchEnabled: false		
															});
														});	
														$( "#app" ).load( "app.html", function () {
															$( "#community" ).load( "community.html", function () {
																$( "#teacherparent" ).load( "parents_teachers.html", function () {
																	$("#about").load("about.html", function (){
																		$( "a#parents-teachers-link" ).click(function() {
																			removeActive();
																			$("#teacherparent").addClass("active");
																			$("#prekto1st").addClass("active");
																			$("a[href='#prekto1st']").addClass("active");
																			changeBackground(parentsTeachersBackground); 
																		});

																		$( "a#community-link" ).click(function() {
																			removeActive();
																			$("#community").addClass("active");
																			$("#events").addClass("active");
																			$("a[href='#events']").addClass("active");
																			changeBackground(communityBackground);
																		});

																		//global
																		appBanner();
																		$("a#home-gallery-icon").on("click",function() {
																			removeActive();
																			$("li.gallery-nav").addClass("active");
																			$("#gallery").addClass("active");
																			changeBackground(galleryBackground);
																			gallerySlider.reloadSlider();
																			galleryActivitySlider.reloadSlider();
																		});





																	});//end of about // last nested page
																}); //end of teacher parent
															});//community

														}); //app 
													}); //gallery 
												});  //make n takes
											});// end of CD
									});//end of videos
									});//end of music
									}); //end of games
								}); //end of mike	
							});	//end of toots
						});	//end of tim
					}); //end of arlee
				});//end of pam
			});	//end of poedy
			}); //tuffy


	/**
	Left hand panel character
	*/
	$(".tuffy-profile-icon").click(function() {
		removeActive();
		$("#tuffyprofile").addClass("active");
		changeBackground(tuffyBackground);
	});	
	
	$(".poedy-profile-icon").click(function() {
		removeActive();
		$("#poedyprofile").addClass("active");
		changeBackground(poedyBackground);
	});	
	
	$(".pam-profile-icon").click(function() {
		removeActive();
		$("#pamprofile").addClass("active");
		changeBackground(pamBackground);
	});	
	
/*			$(".arlee-profile-icon").click(function() {
		removeActive();
		$("#arleeprofile").addClass("active");
		changeBackground(arleeBackground);
	});	*/

$(".tim-profile-icon").click(function() {
	removeActive();
	$("#timprofile").addClass("active");
	changeBackground(timBackground);
});	

/*			$(".toots-profile-icon").click(function() {
		removeActive();
		$("#tootsprofile").addClass("active");
		changeBackground(tootsBackground);
	});	

	$(".mike-profile-icon").click(function() {
		removeActive();
		$("#mikeprofile").addClass("active");
		changeBackground(mikeBackground);
	});		*/	

});

	//sets the tooltip event
	$("body").tooltip({ selector: '[data-toggle=tooltip]' }); 


	//footer links
	$( "a#contact-link" ).click(function() {
		removeActive();
		$("#about").addClass("active");
		$('html, body').animate({
			scrollTop: $(".home-nav").offset().top
		}, 100);
		changeBackground(aboutBackground);
	});

	$( "a#about-link" ).click(function() {
		removeActive();
		$("#about").addClass("active");
		$('html, body').animate({
			scrollTop: $(".home-nav").offset().top
		}, 100);
		changeBackground(aboutBackground);
	});

	$("a#tuffy-app").click(function() {
		removeActive();
		$("#app").addClass("active");
		changeBackground(appBackground);
	});	

	//nav bar (change background) //bootstrap natually opens pages and etc.
	$(".home-nav").click(function() {
		changeBackground(homeBackground);
	});
	$(".games-nav").click(function() {
		changeBackground(gamesBackground);
	});
	$(".music-nav").click(function() {
		changeBackground(musicBackground);
	});
	$(".videos-nav").click(function() {
		changeBackground(videosBackground);

	});
	$(".gallery-nav").click(function() {
		changeBackground(galleryBackground);
	});

	$(".app-nav").click(function() {
		changeBackground(appBackground);
	});	

//end
});