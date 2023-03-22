var heapCode = $("#heapCode");
var heapCodeLines = heapCode.children();
var heapCodeLinesLength = heapCodeLines.length;
var heapCurrentLine = -1;

let OUTrandom = $("<div class='heapFrame-block'></div>");
OUTrandom.append(
  "<p class='codeLine' style='border: 1px solid var(--text); margin: 10px 20px;'>random</p>"
);

let OUTvet = $("<div class='heapFrame-block'></div>");
OUTvet.append(
  "<p class='codeLine' style='border: 1px solid var(--text); margin: 10px 20px;'>vet</p>"
);

let OUTstr = $("<div class='heapFrame-block'></div>");
OUTstr.append(
  "<p class='codeLine' style='border: 1px solid var(--text); margin: 10px 20px;'>str</p>"
);

function HEAPNextLine() {
  // reset heap frame
  $("#heapFrame").html("");
  $("#heap-note").html("");
  if (heapCurrentLine <= heapCodeLinesLength) {
    $(heapCodeLines).removeClass("codeLine-active");
    heapCurrentLine++;

    switch (heapCurrentLine) {
      case 3:
        $("#heapFrame").append(OUTrandom);
        break;
      case 4:
        $("#heapFrame").append(OUTrandom);
        $("#heapFrame").append(OUTvet);
		$("#heap-note").html("<b>Note</b><br>viene salvato nello stack l'indirizzo di vet per accedere al suo contenuto");
        break;
      case 5:
        $("#heapFrame").append(OUTrandom);
        $("#heapFrame").append(OUTvet);
        $("#heapFrame").append(OUTstr);
        break;
      case 8:
        heapCurrentLine = -1;
        break;
      default:
        break;
    }

    // keep console clean - if line finished or not started
    if (heapCurrentLine < 0) return;

    $(heapCodeLines[heapCurrentLine]).addClass("codeLine-active");
  }
}

function HEAPPrevLine() {
  // reset heap frame
  $("#heapFrame").html("");
  $("#heap-note").html("");
  if (heapCurrentLine >= -1) {
    $(heapCodeLines).removeClass("codeLine-active");

	switch (heapCurrentLine) {
		case 4:
	        $("#heapFrame").append(OUTrandom);
        	break;
      	case 5:
        	$("#heapFrame").append(OUTrandom);
        	$("#heapFrame").append(OUTvet);
			$("#heap-note").html("<b>Note</b><br>Viene salvato nello stack l'indirizzo di vet per accedere al suo contenuto");
        	break;
		case 6:
			$("#heapFrame").append(OUTrandom);
			$("#heapFrame").append(OUTvet);
			$("#heapFrame").append(OUTstr);
			break;
		case -1:
			heapCurrentLine = 8;
			break;
		default:
			break;
		}

    heapCurrentLine--;
    // keep console clean - if line finished or not started
    if (heapCurrentLine < 0) return;
    //printheapFrame(heap[heapCurrentLine]);
    $(heapCodeLines[heapCurrentLine]).addClass("codeLine-active");
  }
}

function highlight() {
  // highlight line
  $(heapCodeLines).removeClass("codeLine-active");
  $(heapCodeLines[heapCurrentLine]).addClass("codeLine-active");
}
