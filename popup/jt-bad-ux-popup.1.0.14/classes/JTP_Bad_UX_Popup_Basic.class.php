<?php defined( 'ABSPATH' ) or die( 'Nothing to see here.' ); // Security (disable direct access).

if ( ! class_exists( 'JTP_Bad_UX_Popup_Basic' ) ) {
    class JTP_Bad_UX_Popup_Basic {
        protected function get_config( $is_default = false ) {
            $default = array(
                'style'     => 'type1',
                'shadow'    => array(
                                'use'       => 'N',
                                'x'         => 10,
                                'y'         => 10,
                                'size'      => 50,
                                'color'     => '#000000'
                            ),
                'overlay'   => array(
                                'color'     => '#000000',
                                'opacity'   => 60,
                            ),
                'mobile'    => array(
                                'default'   => '#ffffff',
                                'active'    => '#00bcb4',
                                'close'     => '#ffffff'

                            ),
            );

            if ( $is_default ) {
                return $default;
            }

            $config = get_option( 'jtpopup_config' ) ?: array();

            return $this->esc_attr( $this->array_recursive( $default, $config ) );
        }

        protected function get_list( $type = 'publish', $flag = '' ) {
            global $wpdb;

            $table = $this->table();
            $str_now = $this->now( 'Y-m-d H:i:s' );
            $arr_where = array();

            $arr_where[] = $wpdb->prepare( ' ( del_flag = %s ) ', 'N' );

            if ( $type == 'pending' ) {
                $arr_where[] = $wpdb->prepare( ' ( use_flag = %s AND always_flag = %s AND start_date > %s ) ', 'Y', 'N', $str_now );
            } elseif ( $type == 'close' ) {
                $arr_where[] = $wpdb->prepare( ' ( use_flag = %s OR ( always_flag = %s AND ( %s > end_date OR end_date IS NULL ) ) ) ', 'N', 'N', $str_now );
            } else {
                $arr_where[] = $wpdb->prepare( ' ( use_flag = %s AND ( always_flag = %s OR ( %s BETWEEN start_date AND end_date ) ) ) ', 'Y', 'Y', $str_now );
            }

            if ( $flag == 'mobile' ) {
                $arr_where[] = $wpdb->prepare( ' ( platform = %s OR platform = %s ) ', 'A', 'M' );
            } elseif ( $flag == 'pc' ) {
                $arr_where[] = $wpdb->prepare( ' ( platform = %s OR platform = %s ) ', 'A', 'P' );
            }

            $sort = ( $this->is_mobile() || is_admin() ? ' sort ASC, id DESC ' : ' sort DESC, id ASC ' );
            $sql = " SELECT id FROM {$table} WHERE " . implode( ' AND ', $arr_where ) . " ORDER BY {$sort} ";
            $res = $wpdb->get_results( $sql, ARRAY_A );
            $data = array();

            if ( count( $res ) > 0 ) {
                foreach ( $res as $row ) {
                    if ( $this->is_set( $row['id'] ) ) {
                        $popup = $this->get_item( $row['id'] );

                        if ( $this->is_set( $popup ) ) {
                            $data[] = $popup;
                        }
                    }
                }
            }

            return $data;
        }

        protected function get_item( $id = 0 ) {
            global $wpdb;

            $table = $this->table();
            $res = null;

            if ( $id > 0 ) {
                $sql = $wpdb->prepare( " SELECT * FROM {$table} WHERE ID = %d ", $id );
                $res = $wpdb->get_row( $sql, ARRAY_A );
            }

            $data = array();
            $tmp_options = ( is_serialized( $this->is_set( $res['options'], array() ) ) ? unserialize( $res['options'] ) : $res['options'] );
            $data = array(
                'id'            => $this->is_set( $res['id'], 0 ),
                'image'         => $this->is_set( $res['image'], 0 ),
                'image_src'     => $this->get_image_src( $res['image'], 'full' ),
                'letina'        => $this->is_set( $res['letina'], 0 ),
                'letina_src'    => $this->get_image_src( $res['letina'], 'full' ),
                'use_flag'      => $this->is_set( $res['use_flag'], 'Y' ),
                'platform'      => $this->is_set( $res['platform'], 'A' ),
                'always_flag'   => $this->is_set( $res['always_flag'], 'Y' ),
                'start_date'    => ( $this->is_set( $res['start_date'] ) ? date( 'Y-m-d H:i', strtotime( $res['start_date'] ) ) : '' ),
                'end_date'      => ( $this->is_set( $res['end_date'] ) ? date( 'Y-m-d H:i', strtotime( $res['end_date'] ) ) : '' ),
                'url'           => $this->is_set( $res['url'], '' ),
                'target'        => $this->is_set( $res['target'], 'Y' ),
                'post_ids'      => ( is_serialized( $this->is_set( $res['post_ids'], array() ) ) ? unserialize( $res['post_ids'] ) : $res['post_ids'] ),
                'options'       => array(
                                    'top'           => $this->is_set( $tmp_options['top'], 0 ),
                                    'left'          => $this->is_set( $tmp_options['left'], 0 ),
                                    'color'         => $this->is_set( $tmp_options['color'], 'ffffff' ),
                                    'background'    => $this->is_set( $tmp_options['background'], '000000' ),
                                ),
                'sort'          => $this->is_set( $res['sort'], 0 ),
            );

            if ( empty( $data['post_ids'] ) ) {
                $data['post_ids'] = array();
            } elseif ( ! is_array( $data['post_ids'] ) ) {
                $data['post_ids'] = array( $data['post_ids'] );
            }

            return $data;
        }


        // esc_attr 확장 함수( 배열 및 오브젝트 지원 )
        protected function esc_attr( $var ) {
            if ( is_string( $var ) || is_numeric( $var ) ) {
                return esc_attr( $var );
            } elseif ( empty( $var ) ) {
                return $var;
            } else {
                foreach ( $var as &$item ) {
                    $item = self::esc_attr( $item );
                }

                return $var;
            }
        }

        // isset 확장 함수
        protected function is_set( &$var = null, $default = null ) {
            try {
                if ( ! isset( $var ) || empty( $var ) ) {
                    $var = $default;
                }

                return $var;
            } catch ( Exception $e ) {
                return null;
            }
        }

        // script console.log 대응 함수
        protected function console( $var, $var_name = '' ) {
            echo '<script>console.log( ' . ( $this->is_set( $var_name ) ? '"' . $var_name . '", ' : '' ) . json_encode( $var ) . ' );</script>';
        }

        // print_r, var_dump 확장 함수
        protected function debug( $var, $var_name = '', $show_type = false ) {
            echo '<pre>' . ( $this->is_set( $var_name ) ? $var_name . ' :: ' : '' );

            if ( $show_type ) {
                var_dump( $var );
            } else {
                print_r( $var );
            }

            echo '</pre>';
        }

        // ajax 여부
        protected function is_ajax() {
            if ( function_exists( 'wp_doing_ajax' ) ) {
                return wp_doing_ajax();
            }

            return defined( 'DOING_AJAX' ) && DOING_AJAX;
        }

        // mobile 여부
        protected function is_mobile() {
            return wp_is_mobile(); //|| $browser->isMobile();

            require_once JTP_BAD_UX_POPUP_PATH . 'classes/browser.class.php';
            $browser = new Browser();
            $is_mobile = wp_is_mobile();

            if ( empty( $_SERVER['HTTP_USER_AGENT'] ) ) {
                $is_mobile = false;
            } elseif (
                strpos( $_SERVER['HTTP_USER_AGENT'], 'Android' ) !== false
                || strpos( $_SERVER['HTTP_USER_AGENT'], 'Silk/' ) !== false
                || strpos( $_SERVER['HTTP_USER_AGENT'], 'Kindle' ) !== false
                || strpos( $_SERVER['HTTP_USER_AGENT'], 'BlackBerry' ) !== false
                || strpos( $_SERVER['HTTP_USER_AGENT'], 'Opera Mini' ) !== false
            ) {
                $is_mobile = true;
            } elseif ( strpos( $_SERVER['HTTP_USER_AGENT'], 'Mobile' ) !== false && strpos( $_SERVER['HTTP_USER_AGENT'], 'iPad' ) == false ) {
                $is_mobile = true;
            } elseif ( strpos( $_SERVER['HTTP_USER_AGENT'], 'iPad' ) !== false ) {
                $is_mobile = true;
            }

            return $is_mobile;
        }

        // Nonce Field
        protected function nonce( $name = '', $with_id = true ) {
            $nonce = wp_nonce_field( $name, $name, true, false );

            if ( ! $with_id ) {
                $nonce = preg_replace( '/id=\"\w+\"/', '', $nonce );
            }

            return $nonce;
        }

        // Check WP Nonce
        protected function check_nonce( $name = '' ) {
            return wp_verify_nonce( $this->is_set( $_REQUEST[ $name ] ), $name );
        }

        // User IP
        protected function ip() {
            $ip = '';

            if ( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) && filter_var( $_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP ) ) {
                $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
            } elseif ( ! empty( $_SERVER['HTTP_X_SUCURI_CLIENTIP'] ) && filter_var( $_SERVER['HTTP_X_SUCURI_CLIENTIP'], FILTER_VALIDATE_IP ) ) {
                $ip = $_SERVER['HTTP_X_SUCURI_CLIENTIP'];
            } elseif ( isset( $_SERVER['REMOTE_ADDR'] ) ) {
                $ip = $_SERVER['REMOTE_ADDR'];
            }

            $ip = preg_replace( '/^(\d+\.\d+\.\d+\.\d+):\d+$/', '\1', $ip );

            return $ip;
        }

        protected function table() {
            global $wpdb;

            return $wpdb->prefix . JTP_BAD_UX_POPUP_TABLE;
        }

        protected function now( $format = 'Y-m-d H:i:s' ) {
            return date_i18n( $format );
        }

        protected function array_recursive( $array, $array1 ) {
            // handle the arguments, merge one by one
            $args = func_get_args();
            $array = $args[ 0 ];

            if ( ! is_array( $array ) ) {
              return $array;
            }

            for ( $i = 1; $i < count( $args ); $i++ ) {
                if ( is_array( $args[ $i ] ) ) {
                    if ( function_exists( 'array_replace_recursive' ) ) {
                        $array = array_replace_recursive( $array, $args[ $i ] );
                    } else {
                        $array = $this->_array_recursive( $array, $args[ $i ] );
                    }
                }
            }

            return $array;
        }

        private function _array_recursive( $array, $array1 ) {
            foreach ( $array1 as $key => $value ) {
                // create new key in $array, if it is empty or not an array
                if ( ! isset( $array[ $key ] ) || ( isset( $array[ $key ] ) && ! is_array( $array[ $key ] ) ) ) {
                    $array[ $key ] = array();
                }

                // overwrite the value in the base array
                if ( is_array( $value ) ) {
                  $value = $this->_array_recursive( $array[ $key ], $value );
                }

                $array[ $key ] = $value;
            }

            return $array;
        }


        protected function get_image_src( $image_id = 0, $size = 'thumbnail' ) {
            try {
                if ( $image_id > 0 ) {
                    $image = wp_get_attachment_image_src( $image_id, $size );

                    return $this->is_set( $image[ 0 ], '' );
                } else {
                    return '';
                }
            } catch ( Exception $e ) {
                return '';
            }
        }
    }
}