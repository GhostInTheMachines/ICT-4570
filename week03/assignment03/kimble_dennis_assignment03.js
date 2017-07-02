/*	Name:  		Dennis Kimble
*	Filename: kimble_dennis_assignment03.js
*/
/*
Be sure to add JavaScript logic to catch errors, or other, incorrect input and properly handle it:
Unparsable dates and other errors should be reported or corrected upon pressing the calculate button.

Your JavaScript functions should accomplish the following:




A function to collect all the vote counts and return an Array, ordered by candidate, of their vote counts.
A function to (a) collect all the counts; (b) get the sum of all votes; (c) compute the percentages for each candidate; and (d) place that result on the form in the correct locations.
A function to initialize the form by setting the date to the current date, and attaching the click action to the click button.

NOTES:
Please ensure the user sees error text in red
Be sure to handle the following situations explicitly (comment if no code is required):
Input is blank
Number input is not a number
Number input is zero or negative
Date is not parseable (see note below)
Include screenshots of the cases you're handling through JavaScript code.
If you post errors, warnings, or log messages to the console, include the console in the screenshot.
Some browsers enable the input type to be selected to prevent illegal values from being selected. You are welcome to use these, but please remember that browsers are NOT obligated to support these, and some will just treat them as input text fields (so you still need to code the checks).
Remember that getting elements by id, class, or tag name is pretty straightforward.


input fields of type date need an ISO-formatted date. Unfortunately, JavaScript doesn't have a function to take care of this (yet). The following function will return a date as an ISO string, suitable to assigning to the input field's value property. 
*/
"use_strict";
// A function to look up an HTML element by id and return the element
var $ = function(id) {
	return document.getElementById(id);
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
	var percentArray = [0,0,0];
	for (var x in numArray) {
		percentArray[x] = numArray[x] / returnSum(numArray);
	}
	
	// To format a percentage, multiply the number by 100
	for (var x in numArray) {
		percentArray[x] = toPercent(percentArray[x]);
	}

	return percentArray;
};
