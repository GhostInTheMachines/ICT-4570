// JavaScript Document
var Task = function(task) {
	"use strict";
	this.text = task;
};
Task.prototype.isValid = function() {
	"use strict";
	if (this.text === "") { return false; }
	else { return true; }
};
Task.prototype.toString = function() {
	"use strict";
	// capitalize the first letter of the task text
	var first = this.text.substr(0,1);
	return first.toUpperCase() + this.text.substr(1);
};