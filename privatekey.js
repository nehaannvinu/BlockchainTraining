
require("dotenv").config();


const PRIVATE_KEY  = process.env;

var s = PRIVATE_KEY
var result = [];

for(var i = 0; i < s.length; i+=2)
{
    result.push(parseInt(s.substring(i, i + 2), 16));
}
result = Uint8Array.from(result)
console.log(result);

exports.result = result;