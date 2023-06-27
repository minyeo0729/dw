
const albert_jump = new TimelineMax({ repeat: -1 });
const albert_wrap = document.querySelector(".albert_wrap");
const albert = document.querySelector(".albert");
const regular = 0;

const mouth_open = document.querySelector(".mouth_open");
const mouth_close = document.querySelector(".mouth_close");

// const mouth_open = document.querySelector(".mouth_open");
// const mouth_close = document.querySelector(".mouth_close");

//original motion
albert_jump.to(albert, 0.5, { y: -110, ease: Sine.easeOut })
.to(mouth_close, 0.1, {morphSVG: mouth_open, ease: Sine.easeIn}, "-=.4")
.to(mouth_close, 0.1, {morphSVG: mouth_close, ease: Sine.easeIn})
.to(albert, 1, { rotation: -180 }, "-=.5")
// .to(mouth_open, 0.1, { opacity: 1, ease: Circ.easeIn}, "-=.3")
// .to(mouth_open, 0.1, { opacity: 0, ease: Circ.easeIn})
.to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=.5")
.to(albert, 1, { rotation: -360 })
.to(albert, 0.5, { y: -100, ease: Sine.easeOut }, "-=1")
.to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=.5")
.to(albert, 0.5, { y: -90, ease: Sine.easeOut })
.to(mouth_close, 0.1, {morphSVG: mouth_open, ease: Sine.easeIn}, "-=.4")
.to(mouth_close, 0.1, {morphSVG: mouth_close, ease: Sine.easeIn})
// .to(mouth_open, 0.1, { opacity: 1, ease: Circ.easeIn}, "-=.3")
// .to(mouth_open, 0.1, { opacity: 0, ease: Circ.easeIn})
.to(albert, 2, { rotation: regular }, "-=.5")
.to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=1.5")
.to(albert, 0.5, { y: -80, ease: Sine.easeOut }, "-=1")
.to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=.5");

//interaction 
albert_wrap.addEventListener("click", (e) => {
    const containerWidth = albert_wrap.offsetWidth;
    const clientX = e.clientX;
    const albertHalf = albert.getBoundingClientRect().width / 2;
    let propertyX = albert._gsTransform.x;
    const centerX = albert.getBoundingClientRect().left + albertHalf - propertyX;
    const position = clientX > centerX ? 1 : -1;
    let directionX = clientX - centerX;
  
    if (position == 1 && containerWidth / 2 < directionX + albertHalf) {
      directionX = containerWidth / 2 - albertHalf;
    }
    if (position == -1 && containerWidth / 2 < (directionX - albertHalf) * -1) {
      directionX = (containerWidth / 2 - albertHalf) * -1;
    }
    TweenMax.to(albert, 1, { x: directionX, ease: Sine.easeOut });
})