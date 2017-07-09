// JavaScript Document
				var index = (x + 1);
				var idIndex = "vote" + index + "_error";
				if (voteIDs[x].value.length) 
					if  (!isNaN(voteIDs[x].value) )
						if (!voteIDs[x].value <= 0) {
							continue;
						} else {
								alert(idIndex);
								errorMessageIDs[idIndex].firstChild.nodeValue = "Must be greater than zero";
								isValid = false;
								continue;
								} else { 
										errorMessageIDs[idIndex].firstChild.nodeValue = "Must be a number";
										isValid = false;
										continue;
										} else {
												errorMessageIDs[idIndex].firstChild.nodeValue = "Must not be blank";
												isValid = false;
												continue;
												}