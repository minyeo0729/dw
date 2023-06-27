const albert_jump = new TimelineMax({ repeat: -1 });
const albert_wrap = document.querySelector(".albert_wrap");
const albert = document.querySelector(".albert");
const mouth_open = document.querySelector(".mouth_open");
const mouth_close = document.querySelector(".mouth_close");
const containerY = albert_wrap.offsetHeight;
const regularY = 0;
//original motion
albert_jump.to(albert, 0.5, {y: -containerY*0.45, ease: Sine.easeOut})
            .to(mouth_close, 0.4, {scaleY: 0, opacity:0, ease: Sine.easeIn}, "-=.4")
            .to(mouth_open, 0.3, {y: -1, opacity: 1, ease: Sine.easeIn}, "-=.5")
            .to(mouth_close, 0.1, {scaleY: 1, opacity:1, ease: Sine.easeIn})
            .to(mouth_open, 0.2, {scaleY: 0, ease: Sine.easeIn}, "-=.1")
            .to(albert, 1, {rotation: -180}, "-=.6")
            .to(albert, 0.5, {y: regularY, ease: Sine.easeIn}, "-=.5")
            .to(albert, 1, {rotation: -360})
            .to(albert, 0.5, {y: -containerY*0.38, ease: Sine.easeOut}, "-=1")
            .to(albert, 0.5, {y: regularY, ease: Sine.easeIn}, "-=.5")
            .to(albert, 0.5, {y: -containerY*0.38, ease: Sine.easeOut})
            .to(mouth_close, 0.4, {scaleY: 0, opacity:0, ease: Sine.easeIn}, "-=.4")
            .to(mouth_open, 0.3, {y: -1, scaleY: 1,  ease: Sine.easeIn}, "-=.5")
            .to(mouth_close, 0.1, {scaleY: 1, opacity:1, ease: Sine.easeIn})
            .to(mouth_open, 0.2, {scaleY: 0, ease: Sine.easeIn}, "-=.1")
            .to(albert, 2, {rotation: regularY}, "-=.6")
            .to(albert, 0.5, {y: regularY, ease: Sine.easeIn}, "-=1.5")
            .to(albert, 0.5, {y: -containerY*0.34, ease: Sine.easeOut}, "-=1")
            .to(albert, 0.5, {y: regularY, ease: Sine.easeIn}, "-=.5");
//interaction 
albert_wrap.addEventListener("click", (e) => {
    const containerX = albert_wrap.offsetWidth;
    const clientX = e.clientX;
    const albertHalf = albert.clientWidth / 2;
    let propertyX = albert._gsTransform.x;
    const centerX = albert.getBoundingClientRect().left + albertHalf - propertyX;
    let directionX = clientX - centerX;

    //prevent overflowing 
    const position = clientX > centerX ? 1 : -1;
    if (position == 1 && containerX / 2 < directionX + albertHalf) {
      directionX = containerX / 2 - albertHalf;
    }
    if (position == -1 && containerX / 2 < (directionX - albertHalf) * -1) {
      directionX = (containerX / 2 - albertHalf) * -1;
    }

    TweenMax.to(albert, 0.8, { x: directionX, ease: Sine.easeOut });

    const Half = albert.clientWidth;
console.log(Half)

})
