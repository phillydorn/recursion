// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // your code here
  var structure = {};
  var body = document.body;

  var getChildren = function(node) { //turns the DOM into an object of arrays of objects, etc...
  									// Each object has a "children" property which is the array of its children's objects
  	var children = [], 
  	i = 0;

  	var directChildrenList = node.childNodes;

  	while (i < directChildrenList.length) { // I know there's a way to do this without the
  											// while loop but every time I got close to it
  											//I felt like my brain was going to explode
  		children.push({});
  		children[i]['name'] = directChildrenList[i];
  		children[i]['children'] = getChildren(children[i]['name']);
  		i++;
  	}

 	return children;
  }

  structure['name'] = body;
  structure['children'] = getChildren(body);

  var matchClass = function (node, target) { // This goes through the object structure and finds the matching class
  	

  	if (_.contains(node.name.classList, target)) {
  		result.push(node.name);
  	}
  	for (var i = 0; i<node.children.length; i++) {
  		matchClass(node.children[i], target);
  	}
  	
  };

  var result=[];

  matchClass(structure, className);

  return result;
};
