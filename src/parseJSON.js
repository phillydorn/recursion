// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  
  var result = json = json.trim();
 
  


	result = json.slice(1,json.length-1);  //takes the quotes off strings, braces off objects, brackets off arrays
	  

if (json[0] ==='[' || json[0]==='{') {  
 
  if (json[0] === '[') {
	  	if (json[json.length-1] !== ']'  || 
		  	json.indexOf('\\"]') !== -1)  {
	  		return undefined;
	  	}

	  	else if (json[1] === ']') {
	  		result = [];
	  		return result;
	  	}
	  
  }

  else  {
  	
  	if (json[1] === '}') {
  		result = {};
  		return result;
  		}
  	}

  		var nestedObjects = {};
  		var lastIndex = 1;
  			


  		while (lastIndex < json.length-1 && openIndex != -1) { // checks for nested objects or arrays

  			var openBraceIndex = json.indexOf('{', lastIndex);
  			var openBracketIndex = json.indexOf('[', lastIndex);
  			var openIndex,
  				closeIndex,
  				opener,
  				closer;

  			if ((openBraceIndex < openBracketIndex && openBraceIndex !== -1) 
  				|| openBracketIndex === -1) {
  				openIndex = openBraceIndex;
  				opener = '{';
  				closer = '}';
  			}
  			else  {
  				openIndex = openBracketIndex;
  				opener = '[';
  				closer = ']';

  			}			

  			var findCloser = function (start) { // makes sure to match the right closing brace or bracket
  				var index = start,
  					openCount = 0,
  					closeCount = 0;

  				while (index < json.length && index !== -1) {
  					index++;
  					if (json[index] === opener) {
  						openCount ++;
  					}
  					if (json[index] === closer) {
  						if (openCount === closeCount) {
  							return index;
  						}
  						else {
  							closeCount ++;
  						}
  					}

  				}

  			}

  			closeIndex = findCloser(openIndex);

	  
	  		if ( openIndex != -1) {

	  			
	  			
	  			var nestedObjectString = json.substring(openIndex, closeIndex+1); // marks the nested object or array
	  			var nestedObject = parseJSON(nestedObjectString);
	  			var placeholder = "Object " + openIndex + " Goes Here";
	   			result = result.replace(nestedObjectString, placeholder);
	   			nestedObjects[placeholder] = nestedObject;

	  		}
  		lastIndex = closeIndex;
  	}

  		if (json[0] === '{') {

		  	var objectArray = [];
		  	var tempArray= result.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/); //splits array into elements
		  		//    						(/,(?=([^"]*"[^"]*")*[^"]*$)/);
		  		_.each(tempArray, function (element) {
		  			
		  			if (element != undefined) {
		  				objectArray.push(element);
		  			}

		  		});

		  	result = {};
		  	for (var i = 0; i< objectArray.length; i++) {
		  		objectArray[i] = objectArray[i].trim();
		  		
		  		objectArray[i] = objectArray[i].split(/:(?=(?:[^"]*"[^"]*")*[^"]*$)/); //splits objects into key/value pairs
		  		objectArray[i][0] = parseJSON(objectArray[i][0]);
		  		if (!_.contains(Object.keys(nestedObjects), objectArray[i][1].trim())) {
			  		objectArray[i][1] = parseJSON(objectArray[i][1]);
			  		result[objectArray[i][0]] = objectArray[i][1];
			  	}
			  	else {
			  		result[objectArray[i][0]] = nestedObjects[objectArray[i][1].trim()];
			  	}
		  		
			  }
		}
		else {
			  	result = result.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
			  	for (var i = 0; i<result.length; i++) {
			  		result[i] = result[i].trim();
			  		if (!_.contains (Object.keys(nestedObjects),result[i])) {
			  			result[i] = parseJSON(result[i]);
			  		}
			  		else {
			  			result[i] = nestedObjects[result[i].trim()];
			  		}
			  		}
			  	}

			  

	} //objects and arrays
		
  

	else {



		 if (result.indexOf('\\\\')!== -1 || result.indexOf('\\"') !== -1) {
		 

		  	var slashReplace = function (start, end, find, replace) {
			  	var slashString = "";
			  	while (start < result.length && end !== -1) {
			  		end = result.indexOf(find, start);
			  		if (end !== -1 ) {
			  			slashString = slashString.concat(result.slice(start, end) , replace );
			  		start = end +2;
			  		}

			  	}

			  	return slashString.concat(result.slice(start));
		  }

		  result = slashReplace (0,0, '\\\\', '\\');
		  result = slashReplace(0,0, '\\"', '\"');

		
		  }
		 							//anything that's parsable
			  switch (json) {
			  	case "null" : 	
			  		return null;
			  		break;
			  	case "false":
			  	case false:
			  		return false;
			  		break;
			  	case "true" :
			  	case true:
			  		return true;
			  		break;
			  	case '""' :
			  		return "";
			  		
			  }

			  if (!isNaN(json)) {		//numbers
			  	result = +json;
			  }
			}
		

	 
	  

	  
	  return result;
	
};
