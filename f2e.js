var e2f = require('./lib/e2f');

var lazy = require("lazy");

new lazy(process.stdin)
     .lines
     .forEach(function(line) {
       var str = line.toString();
       console.log(e2f.forthToEmoji(str));
     });
 process.stdin.resume();

