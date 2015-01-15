// Thanks to Aadit M. Shah on Stack Exchange
// https://stackoverflow.com/questions/13466600/how-would-i-go-about-implementing-a-simple-stack-based-programming-language


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


