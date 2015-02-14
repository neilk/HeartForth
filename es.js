var readline = require('readline');
var forth = require('./lib/jsforth');
var e2f = require('./lib/e2f');

forth.init();
forth.setPrint(console.log);

process.stdin.setEncoding('utf8');
process.stdout.setEncoding('utf8');

function getSymbols(string) {
  var length = string.length;
  var index = -1;
  var output = [];
  var character;
  var charCode;
  while (++index < length) {
    character = string.charAt(index);
    charCode = character.charCodeAt(0);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      // Note: this doesn't account for lone high surrogates;
      // you'd need even more code for that!
      output.push(character + string.charAt(++index));
    } else {
      output.push(character);
    }
  }
  return output;
}

var rl = readline.createInterface(process.stdin, process.stdout);


rl.setPrompt('> ');
rl.prompt();

rl.on('line', function(line) {
  line = line.trim();
  var symbols = getSymbols(line);
  console.log('>> ' + symbols.join(' ').replace(/\s+/g, ' '));
  var forthLines = e2f.emojiToForth(line);
  forthLines.forEach(function(line) {
    // console.log('forth>> ' + line);
    forth.run(line);
  });
  //var stack = forth.stacktop(10);
  //console.log(stack.slice(5,5));
  rl.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});

/*
var prompt = require('prompt');

//
// Start the prompt
//
prompt.start();

//
// Get two properties from the user: username and email
//
prompt.get(['username', 'email'], function (err, result) {
  //
  // Log the results.
  //
  console.log('Command-line input received:');
  console.log('  username: ' + result.username);
  console.log('  email: ' + result.email);
});
*/
