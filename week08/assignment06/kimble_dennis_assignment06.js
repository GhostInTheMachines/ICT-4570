// Table building script Adapted from mountain example at 
// url: http://schwartzcomputer.com/ICT4570/Resources/mountainTable.html
// XMLHttpRequest script adapted from Presidents example at 
// url: http://schwartzcomputer.com/ICT4570/Resources/president.html

// Name: Dennis Kimble
// File: kimble_dennis_assignment06.js

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
	console.dir(data);
	var parent=document.getElementById('presidents');
	var attributes = ['name', 'date', 'took_office', 'left_office'];
	buildTable(data.presidents.president, parent, attributes, 'presidents');
}

var ajx = function () {
	"use strict";
	var xmlhttp = new XMLHttpRequest(),
		text,
		data;
	// Prepare and setup response handler
	xmlhttp.onreadystatechange = function () {
		document.getElementById('status').innerHTML = String(xmlhttp.readyState);
		if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			text = xmlhttp.responseText;
			data = JSON.parse(text);
			console.log(data.presidents.date);
			handleJSONResponse(data);
			// document.getElementById("content").innerHTML = xmlhttp.responseText;
		}
	};
	// Set up the request
	xmlhttp.open("GET", "http://schwartzcomputer.com/ICT4570/Resources/USPresidents.json");
	// Perform the request
	xmlhttp.send();
};
document.body.onload = ajx;
