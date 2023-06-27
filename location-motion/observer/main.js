gsap.registerPlugin(Observer);

const albert_jump = gsap.timeline({repeat: -1});
const albert_wrap = document.querySelector(".albert_wrap");
const albert = document.querySelector(".albert");
const mouth_open = document.querySelector(".mouth_open");
const regularY = 0;

const albertX = albert.getBoundingClientRect().left + albert.getBoundingClientRect().width / 2;
const albertY = albert.getBoundingClientRect().top + albert.getBoundingClientRect().height;

function getDifference(a, b) {return Math.abs(a - b);}

//original motion
albert_jump
  .to(albert, 0.5, { y: -110, ease: Sine.easeOut })
  .to(mouth_open, 0.3, { y: -1, opacity: 1, ease: Sine.easeIn }, "-=.5")
  .to(mouth_open, 0.2, { scaleY: 0, ease: Sine.easeIn })
  .to(albert, 1, { rotation: -180 }, "-=.6")
  .to(albert, 0.5, { y: regularY, ease: Sine.easeIn }, "-=.5")
  .to(albert, 1, { rotation: -360 })
  .to(albert, 0.5, { y: -100, ease: Sine.easeOut }, "-=1")
  .to(albert, 0.5, { y: regularY, ease: Sine.easeIn }, "-=.5")
  .to(albert, 0.5, { y: -90, ease: Sine.easeOut })
  .to(mouth_open, 0.3, { y: -1, scaleY: 1, ease: Sine.easeIn }, "-=.5")
  .to(mouth_open, 0.2, { scaleY: 0, ease: Sine.easeIn })
  .to(albert, 2, { rotation: regularY }, "-=.6")
  .to(albert, 0.5, { y: regularY, ease: Sine.easeIn }, "-=1.5")
  .to(albert, 0.5, { y: -80, ease: Sine.easeOut }, "-=1")
  .to(albert, 0.5, { y: regularY, ease: Sine.easeIn }, "-=.5");

//ongoing......edit more! 
  Observer.create({
    target: box,
    type: "wheel,touch,pointer",
    onClick: 
    (self) => {
        original.kill()

        var centerX = albert.getBoundingClientRect().left + albert.getBoundingClientRect().width / 2 - gsap.getProperty(albert, "x")
        var centerY = albert.getBoundingClientRect().top + albert.getBoundingClientRect().height / 2 - gsap.getProperty(albert, "y")
        var x = getDifference(centerX, self.x)
        var y = getDifference(centerY, self.y)
        var directionX = centerX > self.x ? -1 : 1
        var directionY = centerY > self.y ? -1 : 1
        console.log(self.x)
       
    }
    
});



//interaction
albert_wrap.addEventListener("click", (e) => {
  const containerWidth = albert_wrap.offsetWidth;
  const clientX = e.clientX;
  const albertHalf = albert.getBoundingClientRect().width / 2;
  let propertyX = albert._gsTransform.x;
  const centerX = albert.getBoundingClientRect().left + albertHalf - propertyX;
  let directionX = clientX - centerX;

  //prevent overflowing
  const position = clientX > centerX ? 1 : -1;
  if (position == 1 && containerWidth / 2 < directionX + albertHalf) {
    directionX = containerWidth / 2 - albertHalf;
  }
  if (position == -1 && containerWidth / 2 < (directionX - albertHalf) * -1) {
    directionX = (containerWidth / 2 - albertHalf) * -1;
  }

  TweenMax.to(albert, 0.8, { x: directionX, ease: Sine.easeOut });
});
