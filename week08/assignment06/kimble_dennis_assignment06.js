// Table building script Adapted from mountain example at 
// url: http://schwartzcomputer.com/ICT4570/Resources/mountainTable.html
// XMLHttpRequest script adapted from Presidents example at 
// url: http://schwartzcomputer.com/ICT4570/Resources/president.html

// Name: Dennis Kimble
// File: kimble_dennis_assignment06.js

var $ = function(id) { return document.getElementById(id); };

// Capitalize first character of single word
// or both words if separated by underscores
var capitalize = function(s) {
 "use strict";
 if (s.indexOf('_') === -1) {
	 return s.charAt(0).toUpperCase() + s.slice(1);
 }else {  // if attribute has a dash between words remove it
	 var lastHalf = s.substr(s.indexOf('_')+1);
	 var firstHalf = s.substr(0, s.indexOf('_'));
	 return firstHalf.charAt(0).toUpperCase() + firstHalf.slice(1) + " " +
	 		lastHalf.charAt(0).toUpperCase() + lastHalf.slice(1);
 }
};

// clears dom of legacy data
var clear = function() {
	"use strict";
	$('presidents').removeChild($("presidents").childNodes[0]);
};

var isNotBlank = function(inputBox) {
	"use strict";
	//console.log("Object evaluated: " + inputBox.id);
	return inputBox.value !== '';
};


// select a subset of presidents that match search criteria
var getPresidents = function(data, t, dateString){
	"use strict";
	// extract full array of presidents
	var fullArrayOfPresidents = Array.from(data.presidents.president)

	// create three arrays to collect search results
	var arrayOne	= [];	// holds presidents matching the name string
	var arrayTwo	= [];	// holds presidents matchint the took_office property
	var arrayThree	= [];	// holds presidents matching the left_office property
	var selectArrayOfPresidents = [];
	
	// if t is not -1 search president names
	if (t !== '-1'){	
		arrayOne = fullArrayOfPresidents.filter(
			function(fullArrayOfPresidents) {
				return fullArrayOfPresidents.name.match(t);} );
	}	
	// if dateString is not -1 search took office properties
	if ( dateString !== '-1') {	
		arrayTwo = fullArrayOfPresidents.filter(
			function(fullArrayOfPresidents) {
				return fullArrayOfPresidents.took_office.match(dateString);} );
	}
	
	// join any president arrays that have been returned
	selectArrayOfPresidents = arrayOne.concat(arrayTwo, arrayThree);
	
	return selectArrayOfPresidents;
};
var buildHeader = function(titles,trAtt,thAtt) {
 "use strict";
  var i, th, len, tr = document.createElement('tr');
  if (trAtt) {
    tr.setAttribute('class',trAtt);
  }
  len = titles.length;
  	for ( i=0; i<len; i+=1) {
 	  th = document.createElement('th');
 	  if (thAtt) {
      th.setAttribute('class',thAtt);
    }
 	th.appendChild(document.createTextNode(capitalize(titles[i])));
 	tr.appendChild(th);
  }
  return tr;
};

var buildRow = function(row, propertyNames) {
 "use strict";
  var i, td, tr = document.createElement('tr'),
      len = propertyNames.length;
  for ( i=0; i<len; i+=1) {
  	td = document.createElement('td');
  	td.setAttribute('class',propertyNames[i]);
  	td.appendChild(document.createTextNode(row[propertyNames[i]]));
  	tr.appendChild(td);
  }
  return tr;
};
	  
var buildTable = function (data, parent, attr, tClass) {
 "use strict";
  var i, table=document.createElement('table'),
  	    len = data.length;
  table.setAttribute('class',tClass); // To allow CSS
 	// Add Header
 	table.appendChild(buildHeader(attr));
 	// For each row of data in the array, add it.
 	for ( i=0; i<len; i+=1) {
 		table.appendChild(buildRow(data[i],attr));
 	}
 	parent.appendChild(table);
};


function handleJSONResponse(data) {
	"use strict";
	// test if data is raw json or selected president array
	// could also send full list if data length is zero
	var isSelectArray = Array.isArray(data);
	var parent = $('presidents');
	
	// test if parent has a table attached to it
	if (parent.getElementsByTagName('table').length > 0) {
		clear(); // delete current table to allow for new table
	}
	var attributes = ['number', 'name', 'date', 'took_office', 'left_office'];
	// if a valid search has been performed, send the results
	// else send the full dataset
	buildTable( (isSelectArray ? data : data.presidents.president), 
			   parent, attributes, 'presidents');
}

var ajx = function () {
	"use strict";
	var xmlhttp = new XMLHttpRequest(),
		text,
		data;
	// Prepare and setup response handler
	xmlhttp.onreadystatechange = function () {
		// document.getElementById('status').innerHTML = String(xmlhttp.readyState);
		if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			text = xmlhttp.responseText;
			data = JSON.parse(text);
			console.log(data.presidents.date);
			
			if ( isNotBlank( $('name_input') ) ) {
				handleJSONResponse(getPresidents(data, $('name_input').value, // send the president search string
				(isNotBlank( $('office_input') ) )? $('office_input').value : // if Took Office has a value send it
				'-1' )); // if Took Office is blank send the no search flag
			}else if (isNotBlank($('office_input')) ){
				handleJSONResponse( (getPresidents(data, '-1', $('office_input').value) ) );
			} else { handleJSONResponse(data); }
		}
		
	};
	// Set up the request
	xmlhttp.open("GET", "http://schwartzcomputer.com/ICT4570/Resources/USPresidents.json");
	// Perform the request
	xmlhttp.send();
};

window.onload = function() {
	"use strict";
	var btnSearch = $("search");
	var btnReset = $("reset");
	btnSearch.addEventListener('click', ajx);
	btnReset.addEventListener("click", clear);
};
