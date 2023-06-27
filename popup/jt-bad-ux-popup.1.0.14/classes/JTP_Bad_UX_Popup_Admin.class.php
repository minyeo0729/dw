<?php defined( 'ABSPATH' ) or die( 'Nothing to see here.' ); // Security (disable direct access).

if ( ! class_exists( 'JTP_Bad_UX_Popup_Admin' ) ) {
    class JTP_Bad_UX_Popup_Admin extends JTP_Bad_UX_Popup_Basic {
        public static function init() {
            return new self();
        }

        public static function active() {
            global $wpdb;

            $table = $wpdb->prefix . JTP_BAD_UX_POPUP_TABLE;
            $char = $wpdb->get_charset_collate();
            $sql = "    CREATE TABLE IF NOT EXISTS `{$table}` (
                            `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '팝업 ID',
                            `image` BIGINT(20) UNSIGNED NOT NULL DEFAULT '0' COMMENT '기본 이미지',
                            `letina` BIGINT(20) UNSIGNED NOT NULL DEFAULT '0' COMMENT '2배 사이즈 이미지',
                            `use_flag` ENUM('Y','N') NOT NULL DEFAULT 'Y' COMMENT '팝업 노출 여부',
                            `del_flag` ENUM('Y','N') NOT NULL DEFAULT 'N' COMMENT '팝업 삭제 여부',
                            `platform` ENUM('A','P','M') NOT NULL DEFAULT 'A' COMMENT '팝업 노출 위치 [A:모두,P:PC,M:MOBILE]',
                            `always_flag` ENUM('Y','N') NOT NULL DEFAULT 'Y' COMMENT '팝업 게시기간 - 항상 노출',
                            `start_date` DATETIME NULL DEFAULT NULL COMMENT '팝업 게시기간 - 시작일',
                            `end_date` DATETIME NULL DEFAULT NULL COMMENT '팝업 게시기간 - 종료일',
                            `url` TEXT NULL COMMENT '팝업 링크',
                            `target` ENUM('Y','N') NULL DEFAULT 'Y' COMMENT '새창으로 링크 열기',
                            `post_ids` TEXT NULL COMMENT '팝업을 특정페이지에 노출(serialize)',
                            `options` TEXT NULL COMMENT '고급 설정(serialize)',
                            `sort` BIGINT(20) NOT NULL DEFAULT '0' COMMENT '정렬순서 ASC',
                            PRIMARY KEY (`id`),
                            INDEX `use_flag` (`use_flag`),
                            INDEX `always_flag` (`always_flag`),
                            INDEX `start_date` (`start_date`),
                            INDEX `end_date` (`end_date`),
                            INDEX `del_flag` (`del_flag`),
                            INDEX `platform` (`platform`)
                        )
                        COMMENT='JT BAD UX POPUP'
                        {$char}
                        ;
            ";

            $wpdb->query( $sql );
        }

        public static function uninstall() {
            global $wpdb;

            $table = $wpdb->prefix . JTP_BAD_UX_POPUP_TABLE;
            $wpdb->query( " DROP TABLE IF EXISTS `{$table}` " );

            delete_option( 'jtpopup_config' );
        }

        public function __construct() {
            add_action( 'init', array( $this, 'plugins_load_textdomain' ) );

            add_action( 'admin_enqueue_scripts', array( $this, 'admin_style' ), 9999, 1 );
            add_action( 'admin_menu', array( $this, 'admin_menu' ) );
            add_action( 'wp_ajax_jtpopup_admin_form', array( $this, 'admin_form' ) );
            add_action( 'wp_ajax_jtpopup_preview', array( $this, 'admin_preview' ) );
            add_action( 'wp_ajax_jtpopup_action', array( $this, 'admin_action' ) );

            add_action( 'wp_ajax_jtpopup_get_post_list', array( $this, 'admin_get_post_list' ) );
        }


        public function plugins_load_textdomain() {
            load_plugin_textdomain( 'jt-bad-ux-popup', false, dirname( plugin_basename( __DIR__ ) ) . '/languages/' );
        }


        public function admin_style( $hook ) {
            if ( $hook == 'toplevel_page_bad-ux-popup' ) {
                wp_enqueue_style( 'JTPOP-font', JTP_BAD_UX_POPUP_URL . '/css/font.css', array(), '1.0.0' );
                wp_enqueue_style( 'magnific-popup', JTP_BAD_UX_POPUP_URL . '/css/vendors/popup/magnific-popup.css', array(), '1.1.0');
                wp_enqueue_style( 'magnific-popup-motion', JTP_BAD_UX_POPUP_URL . '/css/vendors/popup/magnific-popup-motion.css', array(), '1.1.0');
                wp_enqueue_style( 'icheck', JTP_BAD_UX_POPUP_URL . '/css/vendors/icheck/minimal.css', array(), '1.1.0');
                wp_enqueue_style( 'jquery-ui', JTP_BAD_UX_POPUP_URL . '/css/jquery-ui.min.css', false, '1.0.0' );
                wp_enqueue_style( 'jquery-ui-custom', JTP_BAD_UX_POPUP_URL . '/css/jquery-ui-1.9.2.custom.css', false, '1.0.2' );
                wp_enqueue_style( 'jquery-datetimepicker', JTP_BAD_UX_POPUP_URL . '/css/jquery-ui-timepicker-addon.css', false, '1.0.0' );
                wp_enqueue_style( 'jquery-colorpicker', JTP_BAD_UX_POPUP_URL . '/css/jquery.minicolors.css', false, '1.0.0' );
                wp_enqueue_style( 'jquery-select2', JTP_BAD_UX_POPUP_URL . '/css/select2.min.css', false, '4.0.7' );
                wp_enqueue_style( 'JTPOP-font-awesome', JTP_BAD_UX_POPUP_URL . '/css/font-awesome.min.css', false, '4.1.0' );
                wp_enqueue_style( 'JTPOP-popup-show', JTP_BAD_UX_POPUP_URL . '/css/jt-popup-show.css', null, '1.1.4' );
                wp_enqueue_style( 'JTPOP-admin-style', JTP_BAD_UX_POPUP_URL . '/css/jt-popup-admin.css', false, '1.0.9' );
                wp_enqueue_style( 'slick', JTP_BAD_UX_POPUP_URL . '/css/vendors/slider/slick/slick.css', array(), '1.6.0');

                wp_enqueue_media();
                wp_enqueue_script( 'media-upload' );
                wp_enqueue_script( 'jquery-ui', JTP_BAD_UX_POPUP_URL . '/js/jquery-ui.min.js', array( 'jquery' ), '1.0.0', true );
                wp_enqueue_script( 'jquery-ui-draggable' );
                wp_enqueue_script( 'jquery-ui-sortable' );
                wp_enqueue_script( 'jquery-ui-datepicker' );
                wp_enqueue_script( 'jQuery-ui-touch-punch', JTP_BAD_UX_POPUP_URL . '/js/jquery.ui.touch-punch.min.js', array( 'jquery' ), '1.0.0', true );
                wp_enqueue_script( 'jQuery-datetimepicker', JTP_BAD_UX_POPUP_URL . '/js/jquery-ui-timepicker-addon.js', array( 'jquery' ), '1.0.0', true );
                wp_enqueue_script( 'jQuery-colorpicker', JTP_BAD_UX_POPUP_URL . '/js/jquery.minicolors.min.js', array( 'jquery' ), '1.0.0', true );
                wp_enqueue_script( 'jQuery-serialize', JTP_BAD_UX_POPUP_URL . '/js/jquery.serialize-object.min.js', array( 'jquery' ), '1.0.0', true );
                wp_enqueue_script( 'jQuery-easing', JTP_BAD_UX_POPUP_URL . '/js/jquery.easing.1.3.min.js', array( 'jquery' ), '1.3.1', true );

                wp_enqueue_script( 'magnific-popup', JTP_BAD_UX_POPUP_URL . '/js/vendors/popup/jquery.magnific-popup.min.js', array( 'jquery' ), '1.0.0', true );
                wp_enqueue_script( 'icheck', JTP_BAD_UX_POPUP_URL . '/js/vendors/icheck/icheck.min.js', array( 'jquery' ), '1.0.0', true );
                wp_enqueue_script( 'browser-selector', JTP_BAD_UX_POPUP_URL . '/js/vendors/browser-selector.js', array( 'jquery' ), '1.0.0', true );
                wp_enqueue_script( 'JTPOP-imageloaded', JTP_BAD_UX_POPUP_URL . '/js/imagesloaded.pkgd.min.js', array( 'jquery' ), '3.1.8', true );
                wp_enqueue_script( 'slick', JTP_BAD_UX_POPUP_URL . '/js/vendors/slider/slick/slick.min.js', array('jquery'), '1.6.0', true);
                wp_enqueue_script( 'JTPOP-admin-script', JTP_BAD_UX_POPUP_URL . '/js/jt-popup-admin.js', array( 'jquery' ), '1.0.0', true );

                wp_enqueue_script( 'jQuery-select2', JTP_BAD_UX_POPUP_URL . '/js/select2.min.js', array( 'jquery' ), '4.0.7', true );
            }

            if ( $hook == 'bad-ux-popup_page_bad-ux-popup-config' ) {
                wp_enqueue_style( 'JTPOP-font', JTP_BAD_UX_POPUP_URL . '/css/font.css', array(), '1.0.0' );
                wp_enqueue_style( 'icheck', JTP_BAD_UX_POPUP_URL . '/css/vendors/icheck/minimal.css', array(), '1.1.0');
                wp_enqueue_style( 'jquery-ui', JTP_BAD_UX_POPUP_URL . '/css/jquery-ui.min.css', false, '1.0.0' );
                wp_enqueue_style( 'jquery-colorpicker', JTP_BAD_UX_POPUP_URL . '/css/jquery.minicolors.css', false, '1.0.0' );
                wp_enqueue_style( 'JTPOP-admin-style', JTP_BAD_UX_POPUP_URL . '/css/jt-popup-admin.css', false, '1.0.9' );

                wp_enqueue_script( 'jquery-ui', JTP_BAD_UX_POPUP_URL . '/js/jquery-ui.min.js', array( 'jquery' ), '1.0.0', true );
                wp_enqueue_script( 'jQuery-colorpicker', JTP_BAD_UX_POPUP_URL . '/js/jquery.minicolors.min.js', array( 'jquery' ), '1.0.0', true );
                wp_enqueue_script( 'icheck', JTP_BAD_UX_POPUP_URL . '/js/vendors/icheck/icheck.min.js', array( 'jquery' ), '1.0.0', true );
                wp_enqueue_script( 'jQuery-serialize', JTP_BAD_UX_POPUP_URL . '/js/jquery.serialize-object.min.js', array( 'jquery' ), '1.0.0', true );
                wp_enqueue_script( 'browser-selector', JTP_BAD_UX_POPUP_URL . '/js/vendors/browser-selector.js', array( 'jquery' ), '1.0.0', true );
                wp_enqueue_script( 'JTPOP-admin-script', JTP_BAD_UX_POPUP_URL . '/js/jt-popup-admin.js', array( 'jquery' ), '1.0.0', true );
            }
        }

        public function admin_menu() {
            add_menu_page(
                'BAD UX POPUP',
                'BAD UX POPUP',
                'edit_posts',
                'bad-ux-popup',
                array( $this, 'admin_list' ),
                JTP_BAD_UX_POPUP_URL . '/img/jt-icon.png'
            );

            add_submenu_page(
                'bad-ux-popup',
                '팝업 리스트',
                '팝업 리스트',
                'edit_posts',
                'bad-ux-popup',
                array( $this, 'admin_list' )
            );

            add_submenu_page(
                'bad-ux-popup',
                '팝업 공통설정',
                '팝업 공통설정',
                'edit_posts',
                'bad-ux-popup-config',
                array( $this, 'admin_config' )
            );
        }

        public function admin_list() {
            $publish_list = $this->get_list( 'publish' );
            $pending_list = $this->get_list( 'pending' );
            $close_list = $this->get_list( 'close' );

            // 게시 예정에서 게시 중으로 올라온 애들의 정렬값을 재 정의
            // - 게시중     : 0++
            // - 게시예정   : 0--
            // - 게시중지   : 0++
            $this->resort();

            include JTP_BAD_UX_POPUP_PATH . 'pages/admin_list.php';
        }

        public function admin_config() {
            $config = $this->get_config();

            wp_localize_script(
                'JTPOP-admin-script',
                'jtpopup',
                array(
                    'default'   => $this->get_config( true ),
                    'current'   => $config
                )
            );

            include JTP_BAD_UX_POPUP_PATH . 'pages/admin_config.php';
        }

        public function admin_form() {
            $jtpop_id = $this->is_set( $_REQUEST['jtpop_id'], 0 );
            $jtpopup = $this->get_item( $jtpop_id );

            include JTP_BAD_UX_POPUP_PATH . 'pages/admin_form.php';
        }

        public function admin_preview() {
            try {
                $jtpopup_id = $this->is_set( $_REQUEST['jtpopup_id'], 0 );

                if ( $jtpopup_id > 0 ) {
                    $jtpopup = $this->get_item( $jtpopup_id );
                    $type = ( $this->is_mobile() ? 'mobile' : 'pc' );
                    $list = array( $jtpopup );
                    $config = $this->get_config();
                    $template = 'bad-ux-popup-' . $type . '.php';

                    // Include list Custom Template if exist.
                    $template_path = TEMPLATEPATH . '/' . $template;

                    if ( ! file_exists( $template_path ) ) {
                        $template_path = JTP_BAD_UX_POPUP_PATH . 'templates/' . $template;
                    }

                    ob_start();
                    include $template_path;
                    $output = ob_get_clean();

                    wp_send_json_success( $output );
                } else {
                    wp_send_json_error( '잘못된 접근입니다.' );
                }
            } catch ( Exception $e ) {
                wp_send_json_error( $e->getMessage() );
            }
        }

        public function admin_action() {
            if ( $this->is_ajax() ) {
                if ( $this->check_nonce( 'jtpopup_form' ) ) {
                    try {
                        $data = $this->esc_attr( $this->is_set( $_POST['jtpopup'], array() ) );

                        // 체크박스 uncheck 처리
                        $this->is_set( $data['use_flag'], 'N' );
                        $this->is_set( $data['platform'], 'A' );
                        $this->is_set( $data['always_flag'], 'N' );
                        $this->is_set( $data['target'], 'N' );

                        if ( $data ) {
                            $popup_id = $this->is_set( $data['id'], 0 );

                            if ( ! $this->is_set( $data['image'] ) ) {
                                wp_send_json_error( '기본 이미지를 선택해주세요.' );
                            }

                            $res = $this->set_item( $data, $popup_id );

                            if ( $res ) {
                                wp_send_json_success();
                            } else {
                                wp_send_json_error( '저장 중 오류가 발생했습니다.' );
                            }
                        } else {
                            wp_send_json_error( '잘못된 접근입니다.' );
                        }
                    } catch ( Exception $e ) {
                        wp_send_json_error( $e->getMessage() );
                    }
                }

                if ( $this->check_nonce( 'jtpopup_config_form' ) ) {
                    try {
                        if ( $this->is_set( $_POST['jtpopup'] ) ) {
                            $data = $this->array_recursive( $this->get_config( true ), $this->esc_attr( $_POST['jtpopup'] ) );

                            update_option( 'jtpopup_config', $data );

                            wp_send_json_success( $data );
                        } else {
                            wp_send_json_error( '잘못된 접근입니다.' );
                        }
                    } catch ( Exception $e ) {
                        wp_send_json_error( $e->getMessage() );
                    }
                }

                if ( $this->check_nonce( 'jtpopup_remove' ) ) {
                    try {
                        if ( $this->is_set( $_POST['jtpopup_id'] ) ) {
                            $popup_id = $this->esc_attr( $_POST['jtpopup_id'] );
                            $res = $this->remove_item( $popup_id );

                            if ( $res ) {
                                wp_send_json_success();
                            } else {
                                wp_send_json_error( '삭제 중 오류가 발생했습니다.' );
                            }
                        } else {
                            wp_send_json_error( '잘못된 접근입니다.' );
                        }
                    } catch ( Exception $e ) {
                        wp_send_json_error( $e->getMessage() );
                    }
                }

                if ( $this->check_nonce( 'jtpopup_sort' ) ) {
                    try {
                        if ( $this->is_set( $_POST['jtpopup_ids'] ) ) {
                            $popup_ids = ( array ) $this->esc_attr( $_POST['jtpopup_ids'] );
                            $type = $this->esc_attr( $_POST['type'] );
                            $res = array();

                            if ( is_array( $popup_ids ) && count( $popup_ids ) > 0 ) {
                                foreach ( $popup_ids as $idx => $popup_id ) {
                                    $popup = $this->get_item( $popup_id );

                                    $popup['sort'] = $idx;

                                    if ( $type == 'publish' ) {
                                        $check = true;
                                        $check = ( $check && ( $this->is_set( $popup['start_date'] ) && date( 'YmdHis' ) > date( 'YmdHis', strtotime( $popup['start_date'] ) ) ) );
                                        $check = ( $check && ( $this->is_set( $popup['end_date'] ) && date( 'YmdHis', strtotime( $popup['end_date'] ) ) > date( 'YmdHis' ) ) );
                                        $check = ( $check || $popup['always_flag'] == 'Y' );

                                        $popup['use_flag'] = 'Y';

                                        if ( ! $check ) {
                                            if ( $this->is_set( $popup['end_date'] ) && date( 'YmdHis' ) < date( 'YmdHis', strtotime( $popup['end_date'] ) ) ) {
                                                $popup['start_date'] = date( 'Y-m-d 00:00:00' );
                                            } else {
                                                $popup['always_flag'] = 'Y';
                                            }
                                        }
                                    } elseif ( $type == 'pending' ) {
                                        $popup['use_flag'] = 'Y';
                                        $popup['always_flag'] = 'N';

                                        if ( ! $this->is_set( $popup['start_date'] ) || date( 'YmdHis' ) > date( 'YmdHis', strtotime( $popup['start_date'] ) ) ) {
                                            $popup['start_date'] = date('Y-m-d 00:00:00', strtotime( '+1 day' ) );
                                        }

                                        if ( ! $this->is_set( $popup['end_date'] ) || date( 'YmdHis' ) > date( 'YmdHis', strtotime( $popup['end_date'] ) ) ) {
                                            $popup['end_date'] = date('Y-m-d 23:59:59', strtotime( '+1 day' ) );
                                        }

                                        // 게시예정인 애들은 자동으로 게시중으로 넘어갈때 앞에 위치하도록 정렬을 음수로 지정
                                        $popup['sort'] = 0 - count( $popup_ids ) + $idx;
                                    } else {
                                        $popup['use_flag'] = 'N';
                                    }

                                    $this->set_item( $popup, $popup_id );

                                    $res[] = $this->get_item( $popup_id );
                                }

                                wp_send_json_success( $res );
                            } else {
                                wp_send_json_error( '잘못된 접근입니다' );
                            }
                        } else {
                            wp_send_json_error( '잘못된 접근입니다.' );
                        }
                    } catch ( Exception $e ) {
                        wp_send_json_error( $e->getMessage() );
                    }
                }
            }

            exit;
        }

        public function admin_get_post_list() {
            if ( $this->is_ajax() ) {
                $page = max( 1, intVal( $this->is_set( $_GET['page'], 1 ) ) );
                $search = $this->esc_attr( $this->is_set( $_GET['search'], '' ) );

                $query = new WP_Query(
                    array(
                        'numberposts'   => 20,
                        'post_status'   => 'publish',
                        'post_type'     => get_post_types(
                                            array(
                                                'public' => true
                                            )
                                        ),
                        's'             => $search,
                        'paged'         => $page,
                    )
                );

                if ( $query->found_posts > 0 ) {

                    $result = array_map( function ( $obj ) {
                        return array(
                            'id'    => $obj->ID,
                            'text'  => !empty( $obj->post_title ) ? $obj->post_title : '[' . $obj->ID . '] UNTITLED',
                        );
                    }, $query->posts );

                    wp_send_json( array(
                        'results'       => $result,
                        'pagination'    => array(
                            'more'  => $query->max_num_pages > $page,
                        ),
                    ) );
                } else {
                    wp_send_json( array(
                        'results'       => array(),
                        'pagination'    => array(
                            'more'  => false,
                        ),
                    ) );
                }

                exit;
            }
        }

        private function set_item( $param = array(), $id = 0 ) {
            try {
                global $wpdb;

                $table = $this->table();
                $data = array(
                    'image'         => $this->is_set( $param['image'], 0 ),
                    'letina'        => $this->is_set( $param['letina'], 0 ),
                    'use_flag'      => $this->is_set( $param['use_flag'], 'Y' ),
                    'platform'      => $this->is_set( $param['platform'], 'A' ),
                    'always_flag'   => $this->is_set( $param['always_flag'], 'Y' ),
                    'start_date'    => ( $this->is_set( $param['start_date'] ) ? date( 'Y-m-d H:i:00', strtotime( $param['start_date'] ) ) : null ),
                    'end_date'      => ( $this->is_set( $param['end_date'] ) ? date( 'Y-m-d H:i:59', strtotime( $param['end_date'] ) ) : null ),
                    'url'           => $this->is_set( $param['url'], '' ),
                    'target'        => $this->is_set( $param['target'], 'Y' ),
                    'post_ids'      => serialize( $this->is_set( $param['post_ids'], null ) ),
                    'options'       => serialize( $this->is_set( $param['options'], null ) ),
                    'sort'          => $this->is_set( $param['sort'], 0 ),
                );

                $res = false;

                if ( $id > 0 ) {
                    $res = $wpdb->update( $table, $data, array( 'id' => $id ) );
                } else {
                    $res = $wpdb->insert( $table, $data );
                }

                if ( $res === false ) {
                    return false;
                } else {
                    return ( $id > 0 ? $id : $wpdb->insert_id );
                }
            } catch ( Exception $e ) {
                throw $e;
            }
        }

        private function remove_item( $id = 0 ) {
            global $wpdb;

            $table = $this->table();

            if ( $id > 0 ) {
                return $wpdb->update( $table, array( 'del_flag' => 'Y' ), array( 'id' => $id ) );
            }

            return false;
        }

        private function resort() {
            $publish_list = $this->get_list( 'publish' );

            if ( count( $publish_list ) > 0 ) {
                foreach ( $publish_list as $idx => $tmp ) {
                    $tmp['sort'] = $idx;

                    $this->set_item( $tmp, $tmp['id'] );
                }
            }

            $pending_list = $this->get_list( 'pending' );

            if ( count( $pending_list ) > 0 ) {
                foreach ( $pending_list as $idx => $tmp ) {
                    $tmp['sort'] = 0 - count( $pending_list ) + $idx;

                    $this->set_item( $tmp, $tmp['id'] );
                }
            }

            $close_list = $this->get_list( 'close' );

            if ( count( $close_list ) > 0 ) {
                foreach ( $close_list as $idx => $tmp ) {
                    $tmp['sort'] = $idx;

                    $this->set_item( $tmp, $tmp['id'] );
                }
            }
        }
    }
}

if ( method_exists( 'JTP_Bad_UX_Popup_Admin', 'init' ) ) JTP_Bad_UX_Popup_Admin::init();
