<?php defined( 'ABSPATH' ) or die( 'Nothing to see here.' ); // Security (disable direct access).

    $overlay    = array(
        'background:' . $this->is_set( $config[ 'overlay' ][ 'color' ], '#000000' ),
        'opacity:' . ( $this->is_set( $config[ 'overlay' ][ 'opacity' ], 50 ) / 100 )
    );
?>

<style>
    #jt_popup_container .slick-dots > li { background: <?php echo $this->is_set( $config[ 'mobile' ][ 'default' ], '#ddd' ); ?> !important; }
    #jt_popup_container .slick-dots > li.slick-active { background: <?php echo $this->is_set( $config[ 'mobile' ][ 'active' ], '#fff' ); ?> !important; }
    #jt_popup_mobile_close_all { color: <?php echo $this->is_set( $config[ 'mobile' ][ 'close' ], '#fff' ); ?> !important; }
</style>

<!-- 팝업 시작 -->
<div id="jt_popup_container" class="mobile">

    <div id="jt_popup_overlay" style="<?php echo implode( ';', $overlay ); ?>"></div>

    <a href="#" id="jt_popup_mobile_close_all"><span><?php _e( '모든 팝업 닫기', 'jt-bad-ux-popup' ); ?></span></a>

    <div id="jt_popup_playground" class="jt_popup_playground">
        <?php foreach ( $list as $popup ) : ?>

            <?php
                $popup_id   = $this->is_set( $popup[ 'id' ] );
                $color      = $this->is_set( $popup[ 'options' ][ 'color' ], '#ffffff' );
                $background = $this->is_set( $popup[ 'options' ][ 'background' ], '#000000' );
                $image_src  = $this->get_image_src( $popup[ 'image' ], 'full' );
                $letina_src = $this->get_image_src( $popup[ 'letina' ], 'full' );
                $target     = ( $this->is_set( $popup[ 'target' ], 'Y' ) == 'Y' ? 'target="_blank" rel="noopener noreferrer"' : '' );
            ?>

            <article id="jt_popup_<?php echo $popup_id; ?>" class="jt_popup_item">
                <div class="jt_popup_item_content">
                    <?php if ( $this->is_set( $popup[ 'url' ] ) ) : ?>

                        <a href="<?php echo $this->is_set( $popup[ 'url' ] ); ?>" <?php echo $target; ?>>
                            <?php if ( $this->is_set( $popup[ 'letina' ] ) > 0 ) : ?>

                                <img srcset="<?php echo $letina_src; ?> 2x" src="<?php echo $image_src; ?>" alt="BAD UX POPUP <?php echo $popup_id; ?>" />

                            <?php else : ?>

                                <img src="<?php echo $image_src; ?>" alt="BAD UX POPUP <?php echo $popup_id; ?>" />

                            <?php endif; ?>
                        </a>

                    <?php else : ?>

                        <?php if ( $this->is_set( $popup[ 'letina' ] ) > 0 ) : ?>

                            <img srcset="<?php echo $letina_src; ?> 2x" src="<?php echo $image_src; ?>" alt="BAD UX POPUP <?php echo $popup_id; ?>" />

                        <?php else : ?>

                            <img src="<?php echo $image_src; ?>" alt="BAD UX POPUP <?php echo $popup_id; ?>" />

                        <?php endif; ?>

                    <?php endif; ?>
                </div><!-- .jt_popup_item_content -->

                <div class="jt_popup_controller" style="background:<?php echo $background; ?>;">
                    <a class="jt_popup_notoday" href="#" style="color:<?php echo $color; ?>;"><?php _e( '오늘 하루 보지 않음', 'jt-bad-ux-popup' ); ?></a>
                </div><!-- .jt_popup_controller -->

                <a class="jt_popup_close" href="#"><i style="color:<?php echo $color; ?>;"><?php _e( '닫기', 'jt-bad-ux-popup' ); ?></i></a>
            </article><!-- .jt_popup_item -->

        <?php endforeach; ?>
    </div><!-- .jt_popup_playground -->

</div><!-- #jt_popup_container -->
<!-- 팝업 종료 -->