<?php defined( 'ABSPATH' ) or die( 'Nothing to see here.' ); // Security (disable direct access) ?>

<div id="jt_popup" class="jt_popup_form wrap">
    <div class="jt_popup_head">
        <a href="<?php echo admin_url( 'admin.php?page=bad-ux-popup' ); ?>" class="jtpopup_head_btn btn_register"><span>팝업 리스트</span></a>
		<div class="jt_popup_head_inner">
			<h1 class="jt_popup_title" lang="en"><span>JT</span> BAD UX POPUP <b>공통 설정</b></h1>
		</div>
    </div><!-- .jt_popup_head -->
    <div class="jt_popup_contents">
        <form class="jtpopup_config_form">
            <?php echo $this->nonce( 'jtpopup_config_form' ); ?>
            <input type="hidden" name="action" value="jtpopup_action" />

            <div class="layout_wrap">
                <div class="layout_left">
                    <div class="jt_popup_list_box">
                        <h2><span>팝업 스타일</span></h2>
                        <div class="jt_popup_style_wrap">
                            <label class="jt_icheck_label">
                                <input type="radio" name="jtpopup[style]" class="jt_icheck" value="type1" <?php checked( $config[ 'style' ] != 'type2', true ); ?> />
                                <span><img src="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-style-01.png'; ?>" srcset="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-style-01-2x.png 2x'; ?>" alt="하단 우측에 닫기버튼이 있는 팝업"></span>
                            </label>
                            <label class="jt_icheck_label">
                                <input type="radio" name="jtpopup[style]" class="jt_icheck" value="type2" <?php checked( $config[ 'style' ], 'type2' ); ?> />
                                <span><img src="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-style-02.png'; ?>" srcset="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-style-02-2x.png 2x'; ?>" alt="상단 우측에 닫기버튼이 있는 팝업"></span>
                            </label>
                        </div><!-- .jt_popup_style -->
                    </div><!-- .jt_popup_list_box -->

                    <div class="jt_popup_list_box jt_popup_shadow_box">
                        <h2><span>팝업 그림자 조정</span></h2>
                        <div class="jt_popup_form_wrap">
                            <div class="jt_popup_form_item">
                                <h3>그림자 활성화</h3>
                                <div class="jt_popup_form_cont">
                                    <label class="switch_wrap">
                                        <input type="checkbox" name="jtpopup[shadow][use]" class="switch_input" value="Y" <?php checked( $config[ 'shadow' ][ 'use' ], 'Y' ); ?> />
                                        <div class="switch"></div>
                                    </label>
                                    <span class="switch_label_txt">그림자 활성화</span>
                                    <div class="jt_popup_shadow_ex">
                                        <img src="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-shadow-img.png'; ?>" srcset="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-shadow-img-2x.png 2x'; ?>" alt="">
                                        <div class="shadow_box">
                                            <span class="shadow_box_zoom"></span>
                                        </div>
                                    </div>
                                </div><!-- .jt_popup_form_cont -->
                            </div><!-- .jt_popup_form_item -->
                            <div class="jt_popup_form_item">
                                <h3>그림자 위치 조정</h3>
                                <div class="jt_popup_form_cont jt_popup_shadow_position">
                                    <div class="jt_popup_shadow_position_item">
                                        <p><i lang="en">1</i>X축<span>[ 기본값 10 ]</span></p>
                                        <label class="jt_label">
                                            <input type="number" name="jtpopup[shadow][x]" class="jt_form_field" placeholder="10" min="1" max="30" value="<?php printf( '%d', $config[ 'shadow' ][ 'x' ] ); ?>" />
                                            <b>px</b>
                                        </label>
                                    </div><!-- .jt_popup_shadow_position_item -->
                                    <div class="jt_popup_shadow_position_item">
                                        <p><i lang="en">2</i>Y축<span>[ 기본값 10 ]</span></p>
                                        <label class="jt_label">
                                            <input type="number" name="jtpopup[shadow][y]" class="jt_form_field" placeholder="10" min="1" max="30" value="<?php printf( '%d', $config[ 'shadow' ][ 'y' ] ); ?>" />
                                            <b>px</b>
                                        </label>
                                    </div><!-- .jt_popup_shadow_position_item -->
                                    <div class="jt_popup_shadow_position_item">
                                        <p><i lang="en">3</i>그림자 크기<span>[ 기본값 50 ]</span></p>
                                        <label class="jt_label">
                                            <input type="number" name="jtpopup[shadow][size]" class="jt_form_field" placeholder="50" min="1" max="50" value="<?php printf( '%d', $config[ 'shadow' ][ 'size' ] ); ?>" />
                                            <b>px</b>
                                        </label>
                                    </div><!-- .jt_popup_shadow_position_item -->
                                    <div class="jt_popup_shadow_position_item">
                                        <p><i lang="en">4</i>그림자 색상</p>
                                        <label class="jt_label">
                                            <input type="text" name="jtpopup[shadow][color]" class="jt_form_field colorpicker" value="<?php echo $config[ 'shadow' ][ 'color' ]; ?>" />
                                        </label>
                                    </div><!-- .jt_popup_shadow_position_item -->
                                </div><!-- .jt_popup_form_cont -->
                            </div><!-- .jt_popup_form_item -->
                        </div> <!-- .jt_popup_form_wrap -->
                    </div><!-- .jt_popup_list_box -->
                </div><!-- .layout_left -->

                <div class="jt_popup_list_box layout_right">
                    <h2><span>오버레이 영역 조정</span></h2>
                    <div class="jt_popup_form_item">
                        <h3>색상 선택</h3>
                        <p class="desc">팝업이 표시될때 백그라운드 오버레이 색상을 선택합니다.</p>
                        <label class="jt_label">
                            <input type="text" name="jtpopup[overlay][color]" class="jt_form_field colorpicker" value="<?php echo $config[ 'overlay' ][ 'color' ]; ?>" />
                        </label>
                    </div><!-- .jt_popup_form_item -->
                    <div class="jt_popup_form_item">
                        <h3>투명도 조정</h3>
                        <p class="desc"> 0 - 투명, 기본값 -50, 100 - 불투명 </p>
                        <div class="range_overlay_wrap">
                            <input type="hidden" name="jtpopup[overlay][opacity]" value="<?php printf( '%d', $config[ 'overlay' ][ 'opacity' ] ); ?>" />
                            <span class="range_minimum">0</span>
                            <div id="range_overlay" class="range_overlay">
                                <div id="range_overlay_handle" class="range_overlay_handle ui-slider-handle"></div>
                            </div>
                            <span class="range_maximum">100</span>
                        </div><!-- .range_overlay_wrap -->
                        <div class="jt_popup_overlay_ex">
                            <iframe src="/?jt-nopopup=Y" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
                            <div class="overlay_box" style="background:<?php echo $config[ 'overlay' ][ 'color' ]; ?>;"></div>
                            <span class="overlay_txt">오버레이 영역</span>
                            <div class="overlay_img"><img src="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-overlay-img.png'; ?>" srcset="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-overlay-img-2x.png 2x'; ?>" alt=""></div>
                        </div>
                    </div><!-- .jt_popup_form_item -->
                </div><!-- .jt_popup_list_box -->
            </div><!-- .layout_wrap -->

            <div class="jt_popup_list_box jt_popup_mobile_box">
                <h2><span>모바일 설정</span></h2>
                <div class="jt_popup_form_wrap">
                    <div class="jt_popup_form_item">
                        <h3>슬라이드 기본 페이지네이션 색상<button class="jt_popup_tooltip"><span class="sr_only">도움 설명</span></button></h3>
                        <div class="jt_popup_tooltip_cont"><img src="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-nav-tooltip-img.png'; ?>" srcset="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-nav-tooltip-img-2x.png 2x'; ?>" alt="페이지네이션 다중 팝업임을 나타내는 장치"></div>
                        <p class="desc">팝업이 2개 이상일때 표시되는 페이지네이션 색상입니다.</p>
                        <label class="jt_label">
                            <input type="text" name="jtpopup[mobile][default]" class="jt_form_field colorpicker" value="<?php echo $config[ 'mobile' ][ 'default' ]; ?>" />
                        </label>
                    </div><!-- .jt_popup_form_item -->
                    <div class="jt_popup_form_item">
                        <h3>슬라이드 활성화 페이지네이션 색상<button class="jt_popup_tooltip"><span class="sr_only">도움 설명</span></button></h3>
                        <div class="jt_popup_tooltip_cont"><img src="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-nav-tooltip-img.png'; ?>" srcset="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-nav-tooltip-img-2x.png 2x'; ?>" alt="페이지네이션 다중 팝업임을 나타내는 장치"></div>
                        <p class="desc">팝업이 2개 이상일때 활성화된 페이지네이션 색상입니다.</p>
                        <label class="jt_label">
                            <input type="text" name="jtpopup[mobile][active]" class="jt_form_field colorpicker" value="<?php echo $config[ 'mobile' ][ 'active' ]; ?>" />
                        </label>
                    </div><!-- .jt_popup_form_item -->
                    <div class="jt_popup_form_item">
                        <h3>[ X ] 닫기 버튼 색상</h3>
                        <p class="desc">팝업에서 닫기 버튼 색상입니다.</p>
                        <label class="jt_label">
                            <input type="text" name="jtpopup[mobile][close]" class="jt_form_field colorpicker" value="<?php echo $config[ 'mobile' ][ 'close' ]; ?>" />
                        </label>
                    </div><!-- .jt_popup_form_item -->
                </div><!-- .jt_popup_form_wrap -->
            </div><!-- .jt_popup_list_box -->
            <button type="button" class="jt_popup_btn_undo"><span>설정 초기화</span></button>
            <div class="jt_popup_btn_right">
                <button type="button" class="jt_popup_btn jt_popup_btn_delete"><span>취소하기</span></button>
                <button class="jt_popup_btn jt_popup_btn_save"><span>저장하기</span></button>
            </div>
        </form>
    </div><!-- .jt_popup_contents -->
</div><!-- #jt_popup -->
