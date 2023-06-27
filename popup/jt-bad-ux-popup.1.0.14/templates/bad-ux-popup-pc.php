<?php defined( 'ABSPATH' ) or die( 'Nothing to see here.' ); // Security (disable direct access).

    $popup_type = ( $this->is_set( $config[ 'style' ], 'type1' ) == 'type1' ? 'primary' : 'secondary' );
    $overlay    = array(
        'background:' . $this->is_set( $config[ 'overlay' ][ 'color' ], '#000000' ),
        'opacity:' . ( $this->is_set( $config[ 'overlay' ][ 'opacity' ], 50 ) / 100 )
    );
?>

<!-- 팝업 시작 -->
<div id="jt_popup_container" class="pc">
    <div id="jt_popup_overlay" style="<?php echo implode( ';', $overlay ); ?>"></div>
    <?php /*
	<div id="jt_popup_pc_cursor"><span>CLOSE</span></div>
	*/?>

    <div id="jt_popup_playground" class="jt_popup_playground">
        <?php foreach ( $list as $popup ) : ?>

            <?php
                $popup_id   = $this->is_set( $popup[ 'id' ] );
                $style      = array(
                    'top:' . $this->is_set( $popup[ 'options' ][ 'top' ], 0 ) . 'px',
                    'left:' . $this->is_set( $popup[ 'options' ][ 'left' ], 0 ) . 'px',
                );
                $color      = $this->is_set( $popup[ 'options' ][ 'color' ], '#ffffff' );
                $background = ( $popup_type == 'primary' ? $this->is_set( $popup[ 'options' ][ 'background' ], '#000000' ) : 'none' );
                $image_src  = $this->get_image_src( $popup[ 'image' ], 'full' );
                $target     = ( $this->is_set( $popup[ 'target' ], 'Y' ) == 'Y' ? 'target="_blank" rel="noopener noreferrer"' : '' );


                if ( $this->is_set( $config[ 'shadow' ][ 'use' ], 'Y' ) == 'Y' ) {

                    $shadow = array(
                        $this->is_set( $config[ 'shadow' ][ 'x' ], 10 ) . 'px',
                        $this->is_set( $config[ 'shadow' ][ 'y' ], 10 ) . 'px',
                        $this->is_set( $config[ 'shadow' ][ 'size' ], 50 ) . 'px',
                        $this->is_set( $config[ 'shadow' ][ 'color' ], '#000000' ),
                    );

                    $style[] = 'box-shadow:' . implode( ' ', $shadow );

                } else {

                    $style[] = 'box-shadow:none';

                }
            ?>

            <article id="jt_popup_<?php echo $popup_id; ?>" class="jt_popup_item <?php echo $popup_type; ?>" style="<?php echo implode( ';', $style ); ?>">
                <div class="jt_popup_item_content">
                    <?php if ( $this->is_set( $popup[ 'url' ] ) ) : ?>

                        <a href="<?php echo $this->is_set( $popup[ 'url' ] ); ?>" <?php echo $target; ?>>
                            <img src="<?php echo $image_src; ?>" alt="BAD UX POPUP <?php echo $popup_id; ?>" />
                        </a>

                    <?php else : ?>

                        <img src="<?php echo $image_src; ?>" alt="BAD UX POPUP <?php echo $popup_id; ?>" />

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