"use strict";
var $ = function(id) { return document.getElementById(id); };

// the event handler for the click event of each h2 element
var toggle = function() {
    var a = this;                    // clicked a tag
    var h2 = a.parentNode;   
    var div = a.parentNode.nextElementSibling;  // h2 tag's sibling div tag

    // toggle plus and minus image in h2 elements by adding or removing a class
    // if (h2.hasAttribute("class")) { 
        // h2.removeAttribute("class");	
    // } else { 
        // h2.setAttribute("class", "minus"); 
    // }
        if (h2.hasAttribute("class")) { 
        h2.clasName = "";    
    } else { 
        h2.setAttribute("class", "minus"); 
    }

    // toggle div visibility by adding or removing a class
    // if (div.hasAttribute("class")) { 
        // div.removeAttribute("class");
    // } else { 
        // div.setAttribute("class", "open"); 
    // } 
        if (div.hasAttribute("class")) { 
        div.className = "";
    } else { 
        div.setAttribute("class", "open"); 
    } 
};

// window.onload = function() {
    // // get the h2 tags
    // var faqs = $("faqs");
    // var h2Elements = faqs.getElementsByTagName("h2");
//     
    // // attach event handler for each h2 tag	    
    // for (var i = 0; i < h2Elements.length; i++ ) {
    	// h2Elements[i].onclick = toggle;
    // }
    // // set focus on first h2 tag's <a> tag
    // h2Elements[0].firstChild.focus();       
// };
window.onload = function() {
    // get the a tags
    var faqs = $("faqs");
    var aElements = faqs.getElementsByTagName("a");
    
    // attach event handler for each h2 tag     
    for (var i = 0; i < aElements.length; i++ ) {
        aElements[i].onclick = toggle;
    }
    // set focus on first h2 tag's <a> tag
    aElements[0].focus();       
};
