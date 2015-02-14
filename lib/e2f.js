var emoji = require('emoji');


// plants and animals are reserved for variables
// heart related emoji are all about the stack
var emojiNameToKeyword = {
  // math
  'heavy plus sign': '+',
  'heavy minus sign': ' ',
  'heavy multiplication sign': '*',
  'heavy division sign': '/',
  'person with folded hands': '=',

  // function definition
  'grinning face': ':',
  'winking face': ';',

  // flow control
  'face with stuck out tongue and winking eye': '?do',
  'cyclone': 'loop',
  'white right pointing backhand index': 'begin',
  'thumbs up sign': 'until',

  // stack operators
  'broken heart': 'drop',
  'heart with arrow': 'rot',
  'couple with heart': 'over',
  'revolving hearts': 'swap',
  'two hearts': 'dup',
  'face throwing a kiss': '.',
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

var keywordToEmoji = {};

function invert(obj) {
  var new_obj = {};
  for (var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      new_obj[obj[prop]] = prop;
    }
  }
  return new_obj;
}

var keywordToEmojiName = invert(emojiNameToKeyword);

var emojiNameToEmoji = {};
for (var e in emoji.EMOJI_MAP) {
  if(emoji.EMOJI_MAP.hasOwnProperty(e)) {
    var name = emoji.EMOJI_MAP[e][1];
    emojiNameToEmoji[name] = e;
  }
}

for (var k in keywordToEmojiName) {
  var emojiName = keywordToEmojiName[k];
  keywordToEmoji[k] = emojiNameToEmoji[emojiName];
}


function emojiToForth(str) {
  var emojified = str.replace(emoji.EMOJI_RE(), function (_, m) {
    var em = emoji.EMOJI_MAP[m];
    var name = em[1].replace(/\s+/g, '-');
    var ret = '<unknown>';
    if (name in emojiNameToKeyword) {
      //console.log(name + 'in!');
      ret = emojiNameToKeyword[name];
    } else {
      ret = 'emoji-' + name;
    }
    return ' ' + ret + ' ';
  });
  return emojified.replace(/\s+/g, ' ');
}

function forthToEmoji(str) {
  var words = str.split(/\s+/)
  var lastWordWasNonEmoji = false;
  var emojified = [];
  words.forEach(function (w) {
    if (w in keywordToEmoji) {
      var e = keywordToEmoji(w);
      emojified.push(e);
      lastWordWasNonEmoji = false;
    } else {
      if (lastWordWasNonEmoji) {
        emojified.push(" ");
      }
      emojified.push(w);
      lastWordWasNonEmoji = true;
    }
  });
  return emojified.join('');
}

module.exports = {
  emojiToForth: emojiToForth,
  forthToEmoji: forthToEmoji,
  keywordToEmoji: keywordToEmoji
};


