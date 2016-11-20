// File: apis.js
// Description:
// 		Contains publicly available APIs used to access our file system
// Modified Date:
// 		2016/10/10
// Variable Type:
//		ARR_*: array variable
//		VAR_*: Scalar variable
//		CLS_*: Imported class variable
//		OTH_*: Other type of variable
//		lc_*: local variable

// Import file system class for file IOs
var CLS_fs = require( 'fs' );
// Import xml2js node module for xml parsing
var parseXML = require('xml2js').parseString;

// Export api list
var exports = module.exports = {};

// apis definitions
var getTags = function () {
	// WARNING: <TEMP> hard-coded path
	var path = '../database/tag.xml';

	// Read Tag.xml
	CLS_fs.readFile(path, 'utf8', function(err, data) {
		// Tag.xml content is now stored in data through callback
		// console.log(data);
		//
	});
}

getTags();
