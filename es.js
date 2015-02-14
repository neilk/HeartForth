var readline = require('readline');
var forth = require('./lib/jsforth');
var emoji = require('emoji');

forth.init();
forth.setPrint(console.log);

process.stdin.setEncoding('utf8');
process.stdout.setEncoding('utf8');

// plants and animals are reserved for variables
// heart related emoji are all about the stack
var emojiToKeyword = {
  // math
  'heavy-plus-sign': '+',
  'heavy-minus-sign': '-',
  'heavy-multiplication-sign': '*',
  'heavy-division-sign': '/',
  'person-with-folded-hands': '=',

  // function definition
  'grinning-face': ':',
  'winking-face': ';',

  // flow control
  'face-with-stuck-out-tongue-and-winking-eye': '?do',
  'cyclone': 'loop',
  'white-right-pointing-backhand-index': 'begin',
  'thumbs-up-sign': 'until',

  // stack operators

  'broken-heart': 'drop',
  'heart-with-arrow': 'rot',
  'couple-with-heart': 'over',
  'revolving-hearts': 'swap',
  'two-hearts': 'dup',
  'sparkling-heart': 'over',
  'face-throwing-a-kiss': '.',
  //'kiss': '',

/*
 "❤": ["U+2764", "heavy black heart", "2764", ["", "U+E6EC"], ["", "U+E595"], ["", "U+E022"], ["󾬌", "U+FEB0C"]],
  "💓": ["U+1F493", "beating heart", "1f493", ["", "U+E6ED"], ["", "U+EB75"], ["", "U+E327"], ["󾬍", "U+FEB0D"]],
  "💗": ["U+1F497", "growing heart", "1f497", ["", "U+E6ED"], ["", "U+EB75"], ["", "U+E328"], ["󾬑", "U+FEB11"]],
  "💘": ["U+1F498", "heart with arrow", "1f498", ["", "U+E6EC"], ["", "U+E4EA"], ["", "U+E329"], ["󾬒", "U+FEB12"]],
  "💙": ["U+1F499", "blue heart", "1f499", ["", "U+E6EC"], ["", "U+EAA7"], ["", "U+E32A"], ["󾬓", "U+FEB13"]],
  "💚": ["U+1F49A", "green heart", "1f49a", ["", "U+E6EC"], ["", "U+EAA8"], ["", "U+E32B"], ["󾬔", "U+FEB14"]],
  "💛": ["U+1F49B", "yellow heart", "1f49b", ["", "U+E6EC"], ["", "U+EAA9"], ["", "U+E32C"], ["󾬕", "U+FEB15"]],
  "💜": ["U+1F49C", "purple heart", "1f49c", ["", "U+E6EC"], ["", "U+EAAA"], ["", "U+E32D"], ["󾬖", "U+FEB16"]],
  "💝": ["U+1F49D", "heart with ribbon", "1f49d", ["", "U+E6EC"], ["", "U+EB54"], ["", "U+E437"], ["󾬗", "U+FEB17"]],
  "💟": ["U+1F49F", "heart decoration", "1f49f", ["", "U+E6F8"], ["", "U+E595"], ["", "U+E204"], ["󾬙", "U+FEB19"]],
  "😍": ["U+1F60D", "smiling face with heart-shaped eyes", "1f60d", ["", "U+E726"], ["", "U+E5C4"], ["", "U+E106"], ["󾌧", "U+FE327"]],
  "😻": ["U+1F63B", "smiling cat face with heart-shaped eyes", "1f63b", ["", "U+E726"], ["", "U+EB65"], ["", "U+E106"], ["󾍌", "U+FE34C"]],
*/

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
  //console.log('>> ' + forthLine);
  forth.run(forthLine);
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
