$(window).scroll(function () {
        var sct = $(this).scrollTop();
        var leader_fixed = $('.leader_l');
        var ofs01 = $('.leader_box').offset().top;
        var ofs02 = ofs01 + $('.leader_box').height() - $(window).height();
        
        if(sct < ofs01 ){
            leader_fixed.removeClass("fixed end");
        } else if (sct > ofs01 && sct < ofs02) {
            leader_fixed.addClass("fixed");
            leader_fixed.removeClass("end");
        } else {
            leader_fixed.removeClass("fixed");
            leader_fixed.addClass("end");
        }
    });


    var leader_fixed = $('.leader_detail');
    var leader_fixed2 = $(' .leader_detail_mo');
    var leader_img = $('.leader_img img');
    var leader_txt = $('.mo_txt_wrap');
    var slideBox = $('.slide_box');
    var idx = $(slideBox).index();

    $('.leader_fixed .leader_detail').first().addClass('on')
    $.each(leader_img, function(index, item){
        $(this).mouseover(function(){
            leader_img.removeClass('on');
            $(this).addClass('on');
            leader_fixed.removeClass('on');
            leader_fixed.eq(index).addClass('on');
        });
    });
