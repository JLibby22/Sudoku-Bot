// Dependencies
const OA = require('oauth');
const fs = require('fs')
const axios = require('axios');
 
// Initialize
const oauth = new OA.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    'ogFVXx1EsCwCzgrVqhByVH7ZX',
    'PQNVJsHt9uVPYHSS054rJmxxLwy44lZfozTeq2h6pAexwYAt0F',
    '1.0A',
    null,
    'HMAC-SHA1'
);

let textupdate = 6

let myBigOlObject = {
    text: 'Lets see if it works now version ' + textupdate
}

// read binary data
let bitmap = fs.readFileSync('train.jpg');
// convert binary data to base64 encoded string
let base64 = new Buffer(bitmap).toString('base64');

let imageObject = {
    image: base64
}


let Base64URL = 'link'

function Post() {
oauth.post(
    'https://api.twitter.com/2/tweets',
    '1465713583921278980-jRgruIRMicPjWeuFxp6ixguitj81fH',
    'u5yblP33LmapNNSLZL8630VhXvC3Gxg3SQ7g7klKeYXzK',
    JSON.stringify(myBigOlObject),
    'application/json',
    function(a,b,c) {
    } );
}

setInterval(function() {

axios.post('https://api.imgur.com/3/image', imageObject, {
	headers: {
		'Authorization': 'Client-ID 0da9c4485c0b72b'
	}
})

.then((response) => { 

	console.log(response.data.data.link);	// this is the imgur url

	// post this shit to twitter 

	myBigOlObject.text = "hey click here: " + response.data.data.link;

	Post();



});

}, 1000); // 60 * 1000 milsec



// .then((response) => { 


// 	console.log(response.data.data.link);	// this is the imgur url

// 	// post this shit to twitter 

// 	myBigOlObject.text = "hey click here: " + response.data.data.link;

// 	Post();

// })