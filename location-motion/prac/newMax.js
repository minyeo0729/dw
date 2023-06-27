var jump = new TimelineMax({ repeat: -1 });
var clickjump = new TimelineMax({});
var container = document.querySelector(".container")
var albert = document.querySelector(".albert");
var mouth = document.querySelector(".mouth");
var regular = 0;

regularJump();
clickJump();

function regularJump() {
  jump
    .to(albert, 0.5, { y: -110, ease: Sine.easeOut })
    .to(mouth, 0.1, { scaleY: 4, ease: Sine.ease }, "-=.3")
    .to(mouth, 0.1, { scaleY: 1, ease: Sine.ease })
    .to(albert, 1, { rotation: -180, transformOrigin: "center center" }, "-=.5")
    .to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=.5")
    .to(albert, 1, { rotation: -360, transformOrigin: "center center" })
    .to(albert, 0.5, { y: -100, ease: Sine.easeOut }, "-=1")
    .to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=.5")
    .to(albert, 0.5, { y: -90, ease: Sine.easeOut })
    .to(mouth, 0.1, { scaleY: 4, ease: Sine.ease }, "-=.3")
    .to(mouth, 0.1, { scaleY: 1, ease: Sine.ease })
    .to(albert, 2, { rotation: 0, transformOrigin: "center center" }, "-=.5")
    .to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=1.5")
    .to(albert, 0.5, { y: -80, ease: Sine.easeOut }, "-=1")
    .to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=.5");
}

//check easing, duration, delay 
function clickJump() {
    container.addEventListener("click", (event) => {
        var clientX= event.clientX;
        var centerX = albert.getBoundingClientRect().left + albert.getBoundingClientRect().width / 2 - gsap.getProperty(albert, "x");
        var direcntionX = clientX - centerX;
        
        clickjump.to(albert, 1, {x: direcntionX , ease: Sine.easeOut})
    })
}



