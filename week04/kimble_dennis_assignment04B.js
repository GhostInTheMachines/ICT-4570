/*	Name:  		Dennis Kimble
*	Filename: kimble_dennis_assignment04B.js
*/

// Variables for date functions
var today = new Date("1948-11-02");
var isodate = toISODate(today);

// Variable for update timout
var timeDelayMs = 5000;  // 5-second delay
var statCounter = 0;     // iterations of voter stats
var timer;				// variable used to clear interval

// A function to look up an HTML element by id and return the element
var $ = function(id) {
	"use_strict";
	return document.getElementById(id);
};

// A function to return an array of elements of a certain class
var $idArray = function(className) {
	"use_strict";
	return document.getElementsByClassName(className);
};

// A function to set the date box on the form
var setDate = function() {
	"use_strict";
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

// update candidate name and party fields on form
var getCandidateNamesAndParties = function() {
	// console.dir(votingData);	// remove after debugging
	
	// Set heading according to object data
	document.getElementsByTagName("h1")[0].innerHTML = votingData.electionDescription +
		": " + votingData.electionId;
	// retrieve names from votingData object and fill in form
	$("candidate1").value = votingData.candidates[0].name;
	$("candidate2").value = votingData.candidates[1].name;
	$("candidate3").value = votingData.candidates[2].name;

	
	// retrieve parties from votingData object and fill in form
	$("party1").value = votingData.candidates[0].party;
	$("party2").value = votingData.candidates[1].party;
	$("party3").value = votingData.candidates[2].party;
	
};



// run validation 
var validateInputs = function() {
	"use_strict";
	var isValid = true;
	var errorMessageIDs = $idArray('error_message');
	var voteIDs			= $idArray('input_vote');
	var candidateIDs	= $idArray('candidate_name');
	
	// errorMessageIDs[idIndex].firstChild.nodeValue = "Must not be a number";
	
	// clear any previous mesages
	for ( var x = 0; x < errorMessageIDs.length; x++ ) {
		errorMessageIDs[x].firstChild.nodeValue = "*";
	}
	
	// Check that name field is not blank
	for (var x = 0; x < candidateIDs.length; x++) {
		if (candidateIDs[x]) {
			var index = (x + 1);
			var idIndex = "candidate" + index + "_error";
			if (candidateIDs[x].value === "") {
				errorMessageIDs[idIndex].firstChild.nodeValue = "Must not be blank";
				isValid = false;
			}
		} else window.open("fatal_error.html");
	}
	
	// check valid votes
	for ( var y = 0; y < voteIDs.length; y++) {
		if (voteIDs[y] ) {
			var index2 = (y + 1);
			var idIndex2 = "vote" + index2 + "_error";
			if ( isNaN(voteIDs[y].value) && (voteIDs[y].value !== "") ) {
				errorMessageIDs[idIndex2].firstChild.nodeValue = "Must be a number";
				isValid = false;
			}
			if (voteIDs[y].value === "") {
				errorMessageIDs[idIndex2].firstChild.nodeValue = "Must not be blank";
				isValid = false;
			}
			if (voteIDs[y].value <= 0 && voteIDs[y].value !== "") {
				errorMessageIDs[idIndex2].firstChild.nodeValue = "Must be greater than zero";
				isValid = false;
			}
				
		} else window.open("fatal_error.html");


	}
	return isValid;
};

// Capitalize first character of keyValue
var capFirst = function(lowerCaseWord) {
	"use_strict";
	return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.substr(1);
};

// A function which takes an Array of numbers as a parameter, and returns the sum.
var returnSum = function(numArray) {
	"use_strict";
	var sum = 0;
	for (var x in numArray) {
		sum += parseInt(numArray[x]);
	}
	return sum;
};

// Collect all the vote counts and return an Array
var getCandidateNamesAndVotes = function() {
	"use_strict";
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
	"use_strict";
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
	"use_strict";
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
	"use_strict";
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

// main function
var processVotes = function() {
	"use_strict";	
	// Set date box after each submit
	if (validateInputs()){
		setDate();
		outputResults();
	}
};

// use votingData voting array to update vote fields
var insertVoteCount = function(array) {
	$("votes1").value = array[0];
	$("votes2").value = array[1];
	$("votes3").value = array[2];
	processVotes();
};

var updateCounter = function() {
	"use strict";
	if (statCounter < votingData.voting.length){
		insertVoteCount(votingData.voting[statCounter++]);
	} else { clearInterval(timer); }
};

// function to update votes on a timer
// until all vote counts have been processed
var updateVotecount = function() {
	"use strict";
	timer = setInterval(updateCounter, timeDelayMs)
};

window.onload = function() {
	"use_strict";
	getCandidateNamesAndParties();
	// insertVoteCount(votingData.voting[0]);
	$("calculate").onclick = updateVotecount;
	
};


