/*	Name:  		Dennis Kimble
*	Filename: kimble_dennis_assignment03.js
*/
"use_strict";
// variables for date functions
var today = new Date();
var isodate = toISODate(today);

// A function to look up an HTML element by id and return the element
var $ = function(id) {
	return document.getElementById(id);
};
var setDate = function() {
	$("date_at_click").value = isodate;
};

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

// capitalize first character of keyValue
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

// A function to collect all the vote counts and return an Array
// Ordered by candidate, of their vote counts.
var getCandidateNamesAndVotes = function() {
	
	// load ids for candidates
	var candidateID = document.getElementsByClassName('candidate_name');
	
	// load votes
	var voteID = document.getElementsByClassName('input_vote');
	
	// new associative array to return
	var namesAndVotes = [];

	// create associative array with candidate names as keys
	for (var x = 0; x < candidateID.length; x++ ) {
			var keyValue = candidateID[x].value.toLowerCase();
			namesAndVotes[keyValue] = voteID[x].value;
			//alert("Candidate " + Object.keys(namesAndVotes)[x] + " has " + namesAndVotes[keyValue] + " Votes." );
	}
	
	return namesAndVotes;
};



// A function which formats a number into a percentage (see notes for this computation)
var toPercent = function(decimalNum) {
	// To format a percentage
	// Multiply the number by 100
	decimalNum = decimalNum * 100;
	
	// convert to a fixed number of decimal places
	decimalNum = decimalNum.toFixed(1);
	
	// add percent
	decimalNum = decimalNum.concat("%");
	
	return decimalNum;
	
};

// A function which takes an Array of numbers as a parameter, and returns an array of percentages
// To compute a percentage from a vote count, simply divide the candidate's vote count by the total count
var returnPercentArray = function(numArray) {
	var percentArray = [];
	
	// To format a percentage
	for (var x in numArray) {
		percentArray[x] = toPercent(parseInt(numArray[x]) / parseInt(returnSum(numArray)) );
	}
	//alert(percentArray[1]);
	return percentArray;
};


// A function to:
//	(a) collect all the counts; 
//	(b) get the sum of all votes; 
//	(c) compute the percentages for each candidate;
//	(d) place that result on the form in the correct locations.
var processVotes = function() {
	
	// set date box after each submit
	setDate();
	
	// candidate statistics
	var namesAndVotes = getCandidateNamesAndVotes();
	var votePercents = returnPercentArray(namesAndVotes);
	
	// tally and set total text box
	$("total_votes").firstChild.nodeValue = returnSum(namesAndVotes);
	

	// set candidate one name and vote percent
	var keyValueName;  // key for candidate names
	var keyValuePercent; // key for candidate percent
	var resultsID = document.getElementsByClassName('result_name'); // load candidate spanIDs
	var percentsID = document.getElementsByClassName('percent_of_total'); // load percent spanIDs

	// load names and percents into results section
	for (var x = 0; x < percentsID.length; x++) {
		// set candidate names in result section
		keyValueName = capFirst(Object.keys(namesAndVotes)[x]);
		resultsID[x].firstChild.nodeValue = keyValueName;
		// set candidate percents in result section
		keyValuePercent = Object.keys(namesAndVotes)[x];
		percentsID[x].firstChild.nodeValue = votePercents[keyValuePercent];
	}

};

window.onload = function() {
	$("calculate").onclick = processVotes;
	$("candidate1").focus();
	
};


