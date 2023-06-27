document.getElementById("copy").addEventListener("click", async function() {
    const makeImagePromise = async () => {
        const response = await fetch('https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png');
        return await response.blob();
    }

    navigator.clipboard.write([new ClipboardItem({ "image/png": makeImagePromise() })])
      .then(function () { console.log('copied'); })
      .catch(function (error) { console.log(error); });
});


setTimeout(async () => await navigator.clipboard.writeText('hello')) 



setTimeout(async () => await navigator.clipboard.writeText("Your text").then(function () {
    console.log("Copy to clipboard successfully.");
 }, function () {
    console.log("Copy to clipboard unsuccessfully.");
 })
);

const text = new ClipboardItem({
    "text/plain": fetch(this.sourceUrlValue)
      .then(response => response.text())
      .then(text => new Blob([text], { type: "text/plain" }))
})
navigator.clipboard.write([text])

  //copy selected text
  function CopyText(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        bootoast.toast({
          message: "<p><i class='fas fa-paste'></i>복사되었습니다!</p>",
          type: "info",
          position: "right-bottom",
          timeout: "2.5",
          animationDuration: "300",
          dismissable: false,
        });
      });
    }
  }

//autoselect 클릭했을때 this말고 미리 구한걸  복사 
// or selecttext 구문아에 copytext부르기 전에 
//152에서 copytext를 뭐 안에 넣어서 or 거기서 복사할걸 구하고 copytext(params)로 부르기 

// 이러한 경우에는 사파리에서 복사가 되지 않는다. 버튼을 누른 직후에 copy를 하지 않고, ajax를 통해 callback에서 copy가 이루어졌기 때문이다. (이러한 경우엔 위에서 언급한 clipboard.js도 동작하지 않는다.이러한 문제를 해결하기 위해서는 복사할 메시지를 미리 구해놓고 button이 클릭되어 클릭 이벤트가 발생하였을때 바로 clipboard로 복사가 되어야 한다.

 $(".dataTables_scrollBody .autoselect").click(function () {
      CopyText(this.innerText);
    });



    //copy selected text
  function CopyText(text) {
    var doc = document,
      range,
      selection;

    if (doc.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(text);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        bootoast.toast({
          message: "<p><i class='fas fa-paste'></i>복사되었습니다!</p>",
          type: "info",
          position: "right-bottom",
          timeout: "2.5",
          animationDuration: "300",
          dismissable: false,
        });
      });
    }
  }


  