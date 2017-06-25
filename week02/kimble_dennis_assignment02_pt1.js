"use strict"
/*
*  Name: 		Dennis Kimble
*  Filename: 	kimble_dennis_assignment02_pt1.js
*/
// prompt for inputs
var wid = window.prompt("Enter the width of the rectangle");
var hgt = window.prompt("Enter the height of the rectangle");

// calculate area and perimeter
var area = wid * hgt;
var perim = (2 * wid) + (2 * hgt);

// alert with results
window.alert("The area of the rectangle is: " + area + ", The perimeter is: " + perim);