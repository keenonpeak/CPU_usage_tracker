const fs = require('fs');
const files = fs.readdirSync('./') ;    //synchronous
console.log(files);

fs.readdir('./', function(err, files){     //asynchronous
    if (err) console.log('Error', err);
    else console.log('Result', files);
});