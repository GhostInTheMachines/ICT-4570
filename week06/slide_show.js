// JavaScript Document
var $ = function(id) { return document.getElementById(id); };

window.onload = function() {
	// create the slideshow object
	var slideshow = createSlideshow();
	
	var slides = [
		{href: "gear.jpg", title: "Fishing Gear"},
		{href: "plane.jpg", title: "Bush Plane"},
		{href: "release.jpg", title: "Catch and Release"},
		{href: "lunch.jpg", title: "Streamside Lunch"},
		{href: "dusk.jpg", title: "Day's End"}
	];
	slideshow.loadImages(slides).startSlideShow($("image"), $("caption"));
	
	$("play_pause").onclick = slideshow.createToggleHandler();
};