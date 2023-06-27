nav_Active()
        function nav_Active() {
            //make nav sticky on scroll down 
            var $nav_tab = $('.tab-menu-wrapper');
            var tab_offset = $nav_tab.offset().top;
            $(window).on('scroll', function () {
                if ($(window).scrollTop() > tab_offset) {
                    $nav_tab.addClass('sticky');
                } else {
                    $nav_tab.removeClass('sticky');
                }
            })

            //add active class on tab when section is scrolled 
            var position = 0;
            var sections_position = function () {
                var sections_position = [];
                $('.tab-menu li ').each(function (i) {
                    var sectionHref = $(this).find('a').attr('href');
                    var section_top = $(sectionHref).offset().top;
                    sections_position.push(section_top);
                })
                sections_position.push($('#footer').offset().top)
                return sections_position;
            }
            var check_current_section = function (section_postion) {
                var current_window_scroll = $(window).scrollTop();
                $.each(section_postion, function (index, section) {
                    var id = $('.tab-menu li a').eq(index).attr('href');
                    var position = section;
                    var next_position = 0;
                    var offset = $('.tab-menu').outerHeight();

                    if (index < section_postion.length) {
                        next_position = section_postion[index + 1];
                        console.log(section_postion)
                    }

                    if (current_window_scroll >= position - offset) {
                        //스크롤한게 해당 섹션 오프셋탑보다 더 크고, 다음섹션오프셋탑이 스크롤한거보다 더 클때? 
                        $('.tab-menu li a').removeClass('active');
                        $('.tab-menu li a[href="' + id + '"]').addClass('active');

                    }
                    if (current_window_scroll < next_position - offset) {
                    }
                });
            }
            var track_pos = function () {
                position = sections_position();
                check_current_section(position);
            }
            $(window).on('scroll', track_pos);
            console.log($('#footer').offset().top)

        }

        click_animate()
        function click_animate() {
            $('.tab-menu li a').on('click', function (e) {
                e.preventDefault();

                var $this = $(this);
                var target = $this.attr('href');
                var offset = $('.tab-menu').outerHeight();
                //tab-menu가 position: absolute이면? 

                // if( $(window).scrollTop() > $(target).offset().top && !$('.tab-menu-wrapper').is('.sticky')){
                //     $('html, body').animate({scrollTop: 100})
                // }
                $('html, body').animate({ scrollTop: $(target).offset().top - offset })




            })



        }
