// 오션힐즈 호버시 텍스트, 이미지 변경
hills_hover() 
function hills_hover() {
  // if (!$(".now-di--oceanhills").length) return;
  var $section = $(".section-type__hover");
  var $item = $section.find($(".now-di-single__row-item"));
  var $show = $section.find($(".now-di-single__title > span"));

  $item.on("mouseenter", function () {
    $item.removeClass("noneopacity");
    $(this).addClass("noneopacity");

    if ($item.hasClass("noneopacity")) {
      $(this).siblings().removeClass("noneopacity");
    }
    for (let i = 0; i < $item.length; i++) {
      if ($item.eq(i).hasClass("noneopacity")) {
        $show.removeClass("show");
        $show.eq(i).addClass("show");
      }
    }
  });

    var $trigger = $(".pin");
    var $pin = $trigger.find(('.now-di-single__row'));

    console.log('test')
    let tsl = gsap.timeline({
        ease : 'none',
        duration: .1,
        scrollTrigger: {
            markers: true,
            trigger: $trigger,
            pin: $trigger,  
            start: "top top", 
            end: "+=300%",
            scrub: 1.2,
        }
    });

}

// 오션힐즈 스크롤 모션
// first_version()
function first_version(){
  // if (!$(".now-di--oceanhills").length) return;
  var item = $('.now-di-single__row')
  console.log(item.height())

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".now-di--oceanhills-pin",
      markers: { startColor: "green", endColor: "red", fontSize: "12px" },
      pin: true,   // pin the trigger element while active
      start: "top top", // when the top of the trigger hits the top of the viewport
      // end: ( 30 * 6) + "% top",
      // end: "+=100%", //literally at the bottom of viewport
      //end: 'bottom bottom', //스크롤 모션이 너무 빨리 끝나버리는 이슈, end marker located bottom of the img
      //end: () => "+=" + item.height(), //shorter than "+=100", don't count padding
      end: () => "+=" + item.innerHeight(), //with padding = same as bottom bottom -> i like this one :D
      scrub: 1, 
      //when snapped, "end" marker is keep moving - if needed! 
      snap: {
        snapTo: "labels", // snap to the closest label in the timeline
        duration: {min: 0.2, max: 3}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
        delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
        ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
      }
    }
  });

  // add animations and labels to the timeline
  tl.addLabel("start")
    .to(".now-di--oceanhills-view--scene",{opacity:0})
    .to('.now-di--oceanhills-view--location', {opacity: 1})
    .addLabel("end")
    .to('.now-di--oceanhills-view--location', {opacity: 0},'end')
    .to('.now-di--oceanhills-view--plaza', {opacity: 1})


}

//works the same just nesting scrolltriger in timeline or add animation on create
// second_version()
function second_version(){
  // if( !$('.now-di--oceanhills').length ) return;
  var $wrap = $(".now-di--oceanhills-pin");
  var $pin = $(".now-di--oceanhills-pin");
  var view_tl = new gsap.timeline();
  view_tl.to('.now-di--oceanhills-view--scene', {opacity:0});
  view_tl.to('.now-di--oceanhills-view--location',{opacity: 1});
  view_tl.to('.now-di--oceanhills-view--location', {opacity:0});
  view_tl.to('.now-di--oceanhills-view--plaza', {opacity: 1});

  ScrollTrigger.create({
    trigger: $wrap,
    pin: $pin,
    start: "top top",
    // end: () => "+=" + item.height(), 이거 요기서는 똑같이 바로 끝나버리는 이슈..
    end: "+=100%",
    scrub: 1.2,
    animation: view_tl,
    markers: { startColor: "green", endColor: "red", fontSize: "12px" },
    // pinnedContainer: 'now-di--oceanhills-pin'
  });
}
