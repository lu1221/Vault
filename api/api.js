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
//		pmt_*: function parameters

// Glocal constants
const lc_path = '../database/tag.xml';

// Import file system class for file IOs
var CLS_fs = require( 'fs' );
// Import xml2js node module for xml parsing
var parseXML = require('xml2js').parseString;

// Export api list
var exports = module.exports = {};

// apis definitions
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
			// *** Search algorithm to implemented to take over the existing indexOf method
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

api_readTag('tag1');
