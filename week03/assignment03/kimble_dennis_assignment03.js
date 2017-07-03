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

// A function to collect all the vote counts and return an Array
// Ordered by candidate, of their vote counts.
var getCandidateNamesAndVotes = function() {
	// associative array with names as keys
	var candidateNameArray = [];
	candidateNameArray[$("candidate1").value] = $("votes1").value;
	candidateNameArray[$("candidate2").value] = $("votes2").value;
	candidateNameArray[$("candidate3").value] = $("votes3").value;
	
	return candidateNameArray;
};

// A function which takes an Array of numbers as a parameter, and returns the sum.
var returnSum = function(numArray) {
	var sum = 0;
	for (var x in numArray) {
		sum += numArray[x];
	}
	return sum;
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
		percentArray[x] = toPercent(numArray[x] / returnSum(numArray));
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
	var isValid = true;
	
	if ( ($("candidate1").value === "") || ($("candidate2").value === "") || ( $("candidate3").value === "") ) {
			$("candidate1_error").firstChild.nodeValue = "No boxes can be blank";
			$("candidate2_error").firstChild.nodeValue = "No boxes can be blank";
			$("candidate3_error").firstChild.nodeValue = "No boxes can be blank";
			isValid = false;
		// tested for blank values in candidate name boxes
		} else {
			$("candidate1_error").firstChild.nodeValue = "*";
			$("candidate2_error").firstChild.nodeValue = "*";
			$("candidate3_error").firstChild.nodeValue = "*";
		}
	if ( (isNaN($("votes1").value)) || (isNaN($("votes2").value)) || (isNaN($("votes3").value)) ) {
			$("vote1_error").firstChild.nodeValue = "All votes must be numeric";
			$("vote2_error").firstChild.nodeValue = "All votes must be numeric";
			$("vote3_error").firstChild.nodeValue = "All votes must be numeric";
			isValid = false;
		// tested that vote is numeric
		} else {
			$("vote1_error").firstChild.nodeValue = "*";
			$("vote2_error").firstChild.nodeValue = "*";
			$("vote3_error").firstChild.nodeValue = "*";
		}
	if ( ($("votes1").value === "") || ($("votes2").value === "") || ( $("votes3").value === "") ) {
			$("vote1_error").firstChild.nodeValue = "No boxes can be blank";
			$("vote2_error").firstChild.nodeValue = "No boxes can be blank";
			$("vote3_error").firstChild.nodeValue = "No boxes can be blank";
			isValid = false;
		// tested for blank values in voter boxes
		} else {
			$("vote1_error").firstChild.nodeValue = "*";
			$("vote2_error").firstChild.nodeValue = "*";
			$("vote3_error").firstChild.nodeValue = "*";
		}
	if ( ($("votes1").value < 0) || ( $("votes2").value < 0 ) || ( $("votes3").value < 0 ) ) {
			$("vote1_error").firstChild.nodeValue = "Number must be positive or zero";
			$("vote2_error").firstChild.nodeValue = "Number must be positive or zero";
			$("vote3_error").firstChild.nodeValue = "Number must be positive or zero";
			isValid = false;
		// tested that number is positive
		} else {
			$("vote1_error").firstChild.nodeValue = "*";
			$("vote2_error").firstChild.nodeValue = "*";
			$("vote3_error").firstChild.nodeValue = "*";
		}
	if (!isValid) {
		return;
	}

	// if all the checks pass, process the form
	var rawVotes = [];
		rawVotes[0] = parseInt($("votes1").value);
		rawVotes[1] = parseInt($("votes2").value);
		rawVotes[2] = parseInt($("votes3").value);
	var votePercents = returnPercentArray(rawVotes);
	var namesAndVotes = getCandidateNamesAndVotes();
	
	setDate();
	
	// set total text box
	$("total_votes").firstChild.nodeValue = returnSum(rawVotes);
	
	// set candidate one name and vote percent
	$("candidate_one").firstChild.nodeValue = $("candidate1").value;
	$("percent1").firstChild.nodeValue =  votePercents[0];
	
	// set candidate one name and vote percent
	$("candidate_two").firstChild.nodeValue = $("candidate2").value;
	$("percent2").firstChild.nodeValue =  votePercents[1];
	
	// set candidate one name and vote percent
	$("candidate_three").firstChild.nodeValue = $("candidate3").value;
	$("percent3").firstChild.nodeValue =  votePercents[2];	
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

var setDate = function() {
	$("date_at_click").value = isodate;
};

window.onload = function() {
	$("calculate").onclick = processVotes;
	$("candidate1").focus();
	
};


