/*
*  Name: 		Dennis Kimble
*  Filename: 	library_event.js
* This code has been pulled from Murach's JavaScript chapter 13
*/
var evt = {
	attach: function(node, eventName, func) {
		"use strict";
		if (node.addEventListener) {
			node.addEventListener(eventName, func);
		} else if (node.attachEvent) {
			node.attachEvent("on" + eventName, func);
		}
	},
	detach: function(node, eventName, func) {
		"use strict";
		if (node.removeEventListener) {
			node.removeEventListener(eventName, func);
		} else if (node.detachEvent) {
			node.detachEvent("on" + eventName, func);
		}
	},
	preventDefault: function(e) {
		"use strict";
		e = e || window.event;
		if (e.preventDefault) { e.preventDefault(); }
		else { e.returnValue = false; }
	}
};