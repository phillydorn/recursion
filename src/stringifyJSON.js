// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {


  var result = "";

  
  if (obj === null) {
    result =  "null";
  }

  else if (obj instanceof Array) { 

    function arrayStringify (array, i){  // creates a recursive function that runs stringify through
                                          // every element in the array
      if (i === array.length) {
        return '[' + obj + ']';
      }

      else {
        array[i] = stringifyJSON (array[i]);
        return arrayStringify(array, i+1);
      }
    }
    result = arrayStringify(obj, 0) ;
  }


  else { 
    switch (typeof(obj)) {
      case "number" :
        result = '"' + obj + '"';
        result = result.slice(1, result.length-1);
        break;
      case "string" :
        result = '"' + obj + '"';
        break;
      case "boolean" : 
        if (obj == true) {
          result = "true";
        }
        else {
          result = "false";
        }
        break;
     
      case "object" :
        var stringPair;
        result = '{';
        for (key in obj) {

          if (typeof(obj[key]) !== 'undefined' &&
              typeof(obj[key]) !== 'function') {
                stringPair = stringifyJSON(key) + ':' + stringifyJSON(obj[key]);
                if (result !== '{') {
                  result +=',';
                }
                result += stringPair;
          }
        }
        result+= '}';
    }
  }

  





    return result;
  
};
