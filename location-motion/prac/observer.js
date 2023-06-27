<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/Observer.min.js"></script>

gsap.registerPlugin(Observer);

var original = new TimelineMax({repeat: -1});
var jump = new TimelineMax({});
var albert = document.querySelector(".albert")
var box = document.querySelector(".box")
var mouth = document.querySelector(".mouth")
var icon = document.querySelector(".icon");
var regular = 0;
var albertX = albert.getBoundingClientRect().left + albert.getBoundingClientRect().width / 2;
var albertY = albert.getBoundingClientRect().top + albert.getBoundingClientRect().height;

gsap.set(icon, {xPercent:  50, yPercent: 100, left: -albertX, bottom: albertY })
regularJump()

function getDifference(a, b) {return Math.abs(a - b);}

function regularJump() {
    original
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
      .to(albert, 2, { rotation: regular, transformOrigin: "center center" }, "-=.5")
      .to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=1.5")
      .to(albert, 0.5, { y: -80, ease: Sine.easeOut }, "-=1")
      .to(albert, 0.5, { y: regular, ease: Sine.easeIn }, "-=.5");
}

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
        // jump.to(albert, 0.5, { x: x * directionX, y: y * directionY, ease: Sine.easeOut })
        //     .to(mouth, 0.1, { scaleY: 4, ease: Sine.ease }, "-=.3")
        //     .to(mouth, 0.1, { scaleY: 1, ease: Sine.ease })
        //     .to(albert, 1, { rotation: -180, transformOrigin: "center center" }, "-=.5")
        //     .to(albert, 0.5, { x: regular, y: regular, ease: Sine.easeIn }, "-=.5")
        //     .to(albert, 1, { rotation: -360, transformOrigin: "center center" })
        //     .to(albert, 0.5, { x: x * directionX, y: y * directionY, ease: Sine.easeOut }, "-=1")
        //     .to(albert, 0.5, { x: regular, y: regular, ease: Sine.easeIn }, "-=.5")
        //     .to(albert, 0.5, { x: x * directionX, y: y * directionY, ease: Sine.easeOut })
        //     .to(mouth, 0.1, { scaleY: 4, ease: Sine.ease }, "-=.3")
        //     .to(mouth, 0.1, { scaleY: 1, ease: Sine.ease })
        //     .to(albert, 2, { rotation: 0, transformOrigin: "center center" }, "-=.5")
        //     .to(albert, 0.5, { x: regular, y: regular, ease: Sine.easeIn }, "-=1.5")
        //     .to(albert, 0.5, { x: x * directionX, y: y * directionY, ease: Sine.easeOut }, "-=1")
        //     .to(albert, 0.5, { x: regular, y: regular, ease: Sine.easeIn }, "-=.5");
        // original.restart();
    }
    
});
//수정할 부분
//if문써서 max-width - albert크기 해서 조절하면 box안넘어가게됨 
//- kill()때문에 클릭끝나고서 repeat도 사라져서 아무 애니메이션x 
//- 클릭을 box에 제한해두긴했는데 icon이 absolute라서 그런지 알버트가 box밖으로 나감 
//- 이거 클릭하는곳으로 이동시켜야하는거면 jump.to를 다른 코드로 만들면됨 지금은 아예그냥애니메이션 똑같이 4초동안 계속되고
//끝나고난다음에 다음클릭한 좌표로 애니메이션 동작중임 차라리 한번 글로 갔다가 원래 애니메이션이 플레이되어야 하지않나?
//그렇게따지면 kill()할필요가없는거아닌가 ?? onChange라던지... 뭐 바꿔주는거없나 
//그니까 0 0 으로 찍고 클릭한 위치로 가긴 해야겠음 지금은 가긴가는데 그냥 옆에서 이동해버림 
//- 입모양은 svg path자체를 다르게 받아오면 될거같음 scaleY가 맞는거같음 

//study note 
//onChange, onPress와의 차이점 => console.log로 파악 
//onRelease는 onPress가 끝나고나면 실행됨 





