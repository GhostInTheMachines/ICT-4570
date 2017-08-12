/*
*  Name: 		Dennis Kimble
*  Filename: 	kimble_dennis_assignment05.js
*/
var $ = function(id) { return document.getElementById(id);};
// store globals
var canvas = $("drawing");
var ctx = canvas.getContext("2d");
var boxWidth = 0;
var boxHeight = 0;
var startX = 0, startY = 0;


// calculate offset from top and left of document
// This example from StackOverflow seemed to make the most sense
// can be found at: https://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
};

// draw rectangle from inputs whether
// they originate from keyboard or mouse
var drawRectangle = function( width, height, x = 0, y = 0 ) {
	
	ctx.fillStyle = "red";
	ctx.lineWidth = 5;
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.strokeRect( x, y, width, height);
};

// calculate area and perimeter of rectangle
var calc = function getarea() {
	"use strict";
	var wid = $('wid').value;
	var hgt = $('hgt').value;
	var area = wid * hgt;
	var perim = (wid * 2) + (hgt * 2);
	
	// draw rectangle
	drawRectangle(wid, hgt, startX, startY);
					
	$('area').innerHTML = area;
	$('perim').innerHTML = perim;
};

// handle mouse move co-ordinates
var createClickBox = function(clickZone) {
	"use strict";
<<<<<<< HEAD
	var endX = 0;
	var endY = 0;
	// Offset from top and left of document
	var offsetTopLeft = getCoords(clickZone);
=======
	// console.dir(clickZone);
	// store dimensions
	var boxWidth = 0;
	var boxHeight = 0;
>>>>>>> Revised: JS with updated event handlers
	
	
	// create event handlers
	// This is the handler for the MouseDown movement
	var mousedown = function() {
<<<<<<< HEAD
		startX = event.x - offsetTopLeft.left; // X position - left border
		startY = event.y - offsetTopLeft.top;  // Y position - top border
		boxWidth = Math.abs(startX);
		boxHeight = Math.abs(startY);
=======
		console.dir(event);  // looking for the event
		startX = event.clientX;
		startY = event.clientY;
		alert("MouseClick at \tX: " + startX + "\n\t\t\t\tY: " + startY);	
>>>>>>> Revised: JS with updated event handlers
	};
	
	// You can tell by the name but to state it explicitly
	// This is the handler for the release of the mouse
	var mouseup = function() {
<<<<<<< HEAD
		endX = event.x - offsetTopLeft.left;
		endY = event.y - offsetTopLeft.top;
		boxWidth += Math.abs(endX);
		boxHeight += Math.abs(endY);
		$("wid").value = boxWidth;
		$("hgt").value = boxHeight;
	};
	
	// attach event handlers
	clickZone.addEventListener("mousedown", mousedown);
	clickZone.addEventListener("mouseup", mouseup);
=======
		//startY = clickZone.clientY;
		//alert("Mouse Is Released at: " + startY);
	};
	
	// attach event handlers
	evt.attach(clickZone, "mousedown", mousedown);
	//evt.attach(clickZone, "mouseup", mouseup);	
>>>>>>> Revised: JS with updated event handlers
};


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
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

window.onload = function() {
	"use strict";
	var btnCalc = $("do_calc");
	createClickBox($("drawing"));
	btnCalc.addEventListener("click", validateDimensions);
	$("wid").addEventListener("click", clearForm);
	$("hgt").addEventListener("click", clearForm);
};