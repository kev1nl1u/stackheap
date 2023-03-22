var stackCode = $("#stackCode");
var stackCodeLines = stackCode.children();
var stackCodeLinesLength = stackCodeLines.length;
var stackCurrentLine = -1;
var stack = [
  {
    // 0
    main: [],
    if: [],
    foo: [],
    note: "",
  },
  {
    // 1
    main: ["args"],
    if: [],
    foo: [],
    note: "<span class='mono'>args</span>: parametro",
  },
  {
    // 2
    main: ["n = &lt;uninitialized&gt;", "args"],
    if: [],
    foo: [],
    note: "allocazione di <span class='mono'>n</span>",
  },
  {
    // 3
    main: ["n = 6", "args"],
    if: [],
    foo: [],
    note: "",
  },
  {
    // 4
    main: ["n = 6", "args"],
    if: [""],
    foo: [],
    note: "<span class='mono'>if</span> &egrave; contenuto nel frame di <span class='mono'>main()</span>",
  },
  {
    // 5
    main: ["n = 6", "args"],
    if: ["half = &lt;uninitialized&gt;"],
    foo: [],
    note: "allocazione di <span class='mono'>half</span>",
  },
  {
    // 6
    main: ["n = 6", "args"],
    if: ["half = 3"],
    foo: [],
    note: "eliminazione frame <span class='mono'>foo()</span> con assegnazione del valore di ritorno a <span class='mono'>half</span> e ripristino dello stato dei registri CPU",
  },
  {
    // 7
    main: ["n = 6", "args"],
    if: ["half = 3"],
    foo: [],
    note: "",
  },
  {
    // 8
    main: ["n = 6", "args"],
    if: [],
    foo: [],
    note: "eliminazione delle variabili locali di <span class='mono'>if</span>",
  },
  {
    // 9
    main: [],
    if: [],
    foo: [],
    note: "eliminazione del frame <span class='mono'>main()</span>",
  },
  {
    // 10
    main: ["registri CPU", "n = 6", "args"],
    if: ["half = &lt;uninitialized&gt;"],
    foo: ["x = 6"],
    note: "salva stato registri CPU, push frame di <span class='mono'>foo()</span> con parametri nello stack e indirizzo di ritorno",
  },
  {
    // 11
    main: ["registri CPU", "n = 6", "args"],
    if: ["half = &lt;uninitialized&gt;"],
    foo: ["x = 6", "h = &lt;uninitialized&gt;"],
    note: "allocazione di <span class='mono'>h</span>",
  },
  {
    // 12
    main: ["registri CPU", "n = 6", "args"],
    if: ["half = &lt;uninitialized&gt;"],
    foo: ["x = 6", "h = 3"],
    note: "",
  },
  {
    // 13
    main: ["registri CPU", "n = 6", "args"],
    if: ["half = &lt;uninitialized&gt;"],
    foo: ["x = 6", "(return) h = 3"],
    note: "il valore di ritorno pu&ograve; essere salvato in un registro nella CPU o nello stack a seconda del compilatore e del processore.",
  },
  {
    // 14
    main: ["n = 6", "args"],
    if: ["half = 3"],
    foo: [],
    note: "",
  },
  {
    // 15
    main: [],
    if: [],
    foo: [],
    note: "",
  },
];

function STACKNextLine() {
  // reset stack frame
  $("#stackFrame").html("");
  if (stackCurrentLine <= stackCodeLinesLength) {
    $(stackCodeLines).removeClass("codeLine-active");
    stackCurrentLine++;

    if (stackCurrentLine >= 0 && stackCurrentLine <= 5) {
    } else if (stackCurrentLine == 6) {
      $(stackCodeLines[stackCurrentLine]).addClass("codeLine-active");
      stackCurrentLine = 10;
    } else if (stackCurrentLine == 14) {
      $(stackCodeLines[stackCurrentLine]).addClass("codeLine-active");
      stackCurrentLine = 6;
    } else if (stackCurrentLine == 10) {
      stackCurrentLine = 15;
    } else if (stackCurrentLine == 16) {
      stackCurrentLine = -1;
    }

    // keep console clean - if line finished or not started
    if (stackCurrentLine < 0) return;
    printStackFrame(stack[stackCurrentLine]);
    $(stackCodeLines[stackCurrentLine]).addClass("codeLine-active");
  }
}

function STACKPrevLine() {
  // reset stack frame
  $("#stackFrame").html("");
  if (stackCurrentLine >= -1) {
    $(stackCodeLines).removeClass("codeLine-active");

    if (stackCurrentLine == 10) {
      stackCurrentLine = 6;
    } else if (stackCurrentLine == 6) {
      stackCurrentLine = 14;
    } else if (stackCurrentLine == 14) {
      $(stackCodeLines[stackCurrentLine]).addClass("codeLine-active");
      stackCurrentLine = 9;
    } else if (stackCurrentLine == 11) {
      $(stackCodeLines[6]).addClass("codeLine-active");
    } else if (stackCurrentLine == 15) {
      stackCurrentLine = 10;
    } else if (stackCurrentLine == 7) {
      $(stackCodeLines[14]).addClass("codeLine-active");
    } else if (stackCurrentLine == -1) {
      stackCurrentLine = 16;
    }

    stackCurrentLine--;
    // keep console clean - if line finished or not started
    if (stackCurrentLine < 0) return;
    printStackFrame(stack[stackCurrentLine]);
    $(stackCodeLines[stackCurrentLine]).addClass("codeLine-active");
  }
}

function highlight() {
  // highlight line
  $(stackCodeLines).removeClass("codeLine-active");
  $(stackCodeLines[stackCurrentLine]).addClass("codeLine-active");
}

function printStackFrame(stack) {
  var main = stack.main;
  var if_ = stack.if;
  var foo = stack.foo;
  var note = stack.note;

  // top of stack printed first
  if (foo.length > 0) {
    var out = $("<div class='stackFrame-block'></div>");
    var container = $("<div class='stackFrame-lineContainer'></div>");
    $("#stackFrame").append("<hr>");
    out.append("<p class='stackFrame-name'>foo()</p>");
    for (var i = 0; i < foo.length; i++) {
      container.append("<p class='codeLine'>" + foo[i] + "</p>");
    }
    out.append(container);
    $("#stackFrame").append(out);
  }
  if (if_.length > 0) {
    var out = $("<div class='stackFrame-block'></div>");
    var container = $("<div class='stackFrame-lineContainer'></div>");
    $("#stackFrame").append("<hr>");
    out.append("<p class='stackFrame-name'>if</p>");
    for (var i = 0; i < if_.length; i++) {
      container.append("<p class='codeLine'>" + if_[i] + "</p>");
    }
    out.append(container);
    $("#stackFrame").append(out);
  }
  if (main.length > 0) {
    var out = $("<div class='stackFrame-block'></div>");
    var container = $("<div class='stackFrame-lineContainer'></div>");
    if (if_.length > 0) $("#stackFrame").append("<hr class='dashed-hr'>");
    else $("#stackFrame").append("<hr>");
    out.append("<p class='stackFrame-name'>main()</p>");
    for (var i = 0; i < main.length; i++) {
      container.append("<p class='codeLine'>" + main[i] + "</p>");
    }
    out.append(container);
    $("#stackFrame").append(out);
    $("#stackFrame").append("<hr>");
  }
  $("#stack-note").html("");
  if (note.length > 0) {
    $("#stack-note").html("<b>Note</b><br>" + note);
  }
}
