// JavaScript Document
var $ = function(id) { "use strict"; return document.getElementById(id); };

var addToTaskList = function() {
	"use strict";
	var taskTextbox = $("task");
	var newTask = new Task(taskTextbox.value);
	if (newTask.isValid()) {
		tasklist.add(newTask);
		tasklist.save();
		tasklist.display();
		taskTextbox.value = "";
	} else {
		alert("Please enter a task.");
	}
	taskTextbox.focus();
};
var clearTaskList = function() {
	"use strict";
	tasklist.clear()
	$("task").focus();
};
var deleteFromTaskList = function() {
	"use strict";
	tasklist.delet(this.title);  // 'this' = clicked link
	tasklist.save();
	tasklist.display();
	$("task").focus();
};

window.onload = function() {
	"use strict";
	$("add_task").onclick = addToTaskList;
	$("clear_tasks").onclick = clearTaskList;
	
	tasklist.deleteClickHandler = deleteFromTaskList;
	tasklist.displayDiv = $("tasks");
	
	tasklist.load();
	tasklist.display();
	$("task").focus();
};


