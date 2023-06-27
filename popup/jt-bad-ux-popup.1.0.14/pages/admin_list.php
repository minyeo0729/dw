<?php defined( 'ABSPATH' ) or die( 'Nothing to see here.' ); // Security (disable direct access) ?>

<div  id="jt_popup" class="jt_popup_list wrap">
    <div class="jt_popup_head">
        <a href="<?php echo admin_url( 'admin.php?page=bad-ux-popup-config' ); ?>" class="jtpopup_head_btn"><span>팝업 공통 설정</span></a>
        <div class="jt_popup_head_inner">
			<h1 class="jt_popup_title" lang="en"><span>JT</span> BAD UX POPUP <b>공통 설정</b></h1>
		</div>
    </div><!-- .jt_popup_head -->
    <div class="jt_popup_contents">
        <div class="jt_popup_list_box jt_popup_publish_box">
            <h2>
                <span>게시 중 (<span class="list_count"><?php printf( '%d', count( $publish_list ) ); ?></span>)</span>
            </h2>
            <div class="jt_popup_item_wrap">
                <div class="jt_popup_item add_button">
                    <div class="jt_popup_item_add">
                        <a href="<?php echo admin_url( 'admin-ajax.php?action=jtpop_admin_form' ); ?>"><span>팝업추가</span></a>
                    </div><!-- .jt_popup_item_add -->
                </div><!-- .jt_popup_item -->

                <?php if ( is_array( $publish_list ) && count( $publish_list ) > 0 ) : ?>

                    <?php foreach ( $publish_list as $item ) : ?>

                        <?php
                            $is_always  = ( $this->is_set( $item[ 'always_flag' ], 'Y' ) == 'Y' );
                            $start_date = ( $is_always || ! $this->is_set( $item[ 'start_date' ] ) ? '' : date( 'Y-m-d H:i', strtotime( $item[ 'start_date' ] ) ) );
                            $end_date   = ( $is_always || ! $this->is_set( $item[ 'end_date' ] ) ? '' : date( 'Y-m-d H:i', strtotime( $item[ 'end_date' ] ) ) );
                            $image      = $this->get_image_src( $item[ 'image' ], 'medium' );
                        ?>

                        <div class="jt_popup_item" data-jtpopup-id="<?php echo $item[ 'id' ]; ?>">
                            <div class="jt_popup_item_fig">
                                <figure class="jt_popup_item_img"><img src="<?php echo $image; ?>" alt=""></figure>
                                <div class="jt_popup_item_util">
                                    <div class="jt_popup_item_util_inner">
                                        <button type="button" class="btn_preview"><span>미리보기</span></button>
                                        <div class="jt_popup_item_util_down_btn">
                                            <button type="button" class="btn_modify"><span>수정</span></button>
                                            <button type="button" class="btn_delete"><span>삭제</span></button>
                                        </div><!-- .jt_popup_item_util_down_btn -->
                                    </div><!-- .jt_popup_item_util_inner -->
                                </div><!-- .jt_popup_item_util -->
                            </div><!-- .jt_popup_item_fig -->

                            <?php if ( $is_always ) : ?>

                                <span class="post_date">항상 노출</span>

                            <?php else : ?>

                                <span class="post_date">
                                    <span class="post_date_inner"><?php echo ( $start_date ?: '' ); ?></span>
                                    <span class="post_date_inner"><?php echo ( $end_date ? ' ~ ' . $end_date : '' ); ?></span>
                                </span>

                            <?php endif; ?>
                        </div><!-- .jt_popup_item -->

                    <?php endforeach; ?>

                <?php endif; ?>
            </div><!-- .jt_popup_item_wrap -->
        </div><!-- .jt_popup_list_box -->

        <div class="jt_popup_list_box jt_popup_coming_box">
            <h2>
                <span>게시 예정 (<span class="list_count"><?php printf( '%d', count( $pending_list ) ); ?></span>)</span>
                <span class="desc">게시중인 팝업을 가지고 오면 날짜와 기간이 자동으로 내일 날짜로 설정 됩니다.</span>
            </h2>
            <div class="jt_popup_item_wrap">

                <div class="jt_popup_item jt_popup_item_wrap">
                    <div class="jt_popup_item_add">
                        <a href="#jt_popup_register"><span>팝업추가</span></a>
                    </div><!-- .jt_popup_item_add -->
                </div><!-- .jt_popup_item -->

                <?php if ( is_array( $pending_list ) && count( $pending_list ) > 0 ) : ?>

                    <?php foreach ( $pending_list as $item ) : ?>

                        <?php
                            $is_always  = ( $this->is_set( $item[ 'always_flag' ], 'Y' ) == 'Y' );
                            $start_date = ( $is_always || ! $this->is_set( $item[ 'start_date' ] ) ? '' : date( 'Y-m-d H:i', strtotime( $item[ 'start_date' ] ) ) );
                            $end_date   = ( $is_always || ! $this->is_set( $item[ 'end_date' ] ) ? '' : date( 'Y-m-d H:i', strtotime( $item[ 'end_date' ] ) ) );
                            $image      = $this->get_image_src( $item[ 'image' ], 'medium' );
                        ?>

                        <div class="jt_popup_item" data-jtpopup-id="<?php echo $item[ 'id' ]; ?>">
                            <div class="jt_popup_item_fig">
                                <figure class="jt_popup_item_img"><img src="<?php echo $image; ?>" alt=""></figure>
                                <div class="jt_popup_item_util">
                                    <div class="jt_popup_item_util_inner">
                                        <button type="button" class="btn_preview"><span>미리보기</span></button>
                                        <div class="jt_popup_item_util_down_btn">
                                            <button type="button" class="btn_modify"><span>수정</span></button>
                                            <button type="button" class="btn_delete"><span>삭제</span></button>
                                        </div><!-- .jt_popup_item_util_down_btn -->
                                    </div><!-- .jt_popup_item_util_inner -->
                                </div><!-- .jt_popup_item_util -->
                            </div><!-- .jt_popup_item_fig -->

                            <?php if ( $is_always ) : ?>

                                <span class="post_date">항상 노출</span>

                            <?php else : ?>

                                <span class="post_date">
                                    <span class="post_date_inner"><?php echo ( $start_date ?: '' ); ?></span>
                                    <span class="post_date_inner"><?php echo ( $end_date ? ' ~ ' . $end_date : '' ); ?></span>
                                </span>

                            <?php endif; ?>
                        </div><!-- .jt_popup_item -->

                    <?php endforeach; ?>

                <?php endif; ?>
            </div><!-- .jt_popup_item_wrap -->
        </div><!-- .jt_popup_list_box -->

        <div class="jt_popup_list_box jt_popup_stop_box">
            <h2>
                <span>게시 중지 (<span class="list_count"><?php printf( '%d', count( $close_list ) ); ?></span>)</span>
                <span class="desc">기간이 종료되었거나, 팝업 노출이 활성화 되지 않은 팝업 리스트 입니다.</span>
            </h2>
            <div class="jt_popup_item_wrap">
                <?php if ( is_array( $close_list ) && count( $close_list ) > 0 ) : ?>

                    <?php foreach ( $close_list as $item ) : ?>

                        <?php
                            $is_always  = ( $this->is_set( $item[ 'always_flag' ], 'Y' ) == 'Y' );
                            $start_date = ( $is_always || ! $this->is_set( $item[ 'start_date' ] ) ? '' : date( 'Y-m-d H:i', strtotime( $item[ 'start_date' ] ) ) );
                            $end_date   = ( $is_always || ! $this->is_set( $item[ 'end_date' ] ) ? '' : date( 'Y-m-d H:i', strtotime( $item[ 'end_date' ] ) ) );
                            $image      = $this->get_image_src( $item[ 'image' ], 'medium' );
                            $is_end     = ( ! $is_always && $item[ 'end_date' ] < $this->now() );
                        ?>

                        <div class="jt_popup_item term_end_item" data-jtpopup-id="<?php echo $item[ 'id' ]; ?>">
                            <div class="jt_popup_item_fig">
                                <figure class="jt_popup_item_img"><img src="<?php echo $image; ?>" alt=""></figure>
                                <div class="jt_popup_item_util">
                                    <div class="jt_popup_item_util_inner">
                                        <button type="button" class="btn_preview"><span>미리보기</span></button>
                                        <div class="jt_popup_item_util_down_btn">
                                            <button type="button" class="btn_modify"><span>수정</span></button>
                                            <button type="button" class="btn_delete"><span>삭제</span></button>
                                        </div><!-- .jt_popup_item_util_down_btn -->
                                    </div><!-- .jt_popup_item_util_inner -->
                                </div><!-- .jt_popup_item_util -->

                                <?php if ( $is_end ) : ?>

                                    <p class="term_end_sticker"><span>기간종료</span></p>

                                <?php endif; ?>
                            </div><!-- .jt_popup_item_fig -->

                            <?php if ( $is_always ) : ?>

                                <span class="post_date">항상 노출</span>

                            <?php else : ?>

                                <span class="post_date">
                                    <span class="post_date_inner"><?php echo ( $start_date ?: '' ); ?></span>
                                    <span class="post_date_inner"><?php echo ( $end_date ? ' ~ ' . $end_date : '' ); ?></span>
                                </span>

                            <?php endif; ?>
                        </div><!-- .jt_popup_item -->

                    <?php endforeach; ?>

                <?php endif; ?>
            </div><!-- .jt_popup_item_wrap -->
        </div><!-- .jt_popup_list_box -->

        <div class="jt_popup_info">
            <p class="jt_popup_info_title">BAD UX POPUP INFO</p>
            <ul class="jt_popup_info_list">
                <li>팝업은 테마의 전면 페이지 혹은 설정한 포스트에만 나타납니다. </li>
                <li>Drag&amp;Drop 을 통해 팝업의 노출 순서를 수정할 수 있습니다. </li>
            </ul><!-- .jt_popup_info_list -->
        </div><!-- .jt_popup_info -->
    </div><!-- .jt_popup_contents -->
</div><!-- #jt_popup -->

<form class="jtpopup_remove_form">
    <?php echo $this->nonce( 'jtpopup_remove' ); ?>
    <input type="hidden" name="action" value="jtpopup_action" />
</form>

<form class="jtpopup_sort_form">
    <?php echo $this->nonce( 'jtpopup_sort' ); ?>
    <input type="hidden" name="action" value="jtpopup_action" />
</form>