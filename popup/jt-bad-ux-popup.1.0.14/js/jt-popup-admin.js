jQuery( function ( $ ) {


/* **************************************** *
 * Functions Init
 * **************************************** */

high_class_settings();
magnific_popup();
click_button();

switch_init();
icheck_init();
accordion_init();
accordion_list();
range_handle();
match_height();
color_picker();
datetime_picker();
overlay_color();
btn_hover();
admin_studio_jt_link();

focus_on_tab_only();

jtpopup_form_submit();

sortable_handle();

page_exposure_list_action();

// AJAX 대응
$( document ).ajaxComplete( function () {

    switch_init();
    icheck_init();
    accordion_init();
    range_handle();
    match_height();
    color_picker();
    datetime_picker();

    focus_on_tab_only();

    sortable_handle();

    page_exposure_list_init();

} );

if ( typeof wp.media !== 'undefined' ) {

    var wp_media = wp.media( {
        title       : wp.media.view.l10n.addMedia,
        multiple    : false
    } );

}

/* **************************************** *
 * Functions
 * **************************************** */

/**
 * 고급설정 아코디언
 *
 * @author STUDIO-JT (JDY)
 */
function high_class_settings() {

    $( document ).on( 'click', '.jtpopup-expand-container .jtpopup-expand-label', function () {

        var $target = $( this ).closest( '.jtpopup-expand-container' );
        var height  = $target.find( '.jtpopup-expand-content' ).outerHeight();

        $target.toggleClass( 'open' );
        $target.find( '.jtpopup-expand-content ul' ).slideToggle( 300 );

        return false;

    } );

}



/**
 * layer popup
 *
 * @author STUDIO-JT (SUMI, 201)
 */
function magnific_popup() {

    // POPUP ADD
    $( document ).on( 'click', '.jt_popup_item_add a', function () {

        var $this = $( this );

        if ( $this.hasClass( 'clicked' ) ) {

            return false;

        }

        $this.toggleClass( 'clicked' );

        $.get( ajaxurl, { action: 'jtpopup_admin_form' }, function ( res ) {

            if ( $( '#jt_popup_register' ).length == 0 ) {

                $( res ).appendTo( 'body' );

            } else {

                $( '#jt_popup_register' ).replaceWith( res );

            }

            var $form = $( '#jt_popup_register' );

            $.magnificPopup.open( {
                items       : { src: '#jt_popup_register' },
                type        : 'inline',
                preloader   : false,
                fixedBgPos  : true,
                modal       : true,

            } );

            $this.toggleClass( 'clicked' );

        } );

        return false;

    } );

    // POPUP PREVIEW
    $( document ).on( 'click', '.btn_preview', function () {

        var $this   = $( this );
        var id      = $( this ).closest( '.jt_popup_item' ).data( 'jtpopup-id' );

        if ( $this.hasClass( 'clicked' ) ) { return false; }

        $this.toggleClass( 'clicked' );

        $.get( ajaxurl, { action: 'jtpopup_preview', jtpopup_id: id }, function (res ) {

            if ( res.success ) {

                var $html = $( res.data );

                if ( $( '#jt_popup_container' ).length > 0 ) {

                    $( '#jt_popup_container' ).replaceWith( $html );

                } else {

                    $html.appendTo( 'body' );

                }

                $( '#jt_popup_container' ).imagesLoaded( jtpopup_show );
				// jtpopup_show();

            } else {

                alert( res.data );

            }

            $this.toggleClass( 'clicked' );

        } );

    } );

    // POPUP EDIT
    $( document ).on( 'click', '.btn_modify', function () {

        var $this   = $( this );
        var id      = $this.closest( '.jt_popup_item' ).data( 'jtpopup-id' );

        if ( $this.hasClass( 'clickd' ) ) { return false; }

        $this.toggleClass( 'clicked' );

        $.get( ajaxurl, { action: 'jtpopup_admin_form', jtpop_id: id }, function ( res ) {

            if ( $( '#jt_popup_register' ).length == 0 ) {

                $( res ).appendTo( 'body' );

            } else {

                $( '#jt_popup_register' ).replaceWith( res );

            }

            var $form = $( '#jt_popup_register' );

            $.magnificPopup.open( {
                items       : { src: '#jt_popup_register' },
                type        : 'inline',
                preloader   : false,
                fixedBgPos  : false,
                modal       : true,
            } );

            $this.toggleClass( 'clicked' );

        } );

        return false;

    } );

    // POPUP REMOVE
    $( document ).on( 'click', '.btn_delete', function () {

        var $this   = $( this );
        var $form   = $( '.jtpopup_remove_form' );
        var data    = $form.serializeObject();

        if ( $this.hasClass( 'clicked' ) ) { return false; }

        $this.toggleClass( 'clicked' );

        if ( data ) {

            if ( confirm( '팝업을 삭제하시겠습니까?' ) ) {

                data.jtpopup_id = $this.closest( '.jt_popup_item' ).data( 'jtpopup-id' );

                $.post( ajaxurl, data, function ( res ) {

                    if ( res.success ) {

                        alert( '삭제되었습니다' );

                        $this.closest( '.jt_popup_item' ).fadeOut( 'slow', function () { $( this ).remove(); } );

                    } else {

                        alert( res.data );

                    }

                } );

            }

            $this.toggleClass( 'clicked' );

        } else {

            alert( '잘못된 접근입니다.' );
            location.reload();

        }

        return false;

    } );

    // MOBILE POPUP MENU TOGGLE
    if ( is_mobile() ) {

        $( document ).on( 'click', function ( e ) {

            if ( $( e.target ).closest( '.jt_popup_item' ).length > 0 ) {

                $( e.target ).closest( '.jt_popup_item' ).toggleClass( 'hover' );

            } else {

                $( '.jt_popup_item' ).removeClass( 'hover' );

            }

        } );

    }

}

/**
 * switch button init
 *
 * @author STUDIO-JT (SUMI, 201)
 */
function switch_init() {

    // SWITCH BUTTON INIT
    $( '.switch_input:checked' ).each( function () {

        $( this ).closest( '.switch_wrap' ).addClass( 'switch_on' );

    } );

}

/**
 * click button
 *
 * @author STUDIO-JT (SUMI, 201)
 */
function click_button() {

    $( document ).on( 'click', '.url_clear', function () {

        var $this   = $( this );
        var $wrap   = $this.closest( '.jt_label_link' );
        var $target = $wrap.find( 'input[name="jtpopup[url]"]' );

        if ( $target.length > 0 ) {

            $target.val( '' ).focus();

        }

        return false;

    } );

    // SWITCH BUTTON
    $( document ).on( 'click', '.switch, .switch+span', function () {

        var $wrap = $( this ).closest( '.switch_wrap' );

        $wrap.toggleClass( 'switch_on' );
        $wrap.find( 'input.switch_input' ).prop( 'checked', ! $wrap.hasClass( 'switch_on' ) );

    } );

    // TOOLTIP BUTTON
    $( document )
        .on( 'mouseover', '.jt_popup_tooltip', function () {

            $( this ).parents( '.jt_popup_form_item' ).find( '.jt_popup_tooltip_cont' ).addClass( 'active' );

        } ).on( 'mouseleave', function () {

            $( this ).parents( '.jt_popup_form_item' ).find( '.jt_popup_tooltip_cont' ).removeClass( 'active' );

        } );

    if ( is_mobile() ) {

        $( document ).on( 'click', '.jt_popup_tooltip', function () {

            $( this ).parents( '.jt_popup_form_item' ).find( '.jt_popup_tooltip_cont' ).toggleClass( 'active' );

        } );

    }

    // IMAGE SELECT
    $( document ).on( 'click', '.btn_img_add, .jt_popup_register_img', function () {

        var $this       = $( this );
        var $wrap       = $this.closest( '.jt_popup_register_item' );
        var is_letina   = ( $this.closest( '.jt_popup_register_img_wrap' ).find( '.jt_popup_register_item' ).index( $wrap ) == 1 );
        var jt_media    = wp.media( { multiple: false } );

        jt_media.on( 'select', function () {

            var attachment  = jt_media.state().get( 'selection' ).first().toJSON();
            var $html       = $( $( '#jtAfterImageAdd' ).html() );
            var $input      = $( '[name="jtpopup[image]"]' );

            if ( is_letina ) {

                $html   = $( $( '#jtAfterLetinaAdd' ).html() );
                $input  = $( '[name="jtpopup[letina]"]' );

            }

            var img_src = attachment.sizes.full.url;

            if ( typeof attachment.sizes.thumbnail !== 'undefined' ) {

                img_src = attachment.sizes.thumbnail.url;

            }

            if ( ! is_mobile() && typeof attachment.sizes.medium !== 'undefined' ) {

                img_src = attachment.sizes.medium.url;

            }

            var file_name       = attachment.sizes.full.url.split( '/' ).pop().split( '.' )[ 0 ];
            var file_extension  = attachment.sizes.full.url.split( '.' ).pop();

            file_name = ( ( file_name + '.' + file_extension ).length > 20 ? file_name.substr( 0, 15 ) + ' ... .' + file_extension : file_name + '.' + file_extension );

            $( 'p.desc', $html ).text( file_name );
            $( 'img', $html ).attr( 'src', img_src );
            $input.val( attachment.id );

            $wrap.replaceWith( $html );

        } );

        jt_media.open();

        return false;

    } );

    // IMAGE REMOVE
    $( document ).on( 'click', '.btn_img_delete', function () {

        var $this       = $( this );
        var $wrap       = $this.closest( '.jt_popup_register_item' );
        var is_letina   = ( $( '.jt_popup_register_item' ).index( $wrap ) == 1 );
        var $preview    = $wrap.find( '.jt_popup_register_fig' );
        var $html       = $( $( '#jtBeforeImageAdd' ).html() );
        var $input      = $( '[name="jtpopup[image]"]' );

        if ( is_letina ) {

            $html   = $( $( '#jtBeforeLetinaAdd' ).html() );
            $input  = $( '[name="jtpopup[letina]"]' );

        }

        $wrap.replaceWith( $html );
        $input.val( '' );

    } );

    // RESET CONFIG
    $( document ).on( 'click', '.jt_popup_btn_undo, .jt_popup_btn_delete', function () {

        var msg = ( $( this ).hasClass( 'jt_popup_btn_undo' ) ? '설정을 초기화 하시겠습니까?' : '설정을 취소하시겠습니까?' );

        if ( ! confirm( msg ) ) { return false; }

        if ( ( $( this ).hasClass( 'jt_popup_btn_undo' ) && typeof jtpopup.default !== 'undefined' ) || ( $( this ).hasClass( 'jt_popup_btn_delete' ) && typeof jtpopup.current !== 'undefined' ) ) {

            var data = ( $( this ).hasClass( 'jt_popup_btn_delete' ) ? jtpopup.current : jtpopup.default );

            set_config_data( data );

        }

        function set_config_data( data, parent ) {

            $.each( data, function ( key, value ) {

                if ( typeof value === 'object' ) {

                    set_config_data( value, key );

                } else {

                    var name = 'jtpopup[' + key + ']';

                    if ( typeof parent !== 'undefined' ) {

                        name = 'jtpopup[' + parent + '][' + key + ']';

                    }

                    var $target = $( '[name="' + name + '"]' );
                    var type    = $target.attr( 'type' );

                    if ( type == 'radio' || type == 'checkbox' ) {

                        $target.each( function () {

                            var $this = $( this );

                            if ( $this.hasClass( 'jt_icheck' ) ) {

                                $this.iCheck( $this.val() == value ? 'check' : 'uncheck' );

                            } else {

                                $this.prop( 'checked', $this.val() == value );

                            }

                            if ( $this.hasClass( 'switch_input' ) ) {

                                $this.closest( '.switch_wrap' ).removeClass( 'switch_on' );

                                if ( $this.prop( 'checked' ) ) {

                                    $this.closest( '.switch_wrap' ).addClass( 'switch_on' );

                                }

                            }
                        } );

                    } else {

                        $target.val( value );

                        if ( $target.closest( '.range_overlay_wrap' ).length > 0 ) {

                            $( '#range_overlay' ).slider( 'option', 'value', value );

                        }

                        if ( $target.hasClass( 'colorpicker' ) ) {

                            $target.minicolors( 'value', value );

                        }

                    }

                }

            } );

        }

        return false;

    } );

    jtpopup_shadow_preview();
    $( document ).on( 'input', '[name*=shadow]', jtpopup_shadow_preview );

    function jtpopup_shadow_preview() {

        var $target     = $( '.shadow_box' );
        var use_flag    = $( '[name="jtpopup[shadow][use]"]' ).is( ':checked' );
        var x           = $( '[name="jtpopup[shadow][x]"]' ).val();
        var y           = $( '[name="jtpopup[shadow][y]"]' ).val();
        var size        = $( '[name="jtpopup[shadow][size]"]' ).val();
        var color       = $( '[name="jtpopup[shadow][color]"]' ).val();

        if ( parseInt( x ) ) {

            if ( parseInt( x ) > 30 ) {

                $( '[name="jtpopup[shadow][x]"]' ).val( 30 );
                x = 30;

            } else {

                x = parseInt( x );

            }

        } else {

            $( '[name="jtpopup[shadow][x]"]' ).val( 1 );
            x = 1;

        }

        if ( parseInt( y ) ) {

            if ( parseInt( y ) > 30 ) {

                $( '[name="jtpopup[shadow][y]"]' ).val( 30 );
                y = 30;

            } else {

                y = parseInt( y );

            }

        } else {

            $( '[name="jtpopup[shadow][y]"]' ).val( 1 );
            y = 1;

        }

        if ( parseInt( size ) ) {

            if ( parseInt( size ) > 50 ) {

                $( '[name="jtpopup[shadow][size]"]' ).val( 50 );
                size = 50;

            } else {

                size = parseInt( size );

            }

        } else {

            $( '[name="jtpopup[shadow][size]"]' ).val( 1 );
            size = 1;

        }


        if ( use_flag ) {

            $target.css( 'box-shadow', x + 'px ' + y + 'px ' + size + 'px ' + color );

        } else {

            $target.css( 'box-shadow', 'none' );

        }

    }

    // 항상 노출 클릭시 시작일, 종료일은 비활성화
    $( document ).on( 'ifClicked', 'input:checkbox[name="jtpopup[always_flag]"]', function () {

        var $this   = $( this );
        var checked = ! $this.prop( 'checked' );
        var $wrap   = $this.closest( '.jt_popup_register_item_cont' );
        var $start  = $( 'input[name="jtpopup[start_date]"]', $wrap );
        var $end    = $( 'input[name="jtpopup[end_date]"]', $wrap );

        $start.prop( 'disabled', checked );
        $end.prop( 'disabled', checked );

        if ( checked ) {

            $start.closest( '.jt_label' ).addClass( 'disabled' );
            $end.closest( '.jt_label' ).addClass( 'disabled' );

        } else {

            $start.closest( '.jt_label' ).removeClass( 'disabled' );
            $end.closest( '.jt_label' ).removeClass( 'disabled' );

        }

    } );

}



 /**
 * icheck plugin init 함수
 * checkbox와 radio 커스텀 스타일을 설정합니다.
 * 각 사이트별 맞춤 skin css 파일을 연동합니다. (ex. minimal.css)
 *
 * @author STUDIO-JT (KMS)
 * @see {@link http://icheck.fronteed.com|icheck API}
 * @requires icheck.js
 * @requires /icheck/*.css
 *
 * @example
 * // markup sample
 * <label class="jt_icheck_label"><input class="jt_icheck" type="checkbox" /> <span>체크박스</span></label>
 * <label class="jt_icheck_label"><input class="jt_icheck" type="radio" /> <span>라디오</span></label>
 *
 */
function icheck_init() {

    $( '.jt_icheck' ).iCheck( {
        checkboxClass   : 'icheckbox_minimal',
        radioClass      : 'iradio_minimal'
    } );

}



/**
 * ACCORDION
 *
 * @author STUDIO-JT (SUMI)
 */
function accordion_init() {

    $( '.jt_accordion_item' ).each( function () {

        if ( ! $( this ).hasClass( 'active' ) ) {

            $( this ).find( '.jt_accordion_content_wrap' ).hide();

        }

    } );

}

function accordion_list() {

    $( document ).on( 'click', '.jt_accordion .jt_accordion_title', function () {

        var $item = $( this ).parent( '.jt_accordion_item' );

        if ( $item.hasClass( 'active' ) ) { // CLOSE

            $item.removeClass( 'active' );
            $item.find( '.jt_accordion_content_wrap' ).slideUp();

        } else { // OPEN

            $item.addClass( 'active' );
            $item.siblings( 'div' ).removeClass( 'active' );
            $item.siblings( 'div' ).find( '.jt_accordion_content_wrap' ).slideUp();
            $item.find( '.jt_accordion_content_wrap' ).slideDown();

        }

        return false;

    } );

}



/**
 * RANGE HANDLE
 *
 * @author STUDIO-JT (SUMI, 201)
 */
function range_handle() {

    var $handle = $( '#range_overlay_handle' );
    var $wrap   = $handle.closest( '.range_overlay_wrap' );
    var $target = $( 'input:hidden', $wrap );

    $( '#range_overlay' ).slider( {
      range     : 'min',
      value     : parseInt( $target.val() ) ? parseInt( $target.val() ) : 50,
      min       : 0,
      max       : 100,
      create    : function () {

                    $handle.text( $( this ).slider( 'value' ) );
                    $( '.overlay_box' ).css( { opacity: $( this ).slider( 'value' ) * 0.01 } );

                },
      slide     : function ( event, ui ) {

                    $handle.text( ui.value );
                    $target.val( ui.value );
                    $( '.overlay_box' ).css( { opacity: ui.value * 0.01 } );

                },
      change    : function ( event, ui ) {

                    $handle.text( ui.value );
                    $target.val( ui.value );
                    $( '.overlay_box' ).css( { opacity: ui.value * 0.01 } );

                }
    } );

}

function overlay_color() {

    $( document ).on( 'input change', 'input[name="jtpopup[overlay][color]"]', function () {

        $( '.overlay_box' ).css( 'background', $( this ).val() );

    } );

}

function btn_hover() {

	var $target = $('.jt_popup_item .jt_popup_item_fig .jt_popup_item_util_down_btn button')

    $target.hover(function() {

		$target.addClass("btn_hover");

	}, function(){

		$target.removeClass("btn_hover");

	});

}



function admin_studio_jt_link() {

	$('.jt_popup_head_inner .jt_popup_title').append('<i>Made by <a href="https://studio-jt.co.kr/" target="_blank" rel= "noopener noreferrer" class="studio_jt_link">studio-jt.co.kr</a></i>')

}



/**
 * element height matching function
 * v1.0 notice: inner 아이템이 아닌 리스트 outer wrap에 셋팅해야 합니다.
 *
 * @version 1.0.0
 * @since 2018-02-03
 * @author STUDIO-JT (KMS)
 * @see {@link https://codepen.io/micahgodbolt/pen/FgqLc|Reference}
 */
function match_height() {

    // ELEMENT
    var $item = $( '.jt_popup_mobile_box .jt_popup_form_item > .desc' );

    // INIT
    jt_equal_height();

    // RESIZE
    $( window ).resize( jt_equal_height );

    // ADD CLOSURES TO KEEP THE $ITEM ALIVE
    function jt_equal_height() {

        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;

        $item.each( function() {

            $el = $( this );
            $el.height( 'auto' );
            topPostion = $el.position().top;

            if ( currentRowStart != topPostion ) {

                for ( currentDiv = 0; currentDiv < rowDivs.length; currentDiv++ ) {

                    rowDivs[ currentDiv ].height( currentTallest );

                }

                rowDivs.length  = 0;
                currentRowStart = topPostion;
                currentTallest  = $el.height();

                rowDivs.push( $el );

            } else {

                rowDivs.push( $el );
                currentTallest = ( currentTallest < $el.height() ) ? ( $el.height() ) : ( currentTallest );

            }

            for ( currentDiv = 0; currentDiv < rowDivs.length; currentDiv++ ) {

                rowDivs[ currentDiv ].height( currentTallest );

            }

        } );

    } // jt_equal_height()

}



/**
 * Color Picker
 *
 * @author STUDIO-JT (201)
 */
function color_picker() {

    if ( $( '.colorpicker' ).length > 0 && typeof $.fn.minicolors !== 'undefined' ) {

        $( '.colorpicker' ).minicolors( { inline: false } );

    }

}



/**
 * Date Time Picker
 *
 * @author STUDIO-JT (201)
 */
function datetime_picker() {

    if ( $( 'input.datetime_picker' ).length > 0 && typeof $.fn.datetimepicker !== 'undefined' ) {

        var $start_date = $( 'input.datetime_picker[name="jtpopup[start_date]"]' );
        var $end_date   = $( 'input.datetime_picker[name="jtpopup[end_date]"]' );

        $start_date.datetimepicker( {
            controlType     : 'select',
            showButtonPanel : false,
            oneLine         : true,
            dateFormat      : 'yy-mm-dd',
            timeFormat      : 'HH:mm',
            currentText     : '현재',
            closeText       : '닫기',
            timeText        : '시간',
            onClose         : function () {

                                if ( ! $start_date.val() ) {

                                    $end_date.datetimepicker( 'option', 'minDate', null );

                                } else if ( $end_date.val() && $start_date.datetimepicker( 'getDate' ) > $end_date.datetimepicker( 'getDate' ) ) {

                                    $end_date.datetimepicker( 'setDate', $start_date.datetimepicker( 'getDate' ) );

                                }

                            },
            onSelect        : function ( datetimeText, instance ) {

                                $end_date.datetimepicker( 'option', 'minDate', $start_date.datetimepicker( 'getDate' ) );

                            }
        } );


        $end_date.datetimepicker( {
            controlType     : 'select',
            showButtonPanel : false,
            oneLine         : true,
            dateFormat      : 'yy-mm-dd',
            timeFormat      : 'HH:mm',
            currentText     : '현재',
            closeText       : '닫기',
            timeText        : '시간',
            hour            : 23,
            minute          : 59,
            onClose         : function () {

                                if ( ! $end_date.val() ) {

                                    $start_date.datetimepicker( 'option', 'minDate', null );

                                } else if ( $start_date.val() && $start_date.datetimepicker( 'getDate' ) > $end_date.datetimepicker( 'getDate' ) ) {

                                    $start_date.datetimepicker( 'setDate', $end_date.datetimepicker( 'getDate' ) );

                                }

                            },
            onSelect        : function () {

                                $start_date.datetimepicker( 'option', 'maxDate', $end_date.datetimepicker( 'getDate' ) );

                            }
        } );

        if ( $start_date.val() ) {

            $end_date.datetimepicker( 'option', 'minDate', $start_date.datetimepicker( 'getDate' ) );

        }

        if ( $end_date.val() ) {

            $start_date.datetimepicker( 'option', 'maxDate', $end_date.datetimepicker( 'getDate' ) );

        }

    }

}



/**
 * 접근성 & UX 개선 (키보드 사용할때만 포커스 나오게)
 *
 * @author STUDIO-JT (Nico)
 */
function focus_on_tab_only() {

    var $body = $( 'body' );

    $body.on( 'mousedown', function () {

        $body.addClass( 'use_mouse' );

    } ).on( 'keydown', function () {

        $body.removeClass( 'use_mouse' );

    } );

}



/**
 * 팝업 Submit 처리
 *
 * @author STUDIO-JT (201)
 */
function jtpopup_form_submit() {

    $( document ).on( 'submit', '.jt_popup_form', function () {

        try {

            var $form = $( this );
            var data  = JSON.parse( $form.serializeJSON() );

            if ( $( 'input[name="jtpopup[start_date]"]', $form ).prop( 'disabled' ) && $( 'input[name="jtpopup[start_date]"]', $form ).val() ) {

                data.jtpopup.start_date = $( 'input[name="jtpopup[start_date]"]', $form ).val();

            }


            if ( $( 'input[name="jtpopup[end_date]"]', $form ).prop( 'disabled' ) && $( 'input[name="jtpopup[end_date]"]', $form ).val() ) {

                data.jtpopup.end_date = $( 'input[name="jtpopup[end_date]"]', $form ).val();

            }

            if ( ! $( '[name="jtpopup[image]"]', $form ).val() ) {

                alert( '기본 이미지를 선택해주세요.' );
                return false;

            }

            if ( $( '[name="jtpopup[platform]"]:checked', $form ).length == 0 ) {

                alert( '팝업 노출 위치를 선택해주세요.' );
                return false;

            }

            if ( $( '[name="jtpopup[always_flag]"]:checked', $form ).length == 0 ) {

                if ( ! $( '[name="jtpopup[start_date]"]', $form ).val() || ! $( '[name="jtpopup[end_date]"]', $form ).val() ) {

                    alert( '팝업 게시기간을 설정해주세요.' );
                    return false;

                }

            }


            if ( confirm( '팝업을 저장하시겠습니까?' ) ) {

                $.post( ajaxurl, data, function ( res ) {

                    if ( res.success ) {

                        $.get( location.href, function ( res ) {

                            var $content = $( res ).find( '.jt_popup_contents' );

                            $( '.jt_popup_contents' ).replaceWith( $content );

                            alert( '저장되었습니다.' );

                            $.magnificPopup.close();

                        } );

                    } else {

                        alert( res.data );

                    }

                } );

            }

        } catch ( e ) {

            alert( e.message );
            location.reload();

        }

        return false;

    } );

    $( document ).on( 'submit', '.jtpopup_config_form', function () {

        try {

            var $form   = $( this );
            var data    = $form.serializeObject();

            if ( confirm( '설정을 저장하시겠습니까?' ) ) {

                $.post( ajaxurl, data, function ( res ) {

                    if ( res.success ) {

                        alert( '설정이 저장되었습니다' );

                    } else {

                        alert( res.data );

                    }

                } );

            }

        } catch ( e ) {

            alert( e.message );
            location.rleoad();

        }

        return false;

    } );

}



/**
 * Sortable List
 *
 * @author STUDIO-JT (201)
 */
function sortable_handle() {

    $( '.jt_popup_item_wrap' ).sortable( {
        items       : '.jt_popup_item:not(.add_button)',
        connectWith : '.jt_popup_item_wrap',
        update      : function ( event, ui ) {

                        try {

                            var $wrap           = $( this ).closest( '.jt_popup_list_box' );
                            var data            = $( '.jtpopup_sort_form' ).serializeObject();
                            var tmp_title       = '게시 중지';

                            data.type           = 'close';
                            data.jtpopup_ids    = [];

                            if ( $wrap.hasClass( 'jt_popup_coming_box' ) ) {

                                data.type = 'pending';

                            } else if ( $wrap.hasClass( 'jt_popup_publish_box' ) ) {

                                data.type = 'publish';

                            }

                            $wrap.find( 'h2 span.list_count' ).text( $wrap.find( '.jt_popup_item:not(.add_button)' ).length );

                            if ( $( this ).find( '.jt_popup_item[data-jtpopup-id]' ).length > 0 ) {

                                $( this ).find( '.jt_popup_item[data-jtpopup-id]' ).each( function () {

                                    data.jtpopup_ids.push( $( this ).data( 'jtpopup-id' ) );

                                } );

                                $.post( ajaxurl, data, function ( res ) {

                                    if ( res.success ) {

                                        $( res.data ).each( function ( idx, item ) {

                                            var $target = $( '.jt_popup_item[data-jtpopup-id="' + item.id + '"]' );

                                            if ( item.always_flag == 'Y' ) {

                                                $( '.post_date', $target ).text( '항상 노출' );

                                            } else {

                                                var str_date = '';

                                                if ( item.start_date ) {

                                                    str_date += item.start_date;

                                                }

                                                if ( item.end_date ) {

                                                    str_date += ' ~ ' + item.end_date;

                                                }

                                                $( '.post_date', $target ).text( str_date );

                                            }

                                            if ( data.type == 'close' ) {

                                                if ( ! $target.hasClass( 'term_end_item' ) ) {

                                                    $target.addClass( 'term_end_item' );

                                                }

                                                if ( ( ( new Date() ) > ( new Date( item.end_date ) ) ) && ( $( '.term_end_sticker', $target ).length == 0 ) ) {

                                                    $( '.jt_popup_item_fig', $target ).append( $( '<p />', { class: 'term_end_sticker', html: $( '<span />', { text: '기간종료' } ) } ) );

                                                }

                                            } else if ( $target.hasClass( 'term_end_item' ) ) {

                                                $target.removeClass( 'term_end_item' );
                                                $( '.term_end_sticker', $target ).remove();

                                            }

                                        } );

                                    } else if ( res.data ) {

                                        alert( res.data );
                                        location.reload();

                                    }

                                } );

                            }

                        } catch ( e ) {

                            alert( e.message );
                            location.reload();

                        }

                    }
    } );

}


function page_exposure_list_init() {
    if ( $( '.page_exposure_select' ).each( function () {
        if ( ! $( this ).data( 'select2' ) ) {
            $( this ).val( '' ).select2( {
                dropdownParent: $( '.page_exposure_container' ),
                multiple: 1,
                maximumSelectionSize: 1,
                ajax: {
                    url: '/wp-admin/admin-ajax.php',
                    dataType: 'json',
                    delay: 250,
                    cache: true,
                    data: function ( params ) {
                        var query = {
                            search: params.term,
                            page: params.page || 1,
                            action: 'jtpopup_get_post_list',
                        };
                        return query;
                    },
                },
            } );
        }
    } ) );
}

function page_exposure_list_action() {
    $( document ).on( 'select2:select', '.page_exposure_select', function ( e ) {

        var $this = $( this );

        if ( $this.val() ) {

            var post_id     = String( $this.val() );
            var $option     = $this.find( 'option:selected' );
            var $template   = $( $( '#jtPostSelected' ).html() );

            $( '[name="jtpopup[post_ids][]"]', $template ).val( post_id );
            $( 'span', $template ).text( $option.text() );

            $option.prop( 'disabled', true );

            $template.appendTo( '.page_exposure' );

        }

        $( this ).val( [] ).trigger( 'change' );

        page_exposure_list_init();

    } );

    $( document ).on( 'click', '.page_exposure_delete', function () {

        var $this = $( this );

        $this.closest( 'li' ).fadeOut( 'fast', function () {

            var post_id = $( 'input[name="jtpopup[post_ids][]"]', $( this ) ).val();

            $( '.page_exposure_select' ).find( 'option[value=' + post_id + ']' ).prop( 'disabled', false );
            page_exposure_list_init();

            $( this ).remove();

        } );

        return false;

    } );

}



/* ********************************************* *
 * HELPERS
 * ********************************************* */
// SIMPLE MOBILE CHECK
function is_mobile() {

    return ( /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i ).test( navigator.userAgent || navigator.vendor || window.opera );

}



// JT POPUP PREVIEW
function jtpopup_show() {

    var $container      = $( '#jt_popup_container' );
    var $popup_group    = $( '#jt_popup_playground', $container );
    var $overlay        = $( '#jt_popup_overlay', $container );
    var is_mobile       = $container.hasClass( 'mobile' );

    $( '#jt_popup_overlay, .jt_popup_item', $container ).css( 'z-index', 99999 );

    if ( is_mobile ) { // START DEVICE MOBILE POPUP

        $overlay.fadeIn( 'fast' );
        $( '#jt_popup_mobile_close_all' ).fadeIn( 'fast' );

        $popup_group.css( {
            opacity     : 1,
            visibility  : 'visible'
        } );

    }

    $( '.jt_popup_item', $container ).each( function () {

        var $this = $( this );

        $this.imagesLoaded( function () {

			$this.css( {
					'position'    : 'fixed',
			} );

			// CENTER POPUP
			if ( ! parseInt( $this.css( 'left' ).replace( 'px', '' ) ) &&
				! parseInt( $this.css( 'top' ).replace( 'px', '' ) ) ) {

				$this.css( {
					'margin-top'  : - ( $this.height() / 2 ) + 'px',
					'margin-left' : - ( $this.width() / 2 ) + 'px',
					'top'         : '50%',
					'left'        : '50%'
				} );

			}

            // SHOW POPUP
            if ( ! $overlay.is( ':visible' ) ) {

                $overlay.fadeIn( 'fast' );

            }

            $this.fadeIn( 'fast' );

            if ( ! is_mobile ) {

                // POPUP DRAG - jQuery UI
                $this.draggable( {
                    stop    : function ( event, ui ) {

                                if ( ui.position ) {

                                    console.log( ui.position );

                                }

                            }
                } );

            }

        } );

    } );

    // CLOSE ALL POPUP
    $( '#jt_popup_overlay, .jt_popup_notoday, .jt_popup_close, #jt_popup_mobile_close_all', $container ).on ( 'click', function () {

        $container.fadeOut( 'fast', function () { $( this ).remove(); } );
        return false;

    } );



}



} );



// jQuery DatePicker Default Setting ( KOR )
jQuery.datepicker.setDefaults( {
    dateFormat          : 'yy-mm-dd',
    prevText            : '이전 달',
    nextText            : '다음 달',
    monthNames          : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
    monthNamesShort     : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
    dayNames            : [ '일', '월', '화', '수', '목', '금', '토' ],
    dayNamesShort       : [ '일', '월', '화', '수', '목', '금', '토' ],
    dayNamesMin         : [ '일', '월', '화', '수', '목', '금', '토' ],
    showMonthAfterYear  : true,
    yearSuffix          : '년'
} );
