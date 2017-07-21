// JavaScript Document
var $ = function(id) { return document.getElementById(id); };

var createRollover = function(imgTag, secondUrl, secondAlt) {
	"use strict";
	// store first image info
	var firstUrl = imgTag.src;
	var firstAlt = imgTag.alt;
	
	// preload second image
	var image = new Image();
	image.src = secondUrl;
	
	// create event handlers
	var mouseover = function() {
		"use strict";
		imgTag.src = secondUrl;
		imgTag.alt = secondAlt;
	};
	
	var mouseout = function() {
		imgTag.src = firstUrl;
		imgTag.alt = firstAlt;
	};
	
	// attach event handlers
	evt.attach(imgTag, "mouseover", mouseover);
	evt.attach(imgTag, "mouseout", mouseout);
};

window.onload = function() {
	"use strict";
	createRollover($("img1"), "images/hero.jpg", "Hero photo");
	createRollover($("img2"), "images/deer.jpg", "Deer near lodge");
};