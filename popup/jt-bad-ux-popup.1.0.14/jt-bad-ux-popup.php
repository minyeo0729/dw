<?php defined( 'ABSPATH' ) or die( 'Nothing to see here.' ); // Security (disable direct access).
/*
 * Plugin Name: JT BAD UX POPUP
 * Plugin URI: http://www.studio-jt.co.kr
 * Description: 이미지 팝업을 기간을 비롯한 간편한 설정들로 누구나 쉽게 사용할 수 있으며, PC와 MOBILE에서 함께 사용할 수 있습니다.
 * Version: 1.0.14
 * Author: 스튜디오 제이티 (support@studio-jt.co.kr)
 * Author URI: studio-jt.co.kr
*/

define( 'JTP_BAD_UX_POPUP_PATH', plugin_dir_path( __FILE__ ) );
define( 'JTP_BAD_UX_POPUP_URL', plugins_url( '', __FILE__ ) );
define( 'JTP_BAD_UX_POPUP_BASENAME', dirname( plugin_basename( __FILE__ ) ) );
define( 'JTP_BAD_UX_POPUP_TABLE', 'jt_bad_ux_popup' );

// add_image_size( 'jtpopup_thumbnail', 150, 150, true );

require_once JTP_BAD_UX_POPUP_PATH . 'classes/JTP_Bad_UX_Popup_Basic.class.php';
require_once JTP_BAD_UX_POPUP_PATH . 'classes/JTP_Bad_UX_Popup_Front.class.php';
require_once JTP_BAD_UX_POPUP_PATH . 'classes/JTP_Bad_UX_Popup_Admin.class.php';

register_activation_hook( __FILE__, array( 'JTP_Bad_UX_Popup_Admin', 'active' ) );
register_uninstall_hook( __FILE__, array( 'JTP_Bad_UX_Popup_Admin', 'uninstall' ) );
