// JavaScript Document
var tasklist = {
	tasks: [],									// array to hold Task objects
	storage: getTaskStorage("tasks_11"),		// storage object
	displayDiv: null,							// div that displays tasks
	deletClickHandler: null,					// delete click event handler
	load: function() {
		"use strict";
		if (this.tasks.length === 0) {
			tasklist.tasks = this.storage.get();
		}
	},
	save: function() {
		"use strict";
		this.storage.set(this.tasks);
	},
	sort: function() {
		"use strict";
		this.tasks.sort();
	},
	add: function(task) {
		"use strict";
		this.tasks.push(task.toString());		// call the custom toString
	},
	delete: function(i) {
		"use strict";
		this.sort();
		this.tasks.splice(i, 1);
	},
	clear: function() {
		"use strict";
		this.tasks.length = 0;
		this.storage.clear();
		this.displayDiv.innerHTML = "";
	},
	display: function() {
		"use strict";
		var html = "";
		this.sort();
		
		// create and load html string from sorted array
		for (var i in this.tasks) {
			"use strict";
			html = html.concat("<p>");
			html = html.concat("<a href='#' title='", i, "'>Delete</a>");
			html = html.concat(this.tasks[i]);
			html = html.concat("</p>");
		}
		this.displayDiv.innerHTML = html;
		
		// get links and add click event handlers
		var links = this.displayDiv.getElementsByTagName("a");
		for (var i = 0; i < links.length; i++) {
			links[i].onclick = this.deletClickHandler;
		}
	}
};