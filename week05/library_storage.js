// JavaScript Document
var storagePrototype = {
	get:  function() {
		var str = localStorage.getItem(this.key) || "";
		alert(this.key);  // remove after debugging
		return (str === "") ? [] : str.split("|");
	},
	set:  function(arr) {
		if (Array.isArray(arr)) {
			var str = arr.join("|");
			alert(this.key); // remove after debugging
			localStorage.setItem(this.key, str);
		}
},
	clear: function() { localStorage.setItem(this.key, ""); }
};
var getTaskStorage = function(key) {
	var storage = Object.create(storagePrototype);
	storage.key	= key;
	return key;
};