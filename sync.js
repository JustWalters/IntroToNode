var fs = require('fs');
// console.log(fs);
console.log(fs.readFileSync('./file1.txt').toString('utf-8'));

var greeter = require('./greeter');

// greeter.greet('Justin');
// greeter.shout('Justin');
