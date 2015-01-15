var readline = require('readline');
var forth = require('./lib/jsforth');
var emoji = require('emoji');

forth.init();
forth.setPrint(console.log);

process.stdin.setEncoding('utf8');
process.stdout.setEncoding('utf8');

var emojiToKeyword = {
  'heavy-plus-sign': '+',
  'face-throwing-a-kiss': '.',
  'high-voltage-sign': ':',
  'heart-with-arrow': 'rot',
  'face-with-stuck-out-tongue-and-winking-eye': '?do',
  'couple-with-heart': 'over',
  'revolving-hearts': 'swap',
  'cyclone': 'loop',
  'broken-heart': 'drop'
};

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

function emojiToForth(str) {
  var emojified = str.replace(emoji.EMOJI_RE(), function (_, m) {
    var em = emoji.EMOJI_MAP[m];
    var name = em[1].replace(/\s+/g, '-');
    var ret = '<unknown>';
    if (name in emojiToKeyword) {
      //console.log(name + 'in!');
      ret = emojiToKeyword[name];
    } else {
      ret = 'emoji-' + name;
    }
    return ' ' + ret + ' ';
  });
  return emojified.replace(/\s+/g, ' ');
}

var rl = readline.createInterface(process.stdin, process.stdout);


rl.setPrompt('> ');
rl.prompt();

rl.on('line', function(line) {
  line = line.trim();
  var symbols = getSymbols(line);
  console.log('>> ' + symbols.join(' ').replace(/\s+/g, ' '));
  var forthLine = emojiToForth(line);
  console.log('>> ' + forthLine);
  forth.run(forthLine);
  console.log(forth.stacktop(5));
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
