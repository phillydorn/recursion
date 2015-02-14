// test cases are described in fixtures.js
describe('stringifyJSON', function(){

var stringifyJSON = function(value) {


  var result = "";

  
  if (value === null) {
    result =  "null";
  }

  else if (value instanceof Array) { 

    function arrayStringify (array, i){  // creates a recursive function that runs stringify through
                                          // every element in the array
      if (i === array.length) {
        return '[' + value + ']';
      }

      else {
        array[i] = stringifyJSON (array[i]);
        return arrayStringify(array, i+1);
      }
    }
    result = arrayStringify(value, 0) ;
  }


  else { 
    switch (typeof(value)) {
      case "number" :
      case "boolean" : 
        result = value.toString();
        break;
      case "string" :
        result = '"' + value + '"';
        break;
      case "object" :
        var stringPair;
        result = '{';
        for (key in value) {

          if (typeof(value[key]) !== 'undefined' &&
              typeof(value[key]) !== 'function') {
                stringPair = stringifyJSON(key) + ':' + stringifyJSON(value[key]);
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
  }
  it('should match the result of calling JSON.stringify', function(){

    stringifiableObjects.forEach(function(test){
      var expected = JSON.stringify(test);
      var result = stringifyJSON(test);
      expect(result).to.equal(expected);
    });

    unstringifiableValues.forEach(function(obj){
      var expected = JSON.stringify(obj);
      var result = stringifyJSON(obj);
      expect(result).to.equal(expected);
    });

  });
});
