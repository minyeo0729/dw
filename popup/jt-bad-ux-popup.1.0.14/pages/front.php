<?php defined( 'ABSPATH' ) or die( 'Nothing to see here.' ); // Security (disable direct access) ?>

<?php foreach ( $popup_list as $idx => $row ) : ?>

    <?php if (
        ( empty( $row->postid ) && ( is_front_page() || is_home() ) )
        || ( ! empty( $row->postid ) && in_array( get_the_ID(), explode( ',', $row->postid ) ) )
    ) : ?>

        <?php
            $arr_image = wp_get_attachment_image_src( $row->pcimg, 'full');
            $img_src   = ( isset( $arr_image[ 0 ] ) ? $arr_image[ 0 ] : '' );

            if ( empty( $img_src) ) { continue; }
            if ( isset( $_COOKIE[ 'popup' . $row->rowid ] ) && $_COOKIE[ 'popup' . $row->rowid ] == 'today_none' ) { continue; }

            $popup_cnt++;

            $popup_style  = ( get_option( 'JTPOP_popup_style' ) == 'type2' ? 'style2' : 'style1' );       // popup style
            $popup_shadow = ( get_option( 'JTPOP_popup_shadow' ) == 'noshadow' ? 'noshadow' : 'shadow' ); // popup shadow check

            //popup shadw option
            if ( $popup_shadow == 'shadow' ) {

                $shadow_detail = $row->detail;
                $shadow_detail = explode( '$$', str_replace( 'undefined', '', $shadow_detail ) );

                $shadow_x      = ( $shadow_detail[ 0 ] == '' ? '10px ' : $shadow_detail[0] . 'px ' );
                $shadow_y      = ( $shadow_detail[ 1 ] == '' ? '10px ' : $shadow_detail[1] . 'px ' );
                $shadow_blur   = ( $shadow_detail[ 2 ] == '' ? '50px ' : $shadow_detail[2] . 'px ' );
                $shadow_color  = ( $shadow_detail[ 3 ] == '' ? '#1a1a1a' : '#' . $shadow_detail[ 3 ] );

            }

            $article_style = '';
            $article_style .= ( intVal( $row->popuptop ) > 0 && wp_is_mobile() == false ? 'top:' . intVal( $row->popuptop ) . 'px;' : '' );
            $article_style .= ( intVal( $row->popupleft ) > 0 && wp_is_mobile() == false ? 'left:' . intVal( $row->popupleft ) . 'px;' : '' );
            $article_style .= 'z-index:9999' . ( count( $popup_list ) - intVal( $row->zindex ) ) . ';';

            $img_style = '';
            $img_style .= ( intVal( $row->popupwidth ) > 0 && ! wp_is_mobile() ? 'max-width:' . $row->popupwidth . 'px;' : '' );
            $img_style .= ( $popup_shadow == 'shadow' ? 'box-shadow:' . $shadow_x . $shadow_y . $shadow_blur . $shadow_color . ';' : '' );

            $notoday_close_color = ( ( $row->closecolor == 'jtpop_black' && $popup_style == 'style1' ) || ( empty( $row->closecolor ) && $popup_style == 'style1' ) ? 'close_today_black' : 'close_today_white' );

            $str_target = '';
            $str_target = ( $row->target == 'blank' ? 'target="_blank" title="new window"' : $str_target );
            $str_target = ( wp_is_mobile() && $row->target == 'blank' ? 'data-target="blank"' : $str_target );

            $str_img_radius    = ( intVal( $row->radius ) > 0 ? 'img_radius_' . intVal( $row->radius ) : '' );
            $str_footer_radius = ( intVal( $row->radius ) > 0 ? 'footer_radius_' . intVal( $row->radius ) : '' );
            $str_footer_style  = ( $popup_style == 'style2' && $row->closebg != null ? 'background:#' . $row->closebg . ';' : '' );

            $str_notoday_style = ( $popup_style == 'style1' && ! empty( $row->closetodaycolor ) ? 'color:#' . $row->closetodatcolor . ';' : '' );
            $str_notoday_style = ( $popup_style == 'style2' && ! empty( $row->closecolor2 ) ? 'color:#' . $row->closecolor2 . ';' : $str_notoday_style );

            $close_color = ( $row->closecolor == 'jtpop_black' && $popup_style == 'style1' || empty( $row->closecolor ) && $popup_style == 'style1' ? 'close_black' : '' );
            $close_color = ( $row->closecolor == 'jtpop_white' && $popup_style == 'style1' ? 'close_white' : $close_color );
            $close_color = ( $popup_style == 'style2' ? 'close_white' : $close_color );

            $str_popclose_style = ( $popup_style == 'style1' && ! empty( $row->singleclosecolor ) ? 'color:#'. $row->singleclosecolor .';' : '' );
            $str_popclose_style = ( $popup_style == 'style2' && ! empty( $row->closecolor2 ) ? 'color:#'. $row->closecolor2 .';' : $str_popclose_style );
        ?>

        <article id="popup<?php echo $row->rowid; ?>" class="jtpop-bgs <?php echo ( $row->mobile == 0 ? 'mobile_hidden_check' : '' ); ?>" style="<?php echo $article_style; ?>">
            <div class="jtpop_bg_page <?php echo ( $popup_style . ' ' . $popup_shadow ); ?>">
                <div class="jt-popup">
                    <div>
                        <?php if ( $row->imglink != '' && $row->imglink != 'http://' ) : ?>

                            <?php if ( wp_is_mobile() == false ) : ?>

                                <a href="<?php echo $row->imglink; ?>" <?php echo $str_target; ?>>
                                    <img src="<?php echo $img_src; ?>" alt="notice popup img" class="<?php echo $str_img_radius; ?>" style="<?php echo $img_style; ?>" />
                                </a>

                            <?php else : ?>

                                <p data-link="<?php echo $row->imglink; ?>" <?php echo $str_target; ?>>
                                    <img src="<?php echo $img_src; ?>" alt="notice popup img" class="<?php echo $str_img_radius; ?>" style="<?php echo $img_style; ?>" />
                                </p>

                            <?php endif; ?>

                        <?php else : ?>

                            <img src="<?php echo $img_src; ?>" alt="notice popup img" class="<?php echo $str_img_radius; ?>" style="<?php echo $img_style; ?>" />

                        <?php endif; ?>
                    </div>
                </div>

                <div class="popup_footer <?php echo $str_footer_radius; ?>" style="<?php echo $str_footer_style; ?>">
                    <div class="notoday"><p class="<?php echo $notoday_close_color; ?>" style="<?php echo $str_notoday_style; ?>"><i class="fa fa-check-square-o"></i> <?php _e( '오늘 하루 보지 않음', 'jt-bad-ux-popup' ); ?></div>
                </div>
                <div class="popclose"><p class="<?php echo $close_color; ?>" style="<?php echo $str_popclose_style; ?>"><i class="fa fa-times"></i></p></div>
            </div>
        </article>

    <?php endif; ?>

<?php endforeach; ?>

<?php // if ( wp_is_mobile() || 1 ) : $mobile_close = ( ! empty( get_option( 'JTPOP_popup_mobile_close' ) ) ? 'color:#' . get_option( 'JTPOP_popup_mobile_close' ) . ';' : '' ); ?>
<script>console.log(1);</script>
    <div class="popup_navigation">
        <span class="popup_nav_left"><i class="fa fa-chevron-left fa-3x"></i></span>
        <span class="popup_nav_right"><i class="fa fa-chevron-right fa-3x"></i></span>
    </div>

    <div class="popup_bullet">
        <?php for ( $i = 0; $i < $popup_cnt; $i++ ) : $view_bullet = ( $i == 0 ? 'view' : '' ); ?>

            <span class="popbullet <?php echo $view_bullet; ?>"></span>

        <?php endfor; ?>
    </div>

    <div class="mobile_close" style="<?php echo $mobile_close; ?>"><i class="fa fa-times"></i></div>

<?php // endif; ?>