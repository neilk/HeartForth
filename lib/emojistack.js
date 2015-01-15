

var lexer = new Lexer();

lexer.addRule(/\s+/, function () {
    // matched whitespace - discard it
});

lexer.addRule(/\[.*\]/, function () {
    // matched a comment - discard it
});

lexer.addRule(/\d+/, function (lexeme) {
    this.yytext = parseInt(lexeme);
    return "NUMBER";
});

lexer.addRule(/push/, function () {
    return "PUSH";
});

lexer.addRule(/add/, function () {
    return "ADD";
});

lexer.addRule(/print/, function () {
    return "PRINT";
});

lexer.addRule(/rot/, function () {
    return "ROT";
});

lexer.addRule(/swap/, function () {
    return "SWAP";
});

lexer.addRule(/loop/, function () {
    return "LOOP";
});

lexer.addRule(/drop/, function () {
    return "DROP";
});

lexer.addRule(/countdo/, function () {
    return "COUNTDO";
});

lexer.addRule(/over/, function () {
    return "OVER";
});




function run(program) {
  lexer.setInput(program);

  var token;
  var stack = [];
  var push = false;

  while (token = lexer.lex()) {
    switch (token) {
      case "NUMBER":
        if (push) {
          stack.push(lexer.yytext);
        } else {
          alert("Unexpected number.");
        }
        break;
      case "ADD":
        if (push) {
          alert("Expected number.");
        } else {
          stack.push(stack.pop() + stack.pop());
        }
        break;
      case "PRINT":
        if (push) {
          alert("Expected number.");
        } else {
          printLn(stack.pop());
        }
        break;
      case "ROT":
        // ( x1 x2 x3 -- x2 x3 x1 )
        stack.push(stack.shift());
        break;
      case "COUNTDO":
        break;
      case "LOOP":
        break;
      case "OVER":
        // (a b -- a b a )
        var a = stack.pop();
        var b = stack.pop();
        stack.push(a);
        stack.push(b);
        stack.push(a);
        break;
      case "SWAP":
        // (a b -- b a)
        var a = stack.pop();
        var b = stack.pop();
        stack.push(b);
        stack.push(a);
        break;
      case "DROP":
        stack.pop();
        break;
    }

    push = token === "PUSH";
  }
}

function printLn(s) {
  var output = $('#output').val();
  $('#output').val(output + "\n" + s);
}

$('#run').click(function(event) {
  event.preventDefault();
  var src = $('#src').val();
  run(src);
});


