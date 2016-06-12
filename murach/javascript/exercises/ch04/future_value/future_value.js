"use strict";
var $ = function(id) {
    return document.getElementById(id);
};

// performs the future value calculation
var calculateFV = function(investment, rate, years) {
    var futureValue;

    futureValue = investment;
    for (var i = 1; i <= years; i++) {
        futureValue = futureValue + (futureValue * rate / 100);
    }
    futureValue = parseFloat(futureValue).toFixed(2);

    return futureValue;
};

// get values from user input and
// call futureValue function to calculate result

var processEntries = function() {
    var investment = parseFloat($("investment").value);
    var annualRate = parseFloat($("annual_rate").value);
    var years = parseInt($("years").value);
    var isValid = true;

    if (isNaN(investment)) {
        isValid = false;
        $("investment_error").firstChild.nodeValue = "Value must be a number";
    } else if (investment <= 0){
        $("investment_error").firstChild.nodeValue = "Value must be greater than zero";
        isValid = false;
        }
    else
        $("investment_error").firstChild.nodeValue = "";

    if (isNaN(annualRate)) {
        isValid = false;
        $("rate_error").firstChild.nodeValue = "Rate must be a number";
    } else if (annualRate <= 0 || annualRate > 15){
        $("rate_error").firstChild.nodeValue = "Rate more than 0 and less than 15";
        isValid = false;
        }
    else
        $("rate_error").firstChild.nodeValue = "";

    if (isNaN(years)) {
        isValid = false;
        $("years_error").firstChild.nodeValue = "Years must be a number";
    } else if (years <= 0 || years > 100){
        $("years_error").firstChild.nodeValue = "Years greater than 0 or under 101";
        isValid = false;
        }
    else
        $("years_error").firstChild.nodeValue = "";

    if (isValid)
        $("future_value").value = calculateFV(investment, annualRate, years);
};

window.onload = function() {
    $("calculate").onclick = processEntries;
    $("investment").focus();
};
