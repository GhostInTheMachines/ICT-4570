/*	Name:  		Dennis Kimble
*	Filename: kimble_dennis_assignment03.js
*/
"use_strict";
// Variables for date functions
var today = new Date();
var isodate = toISODate(today);

// A function to look up an HTML element by id and return the element
var $ = function(id) {
	return document.getElementById(id);
};

// A function to return an array of elements of a certain class
var $idArray = function(className) {
	return document.getElementsByClassName(className);
};

// A function to set the date box on the form
var setDate = function() {
	$("date_at_click").value = isodate;
};

// Formats the date string
function toISODate(date) { // yyyy-mm-dd
  "use strict";
  var yyyy, mm, dd;
  // JavaScript provides no simple way to format a date-only
  yyyy = "" + date.getFullYear();
  mm = date.getMonth() + 1; // Months go from 0 .. 11
  dd = date.getDate();
  // Need leading zeroes to form the yyyy-mm-dd pattern.
  if (mm < 10) {
    mm = "0" + mm; // This converts it to a string
  }
  if (dd < 10) {
    dd = "0" + dd; // This converts it to a string
  }
  return "" + yyyy + "-" + mm + "-" + dd;
};

// Capitalize first character of keyValue
var capFirst = function(lowerCaseWord) {

	return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.substr(1);
};

// A function which takes an Array of numbers as a parameter, and returns the sum.
var returnSum = function(numArray) {
	var sum = 0;
	for (var x in numArray) {
		sum += parseInt(numArray[x]);
	}
	return sum;
};

// Collect all the vote counts and return an Array
var getCandidateNamesAndVotes = function() {
	
	// Load ids for candidates
	var candidateID = $idArray('candidate_name');
	
	// load votes
	var voteID = $idArray('input_vote');
	
	// Array to return
	var namesAndVotes = [];

	// Create associative array with candidate names as keys
	for (var x = 0; x < candidateID.length; x++ ) {
			var keyValue = candidateID[x].value.toLowerCase();
			namesAndVotes[keyValue] = voteID[x].value;
	}
	
	return namesAndVotes;
};

// Format a number into a percentage
var toPercent = function(decimalNum) {
	// To format a percentage
	// Multiply the number by 100
	decimalNum = decimalNum * 100;
	
	// Convert to a fixed number of decimal places
	decimalNum = decimalNum.toFixed(1);
	
	// Add percent
	decimalNum = decimalNum.concat("%");
	
	return decimalNum;
	
};

// Take Array of numbers as a parameter, and return an array of percentages
var returnPercentArray = function(numArray) {
	var percentArray = [];
	
	// To format a percentage
	for (var x in numArray) {
		percentArray[x] = toPercent(parseInt(numArray[x]) / parseInt(returnSum(numArray)) );
	}
	//alert(percentArray[1]);
	return percentArray;
};

// outputs values to results area of form
//	(a) collect all the counts; 
//	(b) get the sum of all votes; 
//	(c) compute the percentages for each candidate;
//	(d) place that result on the form in the correct locations.
var outputResults = function() {
	// Candidate statistics
	var namesAndVotes = getCandidateNamesAndVotes();
	var votePercents = returnPercentArray(namesAndVotes);

	// Set DOM element ID arrays
	var keyValueName;  // key for candidate names
	var keyValuePercent; // key for candidate percent
	var resultsID = $idArray('result_name'); // load candidate spanIDs
	var percentsID = $idArray('percent_of_total'); // load percent spanIDs
	
	// Load names and percents into results section
	for (var x = 0; x < percentsID.length; x++) {
		// Set candidate names in result section
		keyValueName = capFirst(Object.keys(namesAndVotes)[x]); // Retreive keyname and capitalize first letter
		resultsID[x].firstChild.nodeValue = keyValueName;
		// Set candidate percents in result section
		keyValuePercent = Object.keys(namesAndVotes)[x];
		percentsID[x].firstChild.nodeValue = votePercents[keyValuePercent];
	}
	// Tally and set total text box
	$("total_votes").firstChild.nodeValue = returnSum(namesAndVotes);
};


var processVotes = function() {
	
	// Set date box after each submit
	setDate();
	outputResults();

};

window.onload = function() {
	$("calculate").onclick = processVotes;
	$("candidate1").focus();
	
};


