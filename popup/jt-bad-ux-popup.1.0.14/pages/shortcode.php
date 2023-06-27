<?php defined( 'ABSPATH' ) or die( 'Nothing to see here.' ); // Security (disable direct access)

/*
    Template For JT BAD UX POPUP Short Code
    ex) [jt_bad_ux_popup num="8"]
*/
?>

<?php if ( ! empty( $popup_list ) ) : ?>

    <div class="jt_isotope_list jt_isotope">

        <div class="isotope_grid_sizer"></div>
        <div class="isotope_gutter_sizer"></div>

        <?php foreach ( $popup_list as $idx => $row ) : ?>

            <div class="jt_isotope_list_item isotope_item">
                <?php if ( $row->imglink != '' && $row->imglink != 'http://' ) : ?>

                    <a class="jt_isotope_list_link" href="<?php echo $row->imglink; ?>" <?php echo ( $row->target == 'blank' ? 'target="_blank"' : '' ); ?>>
                        <figure class="jt_isotope_list_thumb">
                            <img src="<?php echo $row->img_src; ?>" alt="jt_bad_ux_popup_<?php echo $row->rowid; ?>" />
                        </figure><!-- .jt_isotope_list_thumb -->
                    </a><!-- .jt_isotope_list_link -->

                <?php else : ?>

                    <span class="jt_isotope_list_link">
                        <figure class="jt_isotope_list_thumb">
                            <img src="<?php echo $row->img_src; ?>" alt="jt_bad_ux_popup_<?php echo $row->rowid; ?>" />
                        </figure><!-- .jt_isotope_list_thumb -->
                    </span>

                <?php endif; ?>
            </div>

        <?php endforeach; ?>

    </div><!-- .jt_isotope_list -->

<?php endif; ?>