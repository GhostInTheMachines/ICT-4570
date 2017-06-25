"use strict"
/*
*  Name: 		Dennis Kimble
*  Filename: 	kimble_dennis_assignment02_pt2.js
*/


var calc = function getarea() {
				var wid = document.getElementById('wid').value;
				var hgt = document.getElementById('hgt').value;
				var area = wid * hgt;
				var perim = (wid * 2) + (hgt * 2);
					
				document.getElementById('area').innerHTML = area;
				document.getElementById('perim').innerHTML = perim;
			};
window.onload = function() {
	document.getElementById("do_calc").onclick = calc;
};

