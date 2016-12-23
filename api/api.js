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
//		lc_*:  local variable
//		gb_*:  global variable
//		pmt_*: function parameters

// Global constants
const lc_path = '../database/tag.xml';
// *TEST* Global database hosting tag info
var gb_dbRoot = {};

// Import file system class for file IOs
var CLS_fs = require( 'fs' );
// Import xml2js node module for xml parsing
var parseXML = require('xml2js').parseString;

// Export api list
var exports = module.exports = {};

/*

* gb_dbRoot
	* tag0
		* pathCount
		* path
			* path[0] (order paths by their added time in the future?)
				* content
				* timestamp
				* path[1]
				* path[2]
				* path[3]
	* tag1
	* tag2
	* ..
*/

// "Atomic APIs"
var atomic_DBinsertTag = function (gb_dbRoot, pmt_tag, pmt_path) {

	// Insert tag name into dbRoot object as its keys if not exist
	if( !(pmt_tag in gb_dbRoot) ){
		// Set up path obj hosting actual path info and associated added timestamp
		var lc_pathObj = { content:[pmt_path] };
		lc_pathObj.timestampHumanReadable = (new Date()).toString();
		lc_pathObj.timestamp = Date.now();
		// Set up tag obj hosting path count and path array containing path objs
		var lc_tmpPathArr = [];
		lc_tmpPathArr[0] = lc_pathObj;
		var lc_tagObj = {};
		lc_tagObj.pathCount = 0;
		lc_tagObj.path = lc_tmpPathArr;
		gb_dbRoot[pmt_tag] = lc_tagObj.path;
	}

}

// "Non-atomic APIs"
var api_readTag = function (pmt_tag) {

	// Read Tag.xml
	CLS_fs.readFile(lc_path, 'utf8', function(err, data) {
		// Tag.xml content is now stored in data through callback
		// console.log(data);
		// Buffer xml data
		var lc_xml = data;
		// console.log(lc_xml);
		// Convert xml raw data into JSON for processing
		parseXML(lc_xml, function(err, lc_JSON){
			// WARNING: <TEST> test output validity
			// console.dir(JSON.stringify(result_JSON));
			var lc_tagIdx = -1;
			pmt_tag_str= String(pmt_tag);

			// *******************************<PERFMON>*************************************
			// *** Search algorithm to be implemented to take over the existing indexOf method
			// *****************************************************************************
			// Search given tag (from usr) in program's tag list
			// <PERFMON> Buffer tag list
			var lc_tagArr_buf = (Object.keys(lc_JSON.tag)).slice();
			lc_tagIdx  = lc_tagArr_buf.indexOf( pmt_tag_str );
			lc_tagName = String( lc_tagArr_buf[lc_tagIdx] );
			// Collect paths info associated with this tag
			var lc_tagObj = lc_JSON.tag[lc_tagName][0];
			var lc_pathNum = lc_tagObj.pathCount[0];
			console.log(lc_pathNum);
			console.log(lc_tagObj.path1[0]);

			// <PERFMON> Pop found entry from array to prevent subsequent re-search
			if( lc_tagIdx > -1 ) {
				lc_tagArr_buf.splice(lc_tagIdx, 1);
			}
		});
	});
}

console.log( gb_dbRoot.test );
atomic_DBinsertTag( gb_dbRoot, "test", "testpath" );
// api_readTag('tag1');
console.log( gb_dbRoot.test );
