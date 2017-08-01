/*
*  Name: 		Dennis Kimble
*  Filename: 	kimble_dennis_assignment05.js
*/
var $ = function(id) { return document.getElementById(id);};
// canvas globals
var startX = 0, endX = 0;
var startY = 0, endY = 0;
/*var canvas = $("drawing");
var ctx = canvas.getContext("2d");
// ctx.beginPath();
ctx.fillStyle = "red";
ctx.lineWidth = 5;
ctx.strokeStyle = "rgb(0, 0, 0)";
ctx.strokeRect(135, 275, 125, 125);*/

var createClickBox = function(clickZone) {
	"use strict";
	// store dimensions
	var boxWidth = 0;
	var boxHeight = 0;
	
	// create event handlers
	var mousedown = function() {
		alert("Mouse Is Clicked");	
	};
	var mouseup = function() {
		alert("Mouse Is Released");
	};
	
	// attach event handlers
	evt.attach(clickZone, "mousedown", mousedown);
	evt.attach(clickZone, "mouseup", mouseup);
	
	
};
// Form validation for width and height
var validateDimensions = function() {
	"use strict";
	var outOfBound = false;
	if ( document.getElementById("wid").value > 500 || 
	     document.getElementById("wid").value < 0 ) { outOfBound = true; }	
	if ( document.getElementById("hgt").value > 500 || 
	     document.getElementById("hgt").value < 0 ) { outOfBound = true; }
	return outOfBound;
};

var calc = function getarea() {
	"use strict";
	var wid = document.getElementById('wid').value;
	var hgt = document.getElementById('hgt').value;
	var area = wid * hgt;
	var perim = (wid * 2) + (hgt * 2);
					
	document.getElementById('area').innerHTML = area;
	document.getElementById('perim').innerHTML = perim;
};
window.onload = function() {
	createClickBox($("drawing"));
};