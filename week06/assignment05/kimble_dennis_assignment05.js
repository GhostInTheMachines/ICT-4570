/*
*  Name: 		Dennis Kimble
*  Filename: 	kimble_dennis_assignment05.js
*/
	// store dimensions	
var boxWidth = 0;
var boxHeight = 0;

var $ = function(id) { return document.getElementById(id);};

/*var canvas = $("drawing");
var ctx = canvas.getContext("2d");
// ctx.beginPath();
ctx.fillStyle = "red";
ctx.lineWidth = 5;
ctx.strokeStyle = "rgb(0, 0, 0)";
ctx.strokeRect(135, 275, 125, 125);*/

var calc = function getarea() {
	"use strict";
	var wid = $('wid').value;
	var hgt = $('hgt').value;
	alert("Height is: " + hgt + "Width is: " + wid);
	var area = wid * hgt;
	var perim = (wid * 2) + (hgt * 2);
					
	$('area').innerHTML = area;
	$('perim').innerHTML = perim;
};

// *********************************************
//  LOOK HERE! (This is the MouseMove Handler)
// **********************************************
var createClickBox = function(clickZone) {
	"use strict";
	var startX = 0, endX = 0;
	var startY = 0, endY = 0;
	
	// create event handlers
	// This is the hanler for the MouseDown movement
	var mousedown = function() {
		startX = event.x;
		startY = event.y;
		boxWidth = Math.abs(startX);
		boxHeight = Math.abs(startY);
	};
	
	// You can tell by the name but to state it explicitly
	// This is the handler for the release of the mouse
	var mouseup = function() {
		endX = event.x;
		endY = event.y;
		boxWidth += Math.abs(endX);
		boxHeight += Math.abs(endY);
		$("wid").value = boxWidth;
		$("hgt").value = boxHeight;
	};
	
	// attach event handlers
	clickZone.addEventListener("mousedown", mousedown);
	clickZone.addEventListener("mouseup", mouseup);
};
// ******************************************************
// END OF MOUSEMOVE HANDLER
// *******************************************************

// Form validation for width and height
var validateDimensions = function() {
	"use strict";
	var outOfBound = false;
	if ( $("wid").value > 500 || 
	     $("wid").value < 0 ) { outOfBound = true; }	
	if ( $("hgt").value > 500 || 
	     $("hgt").value < 0 ) { outOfBound = true; }
	if (!outOfBound) { 
		calc(); 
	} else {$("error").innerHTML = "Values must be positive and not larger than the canvas";
	}
};
// clear errors and inputs
var clearForm = function() {
	"use strict";
	$("wid").value = "";
	$("hgt").value = "";
	$("error").innerHTML = "";
};

window.onload = function() {
	"use strict";
	var btnCalc = $("do_calc");
	createClickBox($("drawing"));
	btnCalc.addEventListener("click", validateDimensions);
	$("wid").addEventListener("click", clearForm);
	$("hgt").addEventListener("click", clearForm);
};