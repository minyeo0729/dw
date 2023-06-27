// let copyButton = document.getElementById('copyToClipboard');

// copyButton.addEventListener('click', () => {
//     let getText = document.getElementById('myDiv').innerText;
//     if(navigator.clipboard){
//         navigator.clipboard.writeText(getText).then(()=>{
//             alert('copied!')
//         })
//     }
// })
let myDiv = document.getElementById('myDiv');

myDiv.addEventListener('click', function(){
    console.log(this)
    SelectText(this);
})
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

    CopyText();
}
function CopyText(){
    let getText = window.getSelection().anchorNode.textContent;
    if(navigator.clipboard){
        navigator.clipboard.writeText(getText).then(()=>{
            bootoast.toast({
                message: "<p><i class='fas fa-paste'></i>복사되었습니다!</p>",
                type: "info",
                position: "right-bottom",
                timeout: "2.5",
                animationDuration: "300",
                dismissable: false,
              });
        })
    }
}

// function CopyText(){
//     let getText = document.getElementById('myDiv').innerText;
//     if(navigator.clipboard){
//         navigator.clipboard.writeText(getText).then(()=>{
//             bootoast.toast({
//                 message: "<p><i class='fas fa-paste'></i>복사되었습니다!</p>",
//                 type: "info",
//                 position: "right-bottom",
//                 timeout: "2.5",
//                 animationDuration: "300",
//                 dismissable: false,
//               });
//         })
//     }
// }