<?php defined( 'ABSPATH' ) or die( 'Nothing to see here.' ); // Security (disable direct access).

if ( ! class_exists( 'JTP_Bad_UX_Popup_Front' ) ) {
    class JTP_Bad_UX_Popup_Front extends JTP_Bad_UX_Popup_Basic {
        public static function init() {
            return new self();
        }

        public function __construct() {
            // add_action( 'wp_footer', array( $this, 'show' ) );

            add_filter( 'body_class', array( $this, 'body_class' ) );

            add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
            add_action( 'rest_api_init', array( $this, 'register_routes' ) );

            add_action( 'wp_ajax_jt_bad_ux_popup', array( $this, 'ajax_popup_action' ) );
            add_action( 'wp_ajax_nopriv_jt_bad_ux_popup', array( $this, 'ajax_popup_action' ) );
        }

        public function body_class( $classes ) {
            if ( wp_is_mobile() ) { // Add Mobile class
                if ( ! in_array( 'mobile', $classes ) ) $classes[] = ' mobile';
            } else { // Add Desktop class
                if ( ! in_array( 'desktop', $classes ) ) $classes[] = ' desktop';
            }

            return $classes;
        }

        public function show() {
            $type = ( $this->is_mobile() ? 'mobile' : 'pc' );
            $list = $this->get_list( 'publish', $type );
            $config = $this->get_config();

            if ( ! ( is_home() || is_front_page() ) ) {
                $list = array_filter( $list, function ( $arr ) {
                    return ( $this->is_set( $_COOKIE['jt_popup_' . $arr['id'] ], '' ) != 'today_none' && in_array( get_the_ID(), $arr['post_ids'] ) );
                } );
            } else {
                $list = array_filter( $list, function ( $arr ) {
                    return ( $this->is_set( $_COOKIE['jt_popup_' . $arr['id'] ], '' ) != 'today_none' && empty( $arr['post_ids'] ) );
                } );
            }

            if ( $this->is_set( $_REQUEST['jt-nopopup'] ) == 'Y' ) {
                $list = array();
            }

            if ( count( $list ) > 0 ) {
                wp_enqueue_style( 'JTPOP-popup-show', JTP_BAD_UX_POPUP_URL . '/css/jt-popup-show.css', null, '1.1.4' );
                wp_enqueue_style( 'JTPOP-font-awesome', JTP_BAD_UX_POPUP_URL . '/css/font-awesome.min.css', null, '4.1.0' );
                wp_enqueue_style( 'slick', JTP_BAD_UX_POPUP_URL . '/css/vendors/slider/slick/slick.css', array(), '1.6.0');

                wp_enqueue_script( 'jquery-ui-draggable' );
                wp_enqueue_script( 'JTPOP-jquery-cookie', JTP_BAD_UX_POPUP_URL . '/js/jquery.cookie.js', array( 'jquery' ), '1.4.0', true );
                wp_enqueue_script( 'JTPOP-touchswipe', JTP_BAD_UX_POPUP_URL . '/js/jquery.touchSwipe.min.js', array(), '1.6', true );
                wp_enqueue_script( 'JTPOP-imageloaded', JTP_BAD_UX_POPUP_URL . '/js/imagesloaded.pkgd.min.js', array( 'jquery' ), '3.1.8', true );
                wp_enqueue_script( 'JTPOP-show-script', JTP_BAD_UX_POPUP_URL . '/js/jt-popup-show.js', array( 'jquery', 'JTPOP-jquery-cookie' ), '1.1.8', true );
                wp_enqueue_script( 'slick', JTP_BAD_UX_POPUP_URL . '/js/vendors/slider/slick/slick.min.js', array('jquery'), '1.6.0', true);

                $template = 'bad-ux-popup-' . $type . '.php';

                // Include list Custom Template if exist.
                $template_path = TEMPLATEPATH . '/' . $template;

                if ( ! file_exists( $template_path ) ) {
                    $template_path = JTP_BAD_UX_POPUP_PATH . 'templates/' . $template;
                }

                ob_start();
                include $template_path;
                $output = ob_get_clean();

                echo $output;
            }
        }


        public function enqueue_scripts() {
            wp_enqueue_style( 'JTPOP-popup-show', JTP_BAD_UX_POPUP_URL . '/css/jt-popup-show.css', null, '1.1.4' );
            wp_enqueue_style( 'JTPOP-font-awesome', JTP_BAD_UX_POPUP_URL . '/css/font-awesome.min.css', null, '4.1.0' );
            wp_enqueue_style( 'slick', JTP_BAD_UX_POPUP_URL . '/css/vendors/slider/slick/slick.css', array(), '1.6.0');

            wp_enqueue_script( 'jquery-ui-draggable' );
            wp_enqueue_script( 'JTPOP-jquery-cookie', JTP_BAD_UX_POPUP_URL . '/js/jquery.cookie.js', array( 'jquery' ), '1.4.0', true );
            wp_enqueue_script( 'JTPOP-touchswipe', JTP_BAD_UX_POPUP_URL . '/js/jquery.touchSwipe.min.js', array(), '1.6', true );
            wp_enqueue_script( 'JTPOP-imageloaded', JTP_BAD_UX_POPUP_URL . '/js/imagesloaded.pkgd.min.js', array( 'jquery' ), '3.1.8', true );
            wp_enqueue_script( 'JTPOP-show-script', JTP_BAD_UX_POPUP_URL . '/js/jt-popup-show.js', array( 'jquery', 'JTPOP-jquery-cookie' ), '1.1.8', true );
            wp_enqueue_script( 'slick', JTP_BAD_UX_POPUP_URL . '/js/vendors/slider/slick/slick.min.js', array('jquery'), '1.6.0', true);

            wp_localize_script( 'JTPOP-show-script', '__JTPOP', array(
                'home_url'  => get_home_url(),
                'blog_id'   => get_current_blog_id(),
                'language'  => get_locale(),
                'is_home'   => is_front_page() || is_home(),
            ) );
        }


        public function register_routes() {
            register_rest_route(
                'jt-bad-ux-popup',
                '/list/',
                array(
                    'method'    => WP_REST_Server::READABLE,
                    'callback'  => array( $this, 'popup_list' )
                )
            );
        }


        public function ajax_popup_action() {
            wp_send_json( $this->popup_list() );
            exit;
        }


        public function popup_list( WP_REST_Request $request = null ) {
            $type = ( $_GET['type'] ?: 'pc' );
            $location = ($_GET['location'] ? parse_url($_GET['location']) : null);
            $post = (isset($location['path']) && $location['path'] != '/' ? get_page_by_path($location['path'], OBJECT, get_post_types(array( 'public' => true ))) : null);
            // $post = ( $_GET['location'] ? get_page_by_path( basename( $_GET['location'] ) ) : null );
            $language = str_replace('-','_', esc_attr( $_GET['language'] ));
            $is_home = ( $_GET['is_home'] === 'true' );
            $blog_id = intVal( isset( $_GET['blog_id'] ) && intVal( $_GET['blog_id'] ) > 0 ? $_GET['blog_id'] : 0 );

            if ( $blog_id && function_exists( 'switch_to_blog' ) ) switch_to_blog( $blog_id );
            if ( function_exists( 'switch_to_locale' ) ) switch_to_locale( $language );

            $list = $this->get_list( 'publish', $type );
            $config = $this->get_config();

            if ( ! is_textdomain_loaded( 'jt-bad-ux-popup' ) ) {
                $mo_file = sprintf( '%s.mo', $language );
                $mo_path = path_join( path_join( JTP_BAD_UX_POPUP_PATH, 'languages' ), $mo_file );

                if ( file_exists( $mo_path ) ) load_textdomain( 'jt-bad-ux-popup', $mo_path );
            }

            if ( isset( $post->ID ) && $post->ID > 0 ) {
                $list = array_filter( $list, function ( $arr ) use ( $post ) {
                    return ( $this->is_set( $_COOKIE['jt_popup_' . $arr['id'] ], '' ) != 'today_none' && in_array( $post->ID, $arr['post_ids'] ) );
                } );
            } else if ( $_GET['location'] == home_url() . '/' || $is_home ) {
                $list = array_filter( $list, function ( $arr ) {
                    return ( $this->is_set( $_COOKIE['jt_popup_' . $arr['id'] ], '' ) != 'today_none' && empty( $arr['post_ids'] ) );
                } );
            } else {
                $list = array();
            }

            if ( $this->is_set( $_REQUEST['jt-nopopup'] ) == 'Y' ) {
                $list = array();
            }

            if ( count( $list ) > 0 ) {
                $template = 'bad-ux-popup-' . $type . '.php';

                // Include list Custom Template if exist.
                $template_path = TEMPLATEPATH . '/' . $template;

                if ( ! file_exists( $template_path ) ) {
                    $template_path = JTP_BAD_UX_POPUP_PATH . 'templates/' . $template;
                }

                ob_start();
                include $template_path;
                $output = ob_get_clean();

                return array( 'data' => $list, 'html' => $output );
            }

            return null;
        }
    }
}

if ( method_exists( 'JTP_Bad_UX_Popup_Front', 'init' ) ) JTP_Bad_UX_Popup_Front::init();
