document.getElementById("copy").addEventListener("click", async function() {
    const response = await fetch('https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png');
    const blob = await response.blob();

    navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
      .then(function () { console.log('copied'); })
      .catch(function (error) { console.log(error); });
});