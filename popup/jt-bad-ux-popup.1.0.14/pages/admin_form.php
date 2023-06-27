<?php defined( 'ABSPATH' ) or die( 'Nothing to see here.' ); // Security (disable direct access) ?>

<!-- 새 팝업 등록하기 -->
<div id="jt_popup_register" class="jt_popup_register mfp-hide">
    <form class="jt_popup_form" autocomplete="off">
        <?php echo $this->nonce( 'jtpopup_form' ); ?>
        <input type="hidden" name="action" value="jtpopup_action" />
        <input type="hidden" name="jtpopup[image]" value="<?php echo $this->is_set( $jtpopup[ 'image' ] ); ?>" />
        <input type="hidden" name="jtpopup[letina]" value="<?php echo $this->is_set( $jtpopup[ 'letina' ] ); ?>" />
        <input type="hidden" name="jtpopup[id]" value="<?php echo $this->is_set( $jtpopup[ 'id' ] ); ?>" />

        <div class="jt_popup_register_head">
            <?php if ( $this->is_set( $jtpopup[ 'id' ] ) ) : ?>

                <h2>팝업 수정하기</h2>

            <?php else : ?>

                <h2>새 팝업 등록하기</h2>

            <?php endif; ?>
            <button class="btn_close mfp-close" type="button"><span class="sr_only">닫기</span></button>
        </div><!-- .jt_popup_register_head -->
        <div class="jt_popup_register_content">
            <div class="jt_popup_register_img_wrap">
                <?php if ( $this->is_set( $jtpopup[ 'image' ] ) ) : ?>

                    <?php
                        $image_name = basename( $jtpopup[ 'image_src' ] );
                        $image_info = pathinfo( $jtpopup[ 'image_src' ] );
                        $image_name = ( mb_strlen( $image_name ) > 20 ? mb_substr( $image_info[ 'filename' ], 0, 15 ) . ' ... .' . $image_info[ 'extension' ] : $image_name );
                    ?>

                    <div class="jt_popup_register_item required">
                        <h3>기본 이미지 등록</h3>
                        <div class="jt_popup_register_fig">
                            <figure class="jt_popup_register_img"><img src="<?php echo $this->is_set( $jtpopup[ 'image_src' ] ); ?>" alt=""></figure>
                        </div><!-- .jt_popup_register_fig -->
                        <p class="desc"><?php echo $image_name; ?></p>
                        <button type="button" class="btn_img_delete"><span>삭제하기</span></button>
                    </div><!-- .jt_popup_register_item -->

                <?php else : ?>

                    <div class="jt_popup_register_item jt_popup_register_img_add required">
                        <h3>기본 이미지 등록</h3>
                        <p>가로/세로 3:4 비율 권장</p>
                        <div class="jt_popup_register_fig">
                            <button type="button" class="btn_img_add"><span>이미지 추가</span></button>
                        </div><!-- .jt_popup_register_fig -->
                    </div><!-- .jt_popup_register_item -->

                <?php endif; ?>

                <?php if ( $this->is_set( $jtpopup[ 'letina' ] ) ) : ?>

                    <?php
                        $letina_name = basename( $jtpopup[ 'letina_src' ] );
                        $letina_info = pathinfo( $jtpopup[ 'letina_src' ] );
                        $letina_name = ( mb_strlen( $letina_name ) > 20 ? mb_substr( $letina_info[ 'filename' ], 0, 15 ) . ' ... .' . $letina_info[ 'extension' ] : $letina_name );
                    ?>

                    <div class="jt_popup_register_item">
                        <h3>2배 <span>사이즈</span> 이미지 등록</h3>
                        <div class="jt_popup_register_fig">
                            <figure class="jt_popup_register_img"><img src="<?php echo $this->is_set( $jtpopup[ 'letina_src' ] ); ?>" alt=""></figure>
                            <p class="sticker_2x"><span>2x</span></p>
                        </div><!-- .jt_popup_register_fig -->
                        <p class="desc"><?php echo $letina_name; ?></p>
                        <button type="button" class="btn_img_delete"><span>삭제하기</span></button>
                    </div><!-- .jt_popup_register_item -->


                <?php else : ?>

                    <div class="jt_popup_register_item jt_popup_register_img_add">
                        <h3>2배 <span>사이즈</span> 이미지 등록</h3>
                        <p>선택사항 : Retina Display</p>
                        <div class="jt_popup_register_fig">
                            <button type="button" class="btn_img_add"><span>이미지 추가</span></button>
                        </div><!-- .jt_popup_register_fig -->
                    </div><!-- .jt_popup_register_item -->

                <?php endif; ?>
            </div><!-- .jt_popup_register_img_wrap -->

            <div class="jt_popup_register_setting">
                 <div class="jt_popup_register_item required">
                    <h3>팝업 노출 여부</h3>
                    <div class="jt_popup_register_item_cont">
                        <label class="switch_wrap">
                            <input type="checkbox" name="jtpopup[use_flag]" class="switch_input" value="Y" <?php checked( $this->is_set( $jtpopup[ 'use_flag' ], 'Y' ), 'Y' ); ?> />
                            <div class="switch"></div>
                        </label>
                        <span class="switch_label_txt">노출 활성화</span>
                    </div><!-- .jt_popup_register_item_cont -->
                </div><!-- .jt_popup_register_item -->

                <div class="jt_popup_register_item jt_popup_register_position required">
                    <h3>팝업 노출 위치</h3>
                    <div class="jt_popup_register_item_cont">
                        <label class="jt_icheck_label"><input type="radio" name="jtpopup[platform]" class="jt_icheck" value="A" <?php checked( $this->is_set( $jtpopup[ 'platform' ], 'A' ), 'A' ); ?> /><span>ALL</span></label>
                        <label class="jt_icheck_label"><input type="radio" name="jtpopup[platform]" class="jt_icheck" value="P" <?php checked( $this->is_set( $jtpopup[ 'platform' ], 'A' ), 'P' ); ?> /><span>PC</span></label>
                        <label class="jt_icheck_label"><input type="radio" name="jtpopup[platform]" class="jt_icheck" value="M" <?php checked( $this->is_set( $jtpopup[ 'platform' ], 'A' ), 'M' ); ?> /><span>MOBILE</span></label>
                        <!--
                        <label class="jt_icheck_label"><input type="checkbox" name="jtpopup[pc_flag]" class="jt_icheck" value="Y" <?php checked( $this->is_set( $jtpopup[ 'pc_flag' ], 'Y' ), 'Y' ); ?> /><span>PC</span></label>
                        <label class="jt_icheck_label"><input type="checkbox" name="jtpopup[mobile_flag]" class="jt_icheck" value="Y" <?php checked( $this->is_set( $jtpopup[ 'mobile_flag' ], 'Y' ), 'Y' ); ?> /><span>Mobile</span></label>
                        -->
                    </div><!-- .jt_popup_register_item_cont -->
                </div><!-- .jt_popup_register_item -->

                <div class="jt_popup_register_item required">
                    <h3>팝업 게시기간 설정</h3>
                    <div class="jt_popup_register_item_cont">
                        <label class="jt_icheck_label"><input type="checkbox" name="jtpopup[always_flag]" class="jt_icheck" value="Y" <?php checked( $this->is_set( $jtpopup[ 'always_flag' ], 'Y' ), 'Y' ); ?> /><span>항상 노출</span></label>
                        <fieldset class="field_calendar_wrap">
                            <label class="jt_label field_calendar <?php echo ( $jtpopup[ 'always_flag' ] == 'Y' ? 'disabled' : '' ); ?>">
                                <span class="sr_only">팝업 게시 시작 기간을 설정해주세요</span>
                                <input type="text" name="jtpopup[start_date]" class="jt_form_field datetime_picker" value="<?php echo $this->is_set( $jtpopup[ 'start_date' ] ); ?>" <?php echo ( $jtpopup[ 'always_flag' ] == 'Y' ? 'disabled' : '' ); ?> readonly />
                            </label>
                            <span>~</span>
                            <label class="jt_label field_calendar <?php echo ( $jtpopup[ 'always_flag' ] == 'Y' ? 'disabled' : '' ); ?>">
                                <span class="sr_only">팝업 게시 마감 기간을 설정해주세요</span>
                                <input type="text" name="jtpopup[end_date]" class="jt_form_field datetime_picker" value="<?php echo $this->is_set( $jtpopup[ 'end_date' ] ); ?>" <?php echo ( $jtpopup[ 'always_flag' ] == 'Y' ? 'disabled' : '' ); ?> readonly />
                            </label>
                        </fieldset>
                    </div><!-- .jt_popup_register_item_cont -->
                </div><!-- .jt_popup_register_item -->

                <div class="jt_popup_register_item jt_popup_register_link">
                    <h3>팝업 링크</h3>
                    <div class="jt_popup_register_item_cont">
                        <p class="desc">팝업을 클릭했을 때 이동되는 링크 페이지 URL 주소를 입력해 주세요.  Ex) http://www.studio-jt.co.kr</p>
                        <label class="jt_label jt_label_link">
                            <input type="text" name="jtpopup[url]" class="jt_form_field" placeholder="http://" value="<?php echo $this->is_set( $jtpopup[ 'url' ] ); ?>" />
                            <button type="button" class="url_clear" tabindex="-1"><span class="sr_only">취소</span></button>
                        </label>
                        <label class="jt_icheck_label"><input type="checkbox" name="jtpopup[target]" class="jt_icheck" value="Y" <?php checked( $this->is_set( $jtpopup[ 'target' ], 'Y' ), 'Y' ); ?> /><span>새창으로 링크 열기</span></label>
                    </div><!-- .jt_popup_register_item_cont -->
                </div><!-- .jt_popup_register_item -->

                <div class="jt_popup_register_item jt_popup_register_page_exposure">
                    <h3>팝업을 특정페이지에 노출</h3>
                    <div class="jt_popup_register_item_cont">
                        <p class="desc">현재 팝업을 노출 시킬 페이지를 검색하여 적용합니다.</p>
                        <div class="page_exposure_container">
                            <label class="jt_label">
                                <select class="jt_form_field page_exposure_select">
                                </select>
                            </label>
                        </div>
                        <ul class="page_exposure">
                            <?php if ( $this->is_set( $jtpopup[ 'post_ids' ] ) ) : ?>

                                <?php foreach ( $jtpopup[ 'post_ids' ] as $post_id ) : ?>

                                    <li>
                                        <input type="hidden" name="jtpopup[post_ids][]" value="<?php echo $post_id; ?>" />
                                        <span><?php echo get_the_title( $post_id ); ?></span>
                                        <button type="button" class="page_exposure_delete"></button>
                                    </li>

                                <?php endforeach; ?>

                            <?php endif; ?>
                        </ul>
                    </div><!-- .jt_popup_register_item_cont -->
                </div><!-- .jt_popup_register_item -->

                <div class="jt_popup_register_item">
                    <div class="jt_accordion">
                        <div class="jt_accordion_item">
                            <button class="jt_accordion_title">
                                <h3>고급설정</h3>
                                <span class="control"><i class="sr_only">펼치기/접기</i></span>
                            </button><!-- .jt_accordion_title -->
                            <div class="jt_accordion_content_wrap">
                                <div class="jt_accordion_content">
                                    <div class="advance_item">
                                        <h4>팝업 위치 조정</h4>
                                        <div class="advance_item_cont">
                                            <p class="desc">팝업이 하나일때, 여백값을 입력하지 않으면 화면 중앙에 위치합니다.</p>
                                            <div class="white_space_setting">
                                                <label class="jt_label">
                                                    <span>상단 여백</span>
                                                    <input type="number" name="jtpopup[options][top]" class="jt_form_field" placeholder="0" value="<?php printf( '%d', $this->is_set( $jtpopup[ 'options' ][ 'top' ] ) ); ?>" />
                                                    <b>px</b>
                                                </label>
                                                <label class="jt_label">
                                                    <span>좌측 여백</span>
                                                    <input type="number" name="jtpopup[options][left]" class="jt_form_field" placeholder="0" value="<?php printf( '%d', $this->is_set( $jtpopup[ 'options' ][ 'left' ] ) ); ?>" />
                                                    <b>px</b>
                                                </label>
                                            </div><!-- white_space_setting -->
                                            <figure class="popup_white_space_example"><img src="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-white-space-example.jpg'; ?>" srcset="<?php echo JTP_BAD_UX_POPUP_URL . '/img/popup-white-space-example-2x.jpg 2x'; ?>" alt=""></figure>
                                        </div><!-- .advance_item_cont -->
                                    </div><!-- .advance_item -->

                                    <div class="advance_item_wrap">
                                        <div class="advance_item">
                                            <h4>글자 색상 변경</h4>
                                            <div class="advance_item_cont">
                                                <p class="desc"><span>오늘하루보지않음, X 닫기</span> 글자 색상 변경</p>
                                                <label class="jt_label">
                                                    <input type="text" name="jtpopup[options][color]" class="jt_form_field colorpicker" value="<?php echo $this->is_set( $jtpopup[ 'options' ][ 'color' ] ); ?>" />
                                                </label>
                                            </div><!-- .advance_item_cont -->
                                        </div><!-- .advance_item -->
                                        <div class="advance_item">
                                            <h4>글자 배경 색상</h4>
                                            <div class="advance_item_cont">
                                                <p class="desc"><span>오늘하루보지않음, X 닫기</span> 글자 배경 색상 변경</p>
                                                <label class="jt_label">
                                                    <input type="text" name="jtpopup[options][background]" class="jt_form_field colorpicker" value="<?php echo $this->is_set( $jtpopup[ 'options' ][ 'background' ] ); ?>" />
                                                </label>
                                            </div><!-- .advance_item_cont -->
                                        </div><!-- .advance_item -->
                                    </div><!-- .advance_item -->
                                </div><!-- .jt_accordion_content -->
                            </div><!-- .jt_accordion_content_wrap -->
                        </div><!-- .jt_accordion_item -->
                    </div><!-- .jt_accordion -->
                </div><!-- .jt_popup_register_item -->

            </div><!-- .jt_popup_register_setting -->

            <button class="jt_popup_btn jt_popup_btn_save"><span>저장하기</span></button>
        </div><!-- .jt_popup_register_content -->
    </form>
</div>
<!-- //새 팝업 등록하기 -->

<script type="text/html" class="template" id="jtBeforeImageAdd">
<div class="jt_popup_register_item jt_popup_register_img_add">
    <h3>기본 이미지 등록</h3>
    <div class="jt_popup_register_fig">
        <button type="button" class="btn_img_add"><span>이미지 추가</span></button>
    </div><!-- .jt_popup_register_fig -->
</div>
</script>

<script type="text/html" class="template" id="jtAfterImageAdd">
<div class="jt_popup_register_item">
    <h3>기본 이미지 등록</h3>
    <div class="jt_popup_register_fig">
        <figure class="jt_popup_register_img">
            <img src="" />
        </figure>
    </div><!-- .jt_popup_register_fig -->
    <p class="desc"></p>
    <button type="button" class="btn_img_delete"><span>삭제하기</span></button>
</div>
</script>

<script type="text/html" class="template" id="jtBeforeLetinaAdd">
<div class="jt_popup_register_item jt_popup_register_img_add">
    <h3>2배 <span>사이즈</span> 이미지 등록</h3>
    <div class="jt_popup_register_fig">
        <button type="button" class="btn_img_add"><span>이미지 추가</span></button>
    </div><!-- .jt_popup_register_fig -->
</div>
</script>

<script type="text/html" class="template" id="jtAfterLetinaAdd">
<div class="jt_popup_register_item">
    <h3>2배 <span>사이즈</span> 이미지 등록</h3>
    <div class="jt_popup_register_fig">
        <figure class="jt_popup_register_img">
            <img src="" />
        </figure>
        <p class="sticker_2x"><span>2x</span></p>
    </div><!-- .jt_popup_register_fig -->
    <p class="desc"></p>
    <button type="button" class="btn_img_delete"><span>삭제하기</span></button>
</div>
</script>

<script type="text/html" class="template" id="jtPostSelected">
<li>
    <input type="hidden" name="jtpopup[post_ids][]" value="" />
    <span></span>
    <button type="button" class="page_exposure_delete"></button>
</li>
</script>
