const jump = gsap.timeline({repeat: -1});
const container = document.querySelector(".container")
const albert = document.querySelector(".albert");
const mouth = document.querySelector(".mouth");
const regular = 0;

regularJump();
clickJump();

function regularJump() {
    jump.to(albert, 0.5, { y: -110, ease: Sine.easeOut })
        // .to(mouth, 0.1, { scaleY: 4, ease: Sine.ease}, "-=.3")
        // .to(mouth, 0.1, { scaleY: 1, ease: Sine.ease })
        .to(albert, 1, { rotation: -180, transformOrigin: "center center" }, "-=.5")
        .to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=.5")
        .to(albert, 1, { rotation: -360, transformOrigin: "center center" })
        .to(albert, 0.5, { y: -100, ease: Sine.easeOut }, "-=1")
        .to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=.5")
        .to(albert, 0.5, { y: -90, ease: Sine.easeOut })
        // .to(mouth, 0.1, { scaleY: 4, ease: Sine.ease }, "-=.3")
        // .to(mouth, 0.1, { scaleY: 1, ease: Sine.ease })
        .to(albert, 2, { rotation: 0, transformOrigin: "center center" }, "-=.5")
        .to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=1.5")
        .to(albert, 0.5, { y: -80, ease: Sine.easeOut }, "-=1")
        .to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=.5");
}


//check easing, duration
function clickJump() {
    container.addEventListener("click", (e) => {
        const containerWidth = container.offsetWidth;
        const clientX = e.clientX;
        const albertHalf =  albert.getBoundingClientRect().width / 2;
        const centerX = albert.getBoundingClientRect().left + albertHalf - gsap.getProperty(albert, "x");
        const position = clientX > centerX ? 1 : -1;
        let directionX = clientX - centerX;
       
        if(position == 1 && (containerWidth / 2) < (directionX + (albertHalf))){
        
                directionX = (containerWidth / 2) - (albertHalf)
            
        }
        if(position == -1 && (containerWidth / 2) < ((directionX - (albertHalf)) * -1)){
        
                directionX = ((containerWidth / 2) - (albertHalf)) * -1
           
        }

        gsap.to(albert, 1, { x: directionX, ease: Sine.easeOut })
    })
}