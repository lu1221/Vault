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


// Import file system class for file IOs
var CLS_fs = require( 'fs' );
var CLS_path = require( 'path' );

// Export api list
var exports = module.exports = {};

// apis definitions
var getTags = function () {
	// Set up search path
	var path = '.';
	
	// Read file name from current directory
	CLS_fs.readdir(path, function(err, items) {
		for (var i=0; i<items.length; i++) {
			// Do not record files with non-csv extension
			// ## Assumption ## No files in the format of ##.##.*
			var lc_exttype = 'csv';
			// Remove the . in the file extension prior to extension verification
			var lc_fileext = CLS_path.extname( items[i] ).replace(/\./g, '');
			// Verify extension
			if( lc_fileext.indexOf(lc_exttype) !== -1 ) {
				console.log(items[i]);
			}
		}
	});
}

getTags();