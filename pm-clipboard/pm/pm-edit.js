function SelectText(element) {
    var doc = document,
        range,
        selection;

    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
function CopyText() {
  document.execCommand("Copy");
  bootoast.toast({
    message: "<p><i class='fas fa-paste'></i>복사되었습니다!</p>",
    type: "info",
    position: "right-bottom",
    timeout: "2.5",
    animationDuration: "300",
    dismissable: false,
  });
}

$(".dataTables_scrollBody .autoselect").click(function () {
  SelectText(this);
  CopyText();
});

$(".jt-vscode-config").on("click", function () {
  var $this = $(this);
  var $target = $this.find(".jt-vscode-value");
  $target.select();
  CopyText();
});
